import React, { useContext, useState } from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers';

import { useAccount } from 'wagmi';
import useWallet from '../../../Hooks/useWallet';
import { shortenString } from '../../../utils';
import { SSOModalContext } from '../../modal';
import logo from '../../images/ethereum_logo.png';

const SignMessage = () => {
  const wallet = 'metamask';
  const { address, connector } = useAccount();
  const { getWalletNonce, verifySignature } = useWallet(wallet, address);
  const [status, setStatus] = useState('');
  const { handleOnData } = useContext(SSOModalContext);

  const { isLoading, signMessage } = useSignMessage({
    async onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data);
      const res = await verifySignature(wallet, address, data);
      handleOnData(res);
    },
  });

  const handleSignMessage = async () => {
    setStatus('connect');
    const nonce = await getWalletNonce();

    if (nonce) {
      setStatus('sign');
      signMessage({ message: `${nonce}` });
    }
  };

  return (
    <>
      <button
        disabled={isLoading}
        className="btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center"
        onClick={handleSignMessage}
      >
        {status ? (
          <div className="d-flex align-items-center">
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="ms-1">
              {status === 'sign'
                ? `Please sign message via ${connector?.name}`
                : `Please wait to connect... via ${connector?.name}`}
            </span>
          </div>
        ) : (
          <>
            <img className="me-3" src={logo} alt="Ethereum Logo" />
            Sign in via {connector?.name} ({address && shortenString(address)})
          </>
        )}
      </button>
    </>
  );
};

export default SignMessage;
