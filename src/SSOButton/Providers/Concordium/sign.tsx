import React, { useContext, useState } from 'react';
import useWallet from '../../../Hooks/useWallet';

import { toast } from 'react-toastify';
import { shortenString } from '../../../utils';
import { stringMessage } from '@concordium/react-components';
import { SSOModalContext } from '../../modal';

const SignMessageConcordium = ({ account, connection }: any) => {
  const [status, setStatus] = useState('');
  const wallet = 'concordium';
  const { handleOnData } = useContext(SSOModalContext);

  const { getWalletNonce, verifySignature } = useWallet(wallet, account);

  const handleConnect = async () => {
    setStatus('connect');
    const nonce = await getWalletNonce();

    if (nonce) {
      try {
        setStatus('sign');
        const signature = await connection.signMessage(account, stringMessage(`${nonce}`));
        const convertedSignature =
          typeof signature === 'object' && signature !== null ? signature : JSON.parse(signature);

        if (signature) {
          const data = await verifySignature(wallet, account, convertedSignature);
          handleOnData(data);
        }
      } catch (error) {
        toast(error.message);
      }
    }
    setStatus('');
  };
  return (
    <>
      <p className="text-break">
        <span className="fw-semibold">Wallet:</span>
        <span className="ms-1">{account && shortenString(account)}</span>
      </p>
      <button className="btn btn-secondary" onClick={handleConnect}>
        {status ? (
          <div className="d-flex align-items-center">
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="ms-1">
              {status === 'sign'
                ? 'Please sign message on the wallet'
                : `Please wait to connect...`}
            </span>
          </div>
        ) : (
          <>Sign in via Concordium</>
        )}
      </button>
    </>
  );
};

export default SignMessageConcordium;
