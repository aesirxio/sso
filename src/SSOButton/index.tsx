import React, { Suspense, useEffect, useState } from 'react';
import SSOModal from './modal';

interface SSOButtonProps {
  className: string;
  text: string;
  onGetData: (data: any) => void;
  demoUser?: string;
  demoPassword?: string;
}

const SSOButton: React.FC<SSOButtonProps> = ({
  className,
  text = 'Login',
  onGetData,
  demoUser = '',
  demoPassword = '',
}) => {
  const [show, setShow] = useState(false);

  const toggle = () => setShow(!show);

  return (
    <>
      <button type="button" className={`btn ${className}`} onClick={toggle}>
        {text}
      </button>
      <SSOModal
        demoUser={demoUser}
        demoPassword={demoPassword}
        onGetData={onGetData}
        show={show}
        toggle={toggle}
      />
    </>
  );
};

export default SSOButton;
