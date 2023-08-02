import React, { Suspense } from 'react';
import '../index.scss';
import privacy_icon from '../images/privacy_icon.png';

const SSOConcordiumProvider = React.lazy(() => import('./Concordium'));
const SSOEthereumProvider = React.lazy(() => import('./Ethereum'));
const SSOEmailProvider = React.lazy(() => import('./Email'));

const SSOProviders = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let login = ['concordium', 'metamask', 'regular'];

  if (urlParams.has('return')) {
    login = new URL(atob(urlParams.get('return'))).searchParams.getAll('login[]');
  }

  const hasMetamask = login.length === 0 || login.includes('metamask');
  const hasConcordium = login.length === 0 || login.includes('concordium');

  return (
    <>
      <div className="pt-5 pb-4 px-4 block-wallet rounded-top">
        <div className="px-3 text-center">
          <img src={privacy_icon} alt="Privacy Icon" />
          <h3 className="fs-2 fw-semibold mt-2 mb-4 text-primary">Welcome to AesirX SSO</h3>
          {hasMetamask && (
            <div className="mb-3">
              <Suspense fallback={<>Loading...</>}>
                <SSOEthereumProvider />{' '}
              </Suspense>
            </div>
          )}

          {hasConcordium && (
            <div>
              <Suspense fallback={<>Loading...</>}>
                <SSOConcordiumProvider />{' '}
              </Suspense>
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
