/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import Spinner from '../Spinner/index';
export const SSOContext = React.createContext();

export class SSOContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getDerivedStateFromProps() {
    try {
      const endPoint = process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL;
      const clientID = process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID;

      const clientSecret =
        process.env.REACT_APP_SSO_CLIENT_SECRET ?? process.env.NEXT_PUBLIC_SSO_CLIENT_SECRET;
      const queryString = typeof window !== 'undefined' && window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (urlParams.get('state') === 'sso') {
        if (urlParams.get('code')) {
          const fetchData = await fetch(endPoint + '/index.php?option=token&api=oauth2', {
            method: 'POST',
            body: JSON.stringify({
              grant_type: 'authorization_code',
              code: urlParams.get('code'),
              client_id: clientID,
              client_secret: clientSecret,
            }),
            headers: assign({ 'Content-Type': 'application/json' }, { ['x-tracker-cache']: cache }),
          });
          const res = await fetchData.json();
          if (res && typeof window !== 'undefined') {
            window.opener.sso_response = res;
            window.close();
          }
        } else if (urlParams.get('error')) {
          typeof window !== 'undefined' && window.close();
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }
  render() {
    const queryString = typeof window !== 'undefined' && window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return (
      <SSOContext.Provider value={{ ...this.props.value }}>
        {typeof window !== 'undefined' && window?.opener && urlParams.get('state') === 'sso' && (
          <Spinner />
        )}
        {this.props.children}
      </SSOContext.Provider>
    );
  }
}
let cache;
const assign = (a, b) => {
  Object.keys(b).forEach((key) => {
    if (b[key] !== undefined) a[key] = b[key];
  });
  return a;
};
