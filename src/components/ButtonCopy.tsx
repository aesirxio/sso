import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons/faCopy';
import copy_icon from '../SSOButton/images/copy_icon.png';
import { useState } from 'react';
import ImageIcon from './ImageIcon';
function ButtonCopy({ content, className, text, isBlack = false, isReplaceClass, iconClass }: any) {
  const [copy, setCopy] = useState(false);
  const handleCopy = (content: any) => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
    navigator.clipboard.writeText(content);
  };
  const customClass = isReplaceClass
    ? className
    : `fs-8 lh-base font-opensans fw-bold btn btn-success text-body cursor-copy ${className}`;
  return (
    <button onClick={() => handleCopy(content)} disabled={copy} className={customClass}>
      {!copy ? (
        <>
          {text}{' '}
          {isBlack ? (
            <div className="d-flex align-items-center">
              <ImageIcon
                className={iconClass || 'icon-primary'}
                src={copy_icon}
                width={16}
                height={16}
              />
            </div>
          ) : (
            <FontAwesomeIcon icon={faCopy} width={16} height={16} className="text-body" />
          )}
        </>
      ) : (
        'COPIED!'
      )}
    </button>
  );
}

export default ButtonCopy;
