import { Image } from '../components/Image';
import React from 'react';
import success_img from '../SSOButton/images/toast_success.png';
import danger_img from '../SSOButton/images/toast_danger.png';
import CreateMarkup from './CreateMarkup';

const Toast = (props: any) => {
  return (
    <div
      className="toast-popup d-flex align-items-center"
      style={props.status ? { color: '#047857' } : { color: '#B91C1C' }}
    >
      <div className="toast-popup-image">
        <Image
          quality={100}
          src={props.status ? success_img : danger_img}
          width={55}
          height={55}
          alt="toast img"
        />
      </div>
      <div className="ms-3">
        <p className="mb-1">{props.title ? props.title : props.status ? 'Success!' : 'Fail!'}</p>
        <p className="mb-0">
          <CreateMarkup htmlString={props.message} />
        </p>
      </div>
    </div>
  );
};
export default Toast;
