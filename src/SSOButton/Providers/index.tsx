import React, { Suspense, useContext, useState } from 'react';
import '../styles/index.scss';
import privacy_icon from '../images/privacy_icon.png';
import arrow_left from '../images/arrow_left.svg';
import login_bg from '../images/login_bg.png';
import cancel from '../images/cancel.svg';
const SSOConcordiumProvider = React.lazy(() => import('./Concordium'));
const SSOEthereumProvider = React.lazy(() => import('./Ethereum'));
const SSOEmailProvider = React.lazy(() => import('./Email'));
const SSOUpdateEmailProvider = React.lazy(() => import('./Email/update'));
const SSOSocialProvider = React.lazy(() => import('./Social'));

const SSOProviders = ({ loginText, loginBg, forgotPasswordLink }: any) => {
  const [expand, setExpand] = useState('');
  const [accountInfo, setAccountInfo] = useState({});
  const [isAccountExist, setIsAccountExist] = useState({ status: true, type: '' });
  const urlParams = new URLSearchParams(window.location.search);
  let login = ['concordium', 'metamask', 'regular'];

  if (urlParams.has('return')) {
    login = new URL(atob(urlParams.get('return'))).searchParams.getAll('login[]');
  }

  const hasMetamask = login.length === 0 || login.includes('metamask');
  const hasConcordium = login.length === 0 || login.includes('concordium');

  return (
    <>
      <div className="row gx-0 align-items-center w-100">
        <div className="col-lg-7">
          <div className="pt-0 pb-4 px-4 block-wallet">
            <div className="py-4 px-lg-4">
              {!expand ? (
                <>
                  <img src={privacy_icon} alt="Privacy Icon" />
                  <h3
                    className="fs-3 fw-semibold mt-2 mb-3 text-primary"
                    dangerouslySetInnerHTML={{ __html: `Welcome to ${loginText}` }}
                  ></h3>
                  <p className="mb-20px fs-14">Select your login method</p>
                  <button
                    type="button"
                    className="btn btn-success w-100 lh-sm text-white fw-semibold mb-18px"
                    onClick={() => {
                      setExpand('wallet');
                    }}
                  >
                    Log in with Web3 Wallets
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline w-100 lh-sm fw-semibold mb-18px"
                    onClick={() => {
                      setExpand('social');
                    }}
                  >
                    Log in with Social Media
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline w-100 lh-sm fw-semibold"
                    onClick={() => {
                      setExpand('email');
                    }}
                  >
                    Log in with email & password
                  </button>
                </>
              ) : expand === 'social' || expand === 'wallet' || expand === 'email' ? (
                <div className="text-start">
                  <div
                    className="cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary"
                    onClick={() => {
                      setExpand('');
                      setIsAccountExist({ status: true, type: '' });
                    }}
                  >
                    <img src={arrow_left} alt="Back Icon" className="me-1" />
                    Back
                  </div>
                </div>
              ) : (
                <></>
              )}
              {expand?.includes('wallet') && (
                <>
                  {!isAccountExist?.status &&
                    (expand === 'social' || expand === 'wallet' || expand === 'email') && (
                      <div className="bg-danger text-white px-3 py-2 rounded-2 d-flex align-items-center mb-3">
                        <img
                          className="me-1"
                          src={cancel}
                          alt="cancel Icon"
                          width="16px"
                          height="16px"
                        />
                        Your account not exist
                      </div>
                    )}
                  {(expand === 'wallet' || expand === 'wallet-metamask') && hasMetamask && (
                    <div className="mb-3">
                      <Suspense fallback={<>Loading...</>}>
                        <SSOEthereumProvider
                          setIsAccountExist={setIsAccountExist}
                          setExpand={setExpand}
                          setAccountInfo={setAccountInfo}
                        />
                      </Suspense>
                    </div>
                  )}

                  {(expand === 'wallet' || expand === 'wallet-concordium') && hasConcordium && (
                    <div>
                      <Suspense fallback={<>Loading...</>}>
                        <SSOConcordiumProvider
                          setIsAccountExist={setIsAccountExist}
                          setExpand={setExpand}
                          setAccountInfo={setAccountInfo}
                        />
                      </Suspense>
                    </div>
                  )}
                </>
              )}
              {expand === 'email' && (
                <div className="control-group">
                  <Suspense fallback={<>Loading...</>}>
                    <SSOEmailProvider forgotPasswordLink={forgotPasswordLink} />
                  </Suspense>
                </div>
              )}
              {expand?.includes('social') && (
                <div>
                  {!isAccountExist?.status &&
                    (expand === 'social' || expand === 'wallet' || expand === 'email') && (
                      <div className="bg-danger text-white px-3 py-2 rounded-2 d-flex align-items-center">
                        <img
                          className="me-1"
                          src={cancel}
                          alt="cancel Icon"
                          width="16px"
                          height="16px"
                        />
                        Your account not link to {isAccountExist?.type} yet
                      </div>
                    )}
                  {(expand === 'social' || expand === 'social-google') && (
                    <div className="mb-1">
                      <Suspense fallback={<>Loading...</>}>
                        <SSOSocialProvider
                          typeSocial="google"
                          isAccountExist={isAccountExist}
                          setIsAccountExist={setIsAccountExist}
                          setExpand={setExpand}
                          setAccountInfo={setAccountInfo}
                        />
                      </Suspense>
                    </div>
                  )}
                  {(expand === 'social' || expand === 'social-twitter') && (
                    <div className="mb-1">
                      <Suspense fallback={<>Loading...</>}>
                        <SSOSocialProvider
                          typeSocial="twitter"
                          isAccountExist={isAccountExist}
                          setIsAccountExist={setIsAccountExist}
                          setExpand={setExpand}
                          setAccountInfo={setAccountInfo}
                        />
                      </Suspense>
                    </div>
                  )}
                  {(expand === 'social' || expand === 'social-facebook') && (
                    <div>
                      <Suspense fallback={<>Loading...</>}>
                        <SSOSocialProvider
                          typeSocial="facebook"
                          isAccountExist={isAccountExist}
                          setIsAccountExist={setIsAccountExist}
                          setExpand={setExpand}
                          setAccountInfo={setAccountInfo}
                        />
                      </Suspense>
                    </div>
                  )}
                  {(expand === 'social' || expand === 'social-reddit') && (
                    <div>
                      <Suspense fallback={<>Loading...</>}>
                        <SSOSocialProvider
                          typeSocial="reddit"
                          isAccountExist={isAccountExist}
                          setIsAccountExist={setIsAccountExist}
                          setExpand={setExpand}
                          setAccountInfo={setAccountInfo}
                        />
                      </Suspense>
                    </div>
                  )}
                </div>
              )}
              {expand?.includes('require-email') && (
                <>
                  <div className="control-group">
                    <Suspense fallback={<>Loading...</>}>
                      <SSOUpdateEmailProvider accountInfo={accountInfo} />
                    </Suspense>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="d-none d-lg-block col-lg-5">
          <img className="w-100" src={loginBg ? loginBg : login_bg} alt="Login Background" />
        </div>
      </div>
    </>
  );
};

export default SSOProviders;
