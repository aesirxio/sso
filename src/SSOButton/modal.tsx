import React, { Suspense } from 'react';
import { CloseButton, Modal, ModalBody } from 'react-bootstrap';

declare global {
  interface Window {
    process: any;
  }
}
if (typeof window !== 'undefined') {
  window.process = { env: '' };
}
interface SSSOModalContextProps {
  handleOnData: (data: any) => void;
  toggle: () => void;
  demoUser?: string;
  demoPassword?: string;
  noCreateAccount?: boolean;
  isRequireEmail?: boolean;
  isSignUpForm?: boolean;
}

interface SSSOModalProps {
  onGetData: (data: any) => void;
  show: boolean;
  toggle: () => void;
  demoUser?: string;
  demoPassword?: string;
  noCreateAccount?: boolean;
  isRequireEmail?: boolean;
  isSignUpForm?: boolean;
  loginText: string;
  loginBg?: string;
  customClass?: string;
  forgotPasswordLink?: string;
}

export const SSOModalContext = React.createContext<SSSOModalContextProps>(undefined);

import SSOProviders from './Providers';

const SSOModal: React.FC<SSSOModalProps> = ({
  onGetData,
  show,
  toggle,
  demoUser,
  demoPassword,
  noCreateAccount,
  isRequireEmail = false,
  isSignUpForm = false,
  loginText,
  loginBg,
  customClass,
  forgotPasswordLink,
}) => {
  const handleOnData = (data: any) => {
    onGetData(data);
    toggle();
  };

  return (
    <div className="aesirxsso">
      <Modal
        centered
        fade={false}
        show={show}
        onHide={() => {
          toggle();
        }}
        size={'xl'}
        className={`aesirxsso ${customClass ?? ''}`}
      >
        <CloseButton onClick={toggle} />
        <ModalBody className="p-0 bg-white rounded-3">
          <Suspense fallback={<>Loading...</>}>
            <SSOModalContext.Provider
              value={{
                handleOnData: handleOnData,
                toggle: toggle,
                demoUser: demoUser,
                demoPassword: demoPassword,
                noCreateAccount: noCreateAccount,
                isRequireEmail: isRequireEmail,
                isSignUpForm: isSignUpForm,
              }}
            >
              <SSOProviders
                forgotPasswordLink={forgotPasswordLink}
                loginText={loginText}
                loginBg={loginBg}
              />
            </SSOModalContext.Provider>
          </Suspense>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SSOModal;
