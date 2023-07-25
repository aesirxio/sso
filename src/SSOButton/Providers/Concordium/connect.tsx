import { BROWSER_WALLET, WALLET_CONNECT } from './config';
import React from 'react';

const ConnectConcordium = ({
  isConnecting,
  handleOnConnect,
  activeConnectorError,
  activeConnectorType,
  activeConnector,
}: any) => {
  return (
    <>
      <button
        className="btn btn-secondary"
        onClick={() => handleOnConnect(BROWSER_WALLET, 'browser')}
      >
        {isConnecting ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            Connecting
          </>
        ) : (
          <>Browser Wallet</>
        )}
      </button>
      <button
        className="btn btn-secondary ms-1"
        onClick={() => handleOnConnect(WALLET_CONNECT, 'walletconnect')}
      >
        {!activeConnectorError && activeConnectorType && !activeConnector ? (
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          'QR Code'
        )}
      </button>
    </>
  );
};

export default ConnectConcordium;
