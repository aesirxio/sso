/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import MoonLoader from 'react-spinners/MoonLoader';

export default function Spinner({ className = '', size }: any) {
  return (
    <div
      className={`${className} d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle zindex-1 w-100 h-100`}
    >
      <MoonLoader color={`#1ab394`} size={`${size ?? '60px'}`} />
    </div>
  );
}

export { Spinner };
