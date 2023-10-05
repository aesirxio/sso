import { faCheckCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
interface Props {
  type: 'success' | 'error';
  content: ReactNode | string;
}
const ComponentAlert = ({ type, content }: Props) => {
  let alertClass = 'bg-green-light text-success';
  switch (type) {
    case 'success':
      alertClass = 'bg-green-light text-success';
      break;
    case 'error':
      alertClass = 'bg-warning-50 text-warning';
      break;
  }
  return (
    <div className={`${alertClass} text-start rounded py-20px px-3 mb-4 d-flex`}>
      <span className="me-2">
        <FontAwesomeIcon
          icon={type == 'success' ? faCheckCircle : faXmarkCircle}
          width={16}
          height={16}
          className="fs-6"
        />
      </span>
      <div>{content}</div>
    </div>
  );
};

export default ComponentAlert;
