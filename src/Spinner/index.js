/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`${this.props.className} d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle zindex-1 w-100 h-100`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
      >
        <MoonLoader color={`#1ab394`} size={`${this.props.size ?? '60px'}`} />
      </div>
    );
  }
}

export default Spinner;
