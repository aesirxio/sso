/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Image = (props: any) => (
  <LazyLoadImage
    placeholderSrc={
      props?.placeholderSrc ? props?.placeholderSrc : '/assets/images/default_channel_image.png'
    }
    {...props}
    effect="blur"
  />
);

export { Image };
