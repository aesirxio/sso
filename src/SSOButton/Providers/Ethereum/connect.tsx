import { useWeb3Modal } from '@web3modal/react';
import React, { useState } from 'react';
import logo from '../../images/ethereum_logo.png';

const ConnectMetamask = () => {
  const [loading, setLoading] = useState(false);
  const { open } = useWeb3Modal();

  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }

  return (
    <button
      onClick={onOpen}
      disabled={loading}
      className="btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center justify-content-start rounded-pill"
    >
      {loading ? (
        <>
          <span
            className="spinner-border spinner-border-sm me-1"
            role="status"
            aria-hidden="true"
          ></span>
          Waiting for signing...
        </>
      ) : (
        <>
          <img className="me-3" src={logo} alt="Ethereum Logo" />
          Ethereum wallets
        </>
      )}
    </button>
  );
};

export default ConnectMetamask;
