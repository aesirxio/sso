import { faCheckCircle } from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { ReactNode } from 'react';
import ButtonCopy from './ButtonCopy';
interface ComponentTags {
  title: string;
  value: string | ReactNode;
  className?: string;
  contentCopy?: string;
}
const ComponentTags = ({ title, value, className, contentCopy }: ComponentTags) => {
  return (
    <div
      className={`custom_tags border text-dark rounded-1 mb-0 py-1 px-20px d-flex justify-content-between fw-semibold ${className}`}
    >
      <span className="d-flex align-items-center">
        <FontAwesomeIcon
          icon={faCheckCircle}
          width={16}
          height={16}
          className="text-success me-1"
        />
        {title}
      </span>
      <p className="mb-0">
        {value}{' '}
        {contentCopy && (
          <ButtonCopy
            content={contentCopy}
            isBlack
            className="bg-transparent border-0 text-dark px-1"
          />
        )}
      </p>
    </div>
  );
};

export default ComponentTags;
