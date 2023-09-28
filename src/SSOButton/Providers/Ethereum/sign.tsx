import React, { useContext, useState } from 'react';
import { useSignMessage } from 'wagmi';
import { verifyMessage } from 'ethers';

import { useAccount } from 'wagmi';
import useWallet from '../../../Hooks/useWallet';
import { shortenString } from '../../../utils';
import { SSOModalContext } from '../../modal';
import logo from '../../images/ethereum_logo.png';
import CreateAccount from '../CreateAccount';
import arrow_left from '../../images/arrow_left.svg';

const SignMessage = ({ setIsAccountExist, setExpand }: any) => {
  const wallet = 'metamask';
  const { address, connector } = useAccount();
  const { getWalletNonce, verifySignature } = useWallet(wallet, address);
  const [status, setStatus] = useState('');
  const { noCreateAccount, isSignUpForm, handleOnData } = useContext(SSOModalContext);
  const [isExist, setIsExist] = useState(true);
  const [show, setShow] = useState(false);

  const { isLoading, signMessage } = useSignMessage({
    async onSuccess(data, variables) {
      const address = verifyMessage(variables.message, data);
      const res = await verifySignature(wallet, address, data);
      handleOnData({ ...res, loginType: 'metamask' });
    },
  });

  const handleSignMessage = async () => {
    setStatus('connect');
    const nonce = await getWalletNonce();

    if (nonce) {
      setStatus('sign');
      signMessage({ message: `${nonce}` });
    } else {
      !noCreateAccount && setIsExist(false);
      setIsAccountExist({ status: false, type: 'metamask' });
    }
    setStatus('');
  };

  return (
    <>
      {show ? (
        <>
          <div className="text-start">
            <div
              className="cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary"
              onClick={() => {
                setShow(false);
                setExpand('wallet');
                setIsAccountExist({ status: true, type: '' });
              }}
            >
              <img src={arrow_left} alt="Back Icon" className="me-1" />
              Back
            </div>
          </div>
          <div className="text-primary">
            <CreateAccount
              setShow={setShow}
              setIsExist={setIsExist}
              setIsAccountExist={setIsAccountExist}
              accountAddress={address}
              connection={connector}
              wallet={'metamask'}
            />
          </div>
        </>
      ) : (
        <>
          <button
            disabled={isLoading}
            className="btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center text-start"
            onClick={() => {
              if (!isExist || isSignUpForm) {
                setShow(true);
                setExpand('wallet-metamask');
              } else {
                handleSignMessage();
              }
            }}
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
            ) : !isExist || isSignUpForm ? (
              <>
                <img className="me-3" src={logo} alt="Ethereum Logo" />
                Create account via {connector?.name} ({address && shortenString(address)})
              </>
            ) : (
              <>
                <img className="me-3" src={logo} alt="Ethereum Logo" />
                Sign in via {connector?.name} ({address && shortenString(address)})
              </>
            )}
          </button>
        </>
      )}
    </>
  );
};

export default SignMessage;
