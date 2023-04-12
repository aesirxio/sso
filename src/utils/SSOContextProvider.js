/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import Spinner from '../Spinner/index';
import { handleRegularReponse } from './index';
export const SSOContext = React.createContext();

export class SSOContextProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static async getDerivedStateFromProps() {
    try {
      handleRegularReponse(
        process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL,
        'sso',
        process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
        process.env.REACT_APP_SSO_CLIENT_SECRET ?? process.env.NEXT_PUBLIC_SSO_CLIENT_SECRET
      );

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
