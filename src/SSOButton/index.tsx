import React, { Suspense, useEffect, useState } from 'react';
import SSOModal from './modal';

interface SSOButtonProps {
  className: string;
  text: string;
  onGetData: (data: any) => void;
  demoUser?: string;
  demoPassword?: string;
  noCreateAccount?: boolean;
}

const SSOButton: React.FC<SSOButtonProps> = ({
  className,
  text = 'Login',
  onGetData,
  demoUser = '',
  demoPassword = '',
  noCreateAccount = false,
}) => {
  const [show, setShow] = useState(false);
  console.log('noCreateAccount', noCreateAccount);
  const toggle = () => setShow(!show);

  return (
    <>
      <button type="button" className={`btn ${className}`} onClick={toggle}>
        {text}
      </button>
      <SSOModal
        demoUser={demoUser}
        demoPassword={demoPassword}
        noCreateAccount={noCreateAccount}
        onGetData={onGetData}
        show={show}
        toggle={toggle}
      />
    </>
  );
};

export default SSOButton;
