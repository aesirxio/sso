import { BROWSER_WALLET, WALLET_CONNECT } from './config';
import React from 'react';
import concordium_logo from '../../images/concordium.png';
import { isMobile, isDesktop, osName, OsTypes, isAndroid } from 'react-device-detect';
import { Col, Row } from 'react-bootstrap';

const ConnectConcordium = ({
  isConnecting,
  handleOnConnect,
  activeConnectorError,
  activeConnectorType,
  activeConnector,
  noLogin,
}: any) => {
  return (
    <>
      <div className="">
        <Row>
          <Col lg={`${noLogin ? '6' : '12'}`}>
            {isDesktop ? (
              <button
                disabled={isConnecting}
                type="button"
                className={`btn btn-dark btn-concordium fw-medium text-nowrap py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center justify-content-start w-100 ${
                  noLogin ? 'mb-3 mb-lg-0' : 'mb-3'
                }`}
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
                    <img
                      src={concordium_logo}
                      className="me-3 align-text-bottom"
                      alt="Concordium"
                      width={24}
                    />
                    Concordium Browser Wallet
                  </>
                )}
              </button>
            ) : isAndroid ? (
              <>
                <button
                  className={`btn btn-dark btn-concordium flex-grow-1 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center justify-content-start w-100`}
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
                      <div className="d-flex text-start align-items-center">
                        <p className="mb-0 fs-18 text-nowrap pe-3 me-3 border-end text-nowrap">
                          QR Code
                        </p>
                        <p className="mb-0 fs-12">Concordium or CryptoX Mobile Wallets</p>
                      </div>
                    </>
                  )}
                </button>
              </>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </div>
      {isMobile && isAndroid && (
        <div className="bg-success-light p-3 mt-3 fs-14 text-start">
          <p className="mb-1 fw-bold">Note for Concordium Wallet:</p>
          <p className="mb-0">
            Please connect & sign your signature on the app then switch back to the browser to
            continue
          </p>
        </div>
      )}
    </>
  );
};

export default ConnectConcordium;
