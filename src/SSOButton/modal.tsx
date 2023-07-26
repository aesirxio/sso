import React, { Suspense } from 'react';
import logoImg from './logo.svg';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

interface SSSOModalContextProps {
  handleOnData: (data: any) => void;
  demoUser?: string;
  demoPassword?: string;
}

interface SSSOModalProps {
  onGetData: (data: any) => void;
  show: boolean;
  toggle: () => void;
  demoUser?: string;
  demoPassword?: string;
}

export const SSOModalContext = React.createContext<SSSOModalContextProps>(undefined);

const SSOProviders = React.lazy(() => import('./Providers'));

const SSOModal: React.FC<SSSOModalProps> = ({
  onGetData,
  show,
  toggle,
  demoUser,
  demoPassword,
}) => {
  const handleOnData = (data: any) => {
    onGetData(data);
    toggle();
  };

  return (
    <div className="aesirxsso">
      <Modal fade={false} toggle={toggle} isOpen={show} container=".aesirxsso">
        <ModalHeader className="justify-content-center text-center">
          <div className="d-flex fs-2 align-items-baseline">
            <span className="me-2">Welcome to </span>
            <img src={logoImg} alt="AesirX" />
            <span className="ms-2">SSO</span>
          </div>
          <div>Sign in to get started</div>
        </ModalHeader>
        <ModalBody>
          <Suspense fallback={<>Loading...</>}>
            <SSOModalContext.Provider
              value={{ handleOnData: handleOnData, demoUser: demoUser, demoPassword: demoPassword }}
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
