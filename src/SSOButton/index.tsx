import React, { Suspense, useEffect, useState } from 'react';
import SSOModal from './modal';

interface SSOButtonProps {
  className: string;
  text: string;
  onGetData: (data: any) => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({ className, text = 'Login', onGetData }) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <>
      <button type="button" className={`btn ${className}`} onClick={toggle}>
        {text}
      </button>
      <SSOModal onGetData={onGetData} show={show} toggle={toggle} />
    </>
  );
};

export default SSOButton;
