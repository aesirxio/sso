import React, { Suspense, useEffect, useState } from 'react';
import SSOModal from './modal';

interface SSOButtonProps {
  className: string;
  text: string;
  loginText: string;
  loginBg?: string;
  onGetData: (data: any) => void;
  demoUser?: string;
  demoPassword?: string;
  noCreateAccount?: boolean;
}

const SSOButton: React.FC<SSOButtonProps> = ({
  className,
  text = 'Login',
  loginText = 'AesirX SSO',
  loginBg,
  onGetData,
  demoUser = '',
  demoPassword = '',
  noCreateAccount = false,
}) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    if (typeof window !== 'undefined') {
      !show
        ? document.body.classList.add('modal-sso-open')
        : document.body.classList.remove('modal-sso-open');
    }
    setShow(!show);
  };

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
        loginText={loginText}
        loginBg={loginBg}
      />
    </>
  );
};

export default SSOButton;
