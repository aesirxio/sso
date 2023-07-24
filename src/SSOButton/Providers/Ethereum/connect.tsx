import { useWeb3Modal } from '@web3modal/react';
import React, { useState } from 'react';

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
      className="btn btn-white bg-white border fw-semibold"
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
        'Connect to Ethereum wallets'
      )}
    </button>
  );
};

export default ConnectMetamask;
