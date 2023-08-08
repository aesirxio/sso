import React, { Suspense } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

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
      <Modal centered fade={false} toggle={toggle} isOpen={show} container=".aesirxsso">
        <ModalHeader className="border-0" toggle={toggle}></ModalHeader>
        <ModalBody className="p-0">
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
