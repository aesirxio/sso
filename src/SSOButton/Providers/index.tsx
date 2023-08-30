import React, { Suspense, useState } from 'react';
import '../styles/index.scss';
import privacy_icon from '../images/privacy_icon.png';
import back_icon from '../images/back_icon.svg';
const SSOConcordiumProvider = React.lazy(() => import('./Concordium'));
const SSOEthereumProvider = React.lazy(() => import('./Ethereum'));
const SSOEmailProvider = React.lazy(() => import('./Email'));
const SSOSocialProvider = React.lazy(() => import('./Social'));

const SSOProviders = () => {
  const [expand, setExpand] = useState('');
  const urlParams = new URLSearchParams(window.location.search);
  let login = ['concordium', 'metamask', 'regular'];

  if (urlParams.has('return')) {
    login = new URL(atob(urlParams.get('return'))).searchParams.getAll('login[]');
  }

  const hasMetamask = login.length === 0 || login.includes('metamask');
  const hasConcordium = login.length === 0 || login.includes('concordium');

  return (
    <>
      <div className="pt-0 pb-4 px-4 block-wallet rounded-top">
        <div className="px-lg-3 text-center">
          <img src={privacy_icon} alt="Privacy Icon" />
          <h3 className="fs-2 fw-semibold mt-2 mb-4 text-primary">Welcome to AesirX SSO</h3>
          {hasMetamask && (
            <div className="mb-3">
              <Suspense fallback={<>Loading...</>}>
                <SSOEthereumProvider />
              </Suspense>
            </div>
          )}

          {hasConcordium && (
            <div>
              <Suspense fallback={<>Loading...</>}>
                <SSOConcordiumProvider />
              </Suspense>
            </div>
          )}
          <div className="line my-3 text-center">
            <span className="px-2 position-relative text-dark bg-body">or</span>
          </div>
          {!expand && (
            <>
              <button
                type="button"
                className="btn btn-success w-100 lh-sm text-white fw-semibold"
                onClick={() => {
                  setExpand('social');
                }}
              >
                Login With Social Media
              </button>
            </>
          )}
          {expand === 'social' && (
            <div className="text-start">
              <div
                className="cursor-pointer fw-medium d-inline-block"
                onClick={() => {
                  setExpand('');
                }}
              >
                <img src={back_icon} alt="Back Icon" className="me-1" />
                Back
              </div>
              <div className="row gx-1">
                <div className="col-lg-12 mb-1">
                  <Suspense fallback={<>Loading...</>}>
                    <SSOSocialProvider typeSocial="google" />
                  </Suspense>
                </div>
                <div className="col-lg-12 mb-1">
                  <Suspense fallback={<>Loading...</>}>
                    <SSOSocialProvider typeSocial="twitter" />
                  </Suspense>
                </div>
                <div className="col-lg-12">
                  <Suspense fallback={<>Loading...</>}>
                    <SSOSocialProvider typeSocial="facebook" />
                  </Suspense>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="control-group pt-3 px-4 pb-5">
        <Suspense fallback={<>Loading...</>}>
          <SSOEmailProvider />
        </Suspense>
      </div>
    </>
  );
};

export default SSOProviders;
