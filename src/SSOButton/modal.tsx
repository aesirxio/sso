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
  demoUser?: string;
  demoPassword?: string;
  noCreateAccount?: boolean;
  isSignUpForm?: boolean;
}

interface SSSOModalProps {
  onGetData: (data: any) => void;
  show: boolean;
  toggle: () => void;
  demoUser?: string;
  demoPassword?: string;
  noCreateAccount?: boolean;
  isSignUpForm?: boolean;
}

export const SSOModalContext = React.createContext<SSSOModalContextProps>(undefined);

const SSOProviders = React.lazy(() => import('./Providers'));

const SSOModal: React.FC<SSSOModalProps> = ({
  onGetData,
  show,
  toggle,
  demoUser,
  demoPassword,
  noCreateAccount,
  isSignUpForm = false,
}) => {
  const handleOnData = (data: any) => {
    onGetData(data);
    toggle();
  };

  return (
    <div className="aesirxsso">
      <Modal centered fade={false} toggle={toggle} isOpen={show} size={'xl'}>
        <CloseButton onClick={toggle} />
        <ModalBody className="p-0 bg-white rounded-3">
          <Suspense fallback={<>Loading...</>}>
            <SSOModalContext.Provider
              value={{
                handleOnData: handleOnData,
                demoUser: demoUser,
                demoPassword: demoPassword,
                noCreateAccount: noCreateAccount,
                isSignUpForm: isSignUpForm,
              }}
            >
              <SSOProviders />
            </SSOModalContext.Provider>
          </Suspense>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default SSOModal;
