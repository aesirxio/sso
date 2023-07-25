import React, { Suspense } from 'react';
import '../index.scss';

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
      {hasMetamask && (
        <div className="control-group mb-3 p-2 border text-center rounded-2">
          <Suspense fallback={<>Loading...</>}>
            <SSOEthereumProvider />{' '}
          </Suspense>
        </div>
      )}

      {hasConcordium && (
        <div className="control-group mb-3 p-2 border text-center rounded-2">
          <Suspense fallback={<>Loading...</>}>
            <SSOConcordiumProvider />{' '}
          </Suspense>
        </div>
      )}

      <div className="control-group mb-3 p-2 ">
        <Suspense fallback={<>Loading...</>}>
          <SSOEmailProvider />
        </Suspense>
      </div>
    </>
  );
};

export default SSOProviders;
