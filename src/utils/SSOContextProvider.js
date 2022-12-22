/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import axios from 'axios';
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
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (urlParams.get('state') === 'sso') {
        if (urlParams.get('code')) {
          const res = await axios.post(endPoint + '/index.php?option=token&api=oauth2', {
            grant_type: 'authorization_code',
            code: urlParams.get('code'),
            client_id: clientID,
            client_secret: clientSecret,
          });
          if (res.data) {
            window.opener.sso_response = res.data;
            window.close();
          }
        } else {
          const data = { profile: { lastVisitDate: '' } };
          urlParams.get('access_token') &&
            Object.assign(data, { access_token: urlParams.get('access_token') });
          urlParams.get('expires_in') &&
            Object.assign(data, { expires_in: urlParams.get('expires_in') });
          urlParams.get('refresh_token') &&
            Object.assign(data, { refresh_token: urlParams.get('refresh_token') });
          urlParams.get('scope') && Object.assign(data, { scope: urlParams.get('scope') });
          urlParams.get('token_type') &&
            Object.assign(data, { scope: urlParams.get('token_type') });

          if (Object.keys(data).length) {
            window.opener.sso_response = data;
            window.close();
          }
        }
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  render() {
    return (
      <SSOContext.Provider value={{ ...this.props.value }}>
        {this.props.children}
      </SSOContext.Provider>
    );
  }
}
