import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AUTHORIZATION_KEY, Storage } from 'aesirx-lib';
import secureLocalStorage from 'react-secure-storage';

interface GlobalContextType {
  jwt: any;
  accessToken: any;
  globalLoading: any;
  onLogin: any;
  onLogout: any;
}

interface Props {
  children?: ReactNode;
}

const globalContext = createContext<GlobalContextType>({
  jwt: '',
  accessToken: '',
  globalLoading: false,
  onLogin: undefined,
  onLogout: undefined,
});

const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  return <GlobalContextApp>{children}</GlobalContextApp>;
};

const GlobalContextApp: React.FC<Props> = ({ children }) => {
  const [jwt, setJwt] = useState('');
  const [accessToken, setAccessToken] = useState('');

  const onSSOData = useCallback(async (response: any) => {
    if (response.error) {
      // eslint-disable-next-line no-console
      console.log('ee', response);
    } else {
      secureLocalStorage.setItem('jwt', response?.jwt);
      Storage.getItem('accessToken', AUTHORIZATION_KEY.ACCESS_TOKEN);

      setJwt(response?.jwt);
      setAccessToken(response?.access_token);
    }
  }, []);

  useEffect(() => {
    const jwt: any = secureLocalStorage.getItem('jwt');
    const accessToken: any = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);

    if (jwt) {
      setJwt(jwt);
    }
    if (accessToken) {
      setAccessToken(accessToken);
    }
  }, []);

  const handleLogout = async () => {
    secureLocalStorage.removeItem('jwt');
    secureLocalStorage.removeItem('accessToken');
    secureLocalStorage.removeItem('connection');
    secureLocalStorage.removeItem('aesirxData');
    secureLocalStorage.removeItem('preregistration');
    setJwt('');
    setAccessToken('');
  };

  return (
    <globalContext.Provider
      value={{
        jwt: jwt,
        accessToken: accessToken,
        globalLoading: false,
        onLogin: onSSOData,
        onLogout: handleLogout,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};

const useGlobalContext = () => useContext(globalContext);

export { GlobalContextProvider, useGlobalContext };
