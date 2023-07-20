/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/index';
import { handleRegularReponse } from './index';

interface SSOContextProviderProps {
  value?: any;
  children: React.ReactNode;
}

const SSOContext = React.createContext<undefined>(undefined);

export const SSOContextProvider: React.FC<SSOContextProviderProps> = (props) => {
  const [loading, setLoading] = useState(true);
  const queryString = typeof window !== 'undefined' && window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const code = urlParams.get('code');
  const ssoState = urlParams.get('state');
  useEffect(() => {
    const init = async () => {
      if (code) {
        if (loading) {
          try {
            await handleRegularReponse(
              process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL,
              ssoState,
              process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
              process.env.REACT_APP_SSO_CLIENT_SECRET ?? process.env.NEXT_PUBLIC_SSO_CLIENT_SECRET
            );
          } catch (error) {
            console.log('error', error);
          }
        }
      }
      setLoading(false);
    };
    init();
  }, [code]);
  return (
    <SSOContext.Provider value={{ ...props.value }}>
      {typeof window !== 'undefined' && window?.opener && urlParams.get('state') === 'sso' && (
        <Spinner />
      )}
      {!loading && props.children}
    </SSOContext.Provider>
  );
};
