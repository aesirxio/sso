import React, { useContext, useState } from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers';

import { useAccount } from 'wagmi';
import useWallet from '../../../Hooks/useWallet';
import { shortenString } from '../../../utils';
import { SSOModalContext } from '../../modal';

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
      <p className="text-break">
        <span className="fw-semibold">Wallet:</span>
        <span className="ms-1">{address && shortenString(address)}</span>
      </p>
      <button disabled={isLoading} className="btn btn-secondary" onClick={handleSignMessage}>
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
          <>Sign in via {connector?.name}</>
        )}
      </button>
    </>
  );
};

export default SignMessage;
