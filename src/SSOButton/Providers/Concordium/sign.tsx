import React, { useContext, useState } from 'react';
import useWallet from '../../../Hooks/useWallet';

import { toast } from 'react-toastify';
import { shortenString } from '../../../utils';
import { stringMessage } from '@concordium/react-components';
import { SSOModalContext } from '../../modal';
import concordium_logo from '../../images/concordium_logo.png';

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
      <button
        disabled={status !== ''}
        className="btn btn-dark btn-concordium w-100 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center"
        onClick={handleConnect}
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
                ? 'Please sign message on the wallet'
                : `Please wait to connect...`}
            </span>
          </div>
        ) : (
          <>
            <img src={concordium_logo} className="me-3 align-text-bottom" alt="Concordium logo" />
            Sign in via Concordium ({account && shortenString(account)})
          </>
        )}
      </button>
    </>
  );
};

export default SignMessageConcordium;
