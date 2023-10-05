import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import secureLocalStorage from 'react-secure-storage';

interface GlobalContextType {
  jwt: string;
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
      console.log('ee', response);
    } else {
      secureLocalStorage.setItem('jwt', response?.jwt);
      secureLocalStorage.setItem('accessToken', response?.access_token);

      setJwt(response?.jwt);
      setAccessToken(response?.access_token);
    }
  }, []);

  useEffect(() => {
    const jwt: any = secureLocalStorage.getItem('jwt');
    const accessToken: any = secureLocalStorage.getItem('accessToken');

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

  console.log('GlobalContextApp');

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
