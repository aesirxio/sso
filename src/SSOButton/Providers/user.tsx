import Toast from '../../components/Toast';
import { getPreregistration } from '../../utils/index';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from './global';
import { getMember } from '../../utils/index';
import secureLocalStorage from 'react-secure-storage';
import axios from 'axios';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
interface UserContextType {
  preregistration?: any;
  userLoading: any;
  getData: any;
  aesirxData?: any;
  isAdmin?: boolean;
}

interface Props {
  children?: ReactNode;
  isGetInterest?: boolean;
}

const userContext = createContext<UserContextType>({
  userLoading: undefined,
  getData: undefined,
});

const UserContextProvider: React.FC<Props> = ({ children, isGetInterest = false }) => {
  const { jwt, onLogout } = useGlobalContext();
  const accessToken = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
  const [preregistration, setPreregistration] = useState<any>(null);
  const [aesirxData, setAesirxData] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (jwt && accessToken) {
      try {
        (async () => {
          await getData(jwt, accessToken);
        })();
      } catch (error: any) {
        toast.error(<Toast status={false} message={error.message} />);
      }
    }
    // eslint-disable-next-line
  }, [jwt, accessToken]);

  const getData = useCallback(async (jwt: string, accessToken: string) => {
    setLoading(true);
    let _preregistration: { id?: string } = {};
    let aesirxData: any = {};

    if (jwt) {
      try {
        const member = await getMember(accessToken);
        aesirxData = { ...member };

        const preregistrationData = (await getPreregistration(jwt)).data?.objForm;

        if (preregistrationData?.aesirXAccount) {
          const response = await axios.post('/api/member/checkadmin', {
            username: preregistrationData?.aesirXAccount,
          });
          response?.data && setIsAdmin(true);
        }
        _preregistration = {
          ...preregistrationData,
          ..._preregistration,
        };

        secureLocalStorage.setItem('auth', true);
        secureLocalStorage.setItem('access_token', accessToken);
        secureLocalStorage.setItem('member_id', aesirxData?.member_id);
        secureLocalStorage.setItem('member_email', aesirxData?.email);
      } catch (error: any) {
        if (
          error?.response?.status === 403 ||
          (error?.response?.status === 401 &&
            error?.response?.data?.error !== "Account preregistration doesn't exist")
        ) {
          onLogout();
        }
      }
    }

    setAesirxData(aesirxData);
    setPreregistration(_preregistration);
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  return (
    <userContext.Provider
      value={{
        preregistration: preregistration,
        aesirxData: aesirxData,
        isAdmin: isAdmin,
        userLoading: loading,
        getData: getData,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

const useUserContext = () => useContext(userContext);

export { UserContextProvider, useUserContext };
