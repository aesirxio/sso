import { BROWSER_WALLET, WALLET_CONNECT } from './config';
import React from 'react';
import concordium_logo from '../../images/concordium_logo.png';
import { isMobile, isDesktop, osName, OsTypes } from 'react-device-detect';

const ConnectConcordium = ({
  isConnecting,
  handleOnConnect,
  activeConnectorError,
  activeConnectorType,
  activeConnector,
}: any) => {
  return (
    <div className="d-flex flex-row flex-wrap">
      {isDesktop && (
        <button
          disabled={isConnecting}
          className="btn btn-dark btn-concordium flex-grow-1 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center justify-content-center mb-3"
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
            <>
              <img src={concordium_logo} className="me-3 align-text-bottom" alt="Concordium" />
              Concordium Browser Wallet
            </>
          )}
        </button>
      )}

      <button
        className="btn btn-dark btn-concordium flex-grow-1 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center justify-content-center"
        onClick={() => handleOnConnect(WALLET_CONNECT, 'walletconnect')}
      >
        {!activeConnectorError && activeConnectorType && !activeConnector ? (
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
            aria-hidden="true"
          ></span>
        ) : (
          <>
            <img src={concordium_logo} className="me-3 align-text-bottom" alt="Concordium" />
            {isMobile ? 'Concordium or CryptoX' : 'QR Code (Concordium Mobile or CryptoX Mobile)'}
          </>
        )}
      </button>
    </div>
  );
};

export default ConnectConcordium;
