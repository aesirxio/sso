/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import axios from 'axios';
import AesirxAuthenticationApiService from 'aesirx-dma-lib/src/Authentication/Authentication';
import Storage from 'aesirx-dma-lib/src/Utils/Storage';
import BaseRoute from 'aesirx-dma-lib/src/Abstract/BaseRoute';
import qs from 'query-string';
export const SSOContext = React.createContext();

export class SSOContextProvider extends React.Component {
  constructor(props) {
    super(props);
  }

  static async getDerivedStateFromProps() {
    try {
      const endPoint = process.env.REACT_APP_ENDPOINT_URL;
      const clientID = process.env.REACT_APP_SSO_CLIENT_ID;
      const clientSecret = process.env.REACT_APP_SSO_CLIENT_SECRET;
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);

      if (urlParams.get('code')) {
        const reqAuthFormData = {
          grant_type: 'authorization_code',
          code: urlParams.get('code'),
          client_id: clientID,
          client_secret: clientSecret,
        };

        const AUTHORIZED_CODE_URL = BaseRoute.__createRequestURL(
          {
            option: 'token',
            api: 'oauth2',
          },
          false,
          endPoint
        );

        const config = {
          method: 'post',
          url: AUTHORIZED_CODE_URL,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: qs.stringify(reqAuthFormData),
        };
        const { data } = await axios(config);
        if (data?.access_token) {
          const authService = new AesirxAuthenticationApiService();
          await authService.setTokenUser(data, false);
          Storage.setItem('auth', true);
          window.close();
          window.opener.location.reload(false);
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
