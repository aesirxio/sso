import React, { useEffect, useRef } from 'react';
import { Modal } from 'bootstrap';

interface SSSOModalContextProps {
  handleOnData: (data: any) => void;
}

export const SSOModalContext = React.createContext<SSSOModalContextProps>(undefined);

const SSOProviders = React.lazy(() => import('./Providers'));

const SSOModal = ({ onGetData }: any) => {
  const bsModal = useRef<Modal>();
  useEffect(() => {
    bsModal.current = new Modal('#ssoModal');
  }, []);

  const handleOnData = (data: any) => {
    onGetData(data);
    bsModal.current.hide();
  };

  return (
    <div
      className="modal fade"
      id="ssoModal"
      tabIndex={-1}
      aria-labelledby="ssoModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title fs-5" id="ssoModalLabel">
              Welcome to AesirX SSO <br /> Sign in to get started
            </h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <SSOModalContext.Provider value={{ handleOnData: handleOnData }}>
              <SSOProviders />
            </SSOModalContext.Provider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SSOModal;
