/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
export const SSO = React.createContext();

export default class SSOProvider extends React.Component {
  render() {
    return <SSO.Provider value={{ ...this.props.value }}>{this.props.children}</SSO.Provider>;
  }
}
