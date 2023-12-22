import React, { useContext, useState } from 'react';
import useWallet from '../../../Hooks/useWallet';

import { toast } from 'react-toastify';
import {
  checkWalletAccount,
  getChallenge,
  getMember,
  getStatement,
  shortenString,
  verifyProof,
} from '../../../utils';
import { SSOModalContext } from '../../modal';
import concordium_logo from '../../images/concordium.png';
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import CreateAccount from '../CreateAccount';
import { stringMessage } from '@concordium/react-components';
import arrow_left from '../../images/arrow_left.svg';

const SignMessageConcordium = ({
  account,
  connection,
  setIsAccountExist,
  setExpand,
  setAccountInfo,
}: any) => {
  const [status, setStatus] = useState('');
  const [isExist, setIsExist] = useState(true);
  const [proof, setProof] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const wallet = 'concordium';
  const { noCreateAccount, isSignUpForm, handleOnData, toggle, isRequireEmail } =
    useContext(SSOModalContext);

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
          if (isRequireEmail) {
            const member = await getMember(data?.access_token);
            if (
              !member?.email ||
              (/@aesirx\.io$/.test(member?.email) &&
                ((member?.wallet_concordium &&
                  member?.email?.includes(member?.wallet_concordium)) ||
                  (member?.wallet_metamask && member?.email?.includes(member?.wallet_metamask))))
            ) {
              setExpand('require-email');
              setAccountInfo({ data: data, memberId: member?.member_id });
            } else {
              handleOnData({ ...data, loginType: 'concordium' });
            }
          } else {
            handleOnData({ ...data, loginType: 'concordium' });
          }
        }
      } catch (error) {
        toast(error.message);
      }
    } else {
      !noCreateAccount && setIsExist(false);
      setIsAccountExist({ status: false, type: 'concordium' });
    }
    setStatus('');
  };

  const handleCreate = async () => {
    setStatus('loading');
    try {
      const checkAccount = await checkWalletAccount(account, wallet);
      if (!checkAccount?.data?.result) {
        if (!proof) {
          const responseProof = await handleProof();
          if (responseProof) {
            setShow(true);
            setExpand('wallet-concordium');
          }
        } else {
          setShow(true);
          setExpand('wallet-concordium');
        }
      } else {
        toast.error("You've already created an account with this wallet.");
      }
      setStatus('');
    } catch (error) {
      console.log(error);
      setStatus('');
      toast.error(error?.response?.data?.error || error?.message);
    }
  };

  const handleProof = async () => {
    setLoading(true);
    try {
      const challenge = await getChallenge(account ?? '');
      const statement = await getStatement();
      const provider = await detectConcordiumProvider();
      const proof = await provider.requestIdProof(account ?? '', statement, challenge);
      const re = await verifyProof(challenge, proof);

      if (re) {
        setProof(true);
        setLoading(false);
      }
      return true;
    } catch (error) {
      setProof(false);
      setLoading(false);
      return false;
    }
  };
  const handleSuccess = async () => {
    setShow(false);
    setExpand('wallet');
    setIsAccountExist({ status: true, type: '' });
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
              setShow={isSignUpForm ? toggle : handleSuccess}
              setIsExist={setIsExist}
              setIsAccountExist={setIsAccountExist}
              accountAddress={account}
              connection={connection}
              wallet={'concordium'}
              isRequireEmail={isRequireEmail}
            />
          </div>
        </>
      ) : (
        <>
          <button
            disabled={status !== '' || loading}
            className="btn btn-dark btn-concordium w-100 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center text-start"
            onClick={() => {
              !isExist || isSignUpForm ? handleCreate() : handleConnect();
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
                    ? 'Please sign message on the wallet'
                    : status === 'loading'
                    ? 'Connecting...'
                    : `Please wait to connect...`}
                </span>
              </div>
            ) : !isExist || isSignUpForm ? (
              <>
                <img
                  src={concordium_logo}
                  className="me-3 align-text-bottom"
                  alt="Concordium logo"
                  width={24}
                />
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-1"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="ms-1">{!proof ? 'Authorizing' : 'Loading...'}</span>
                  </>
                ) : (
                  <>Create account via Concordium ({account && shortenString(account)})</>
                )}
              </>
            ) : (
              <>
                <img
                  src={concordium_logo}
                  className="me-3 align-text-bottom"
                  alt="Concordium logo"
                  width={24}
                />
                Sign in via Concordium ({account && shortenString(account)})
              </>
            )}
          </button>
        </>
      )}
    </>
  );
};

export default SignMessageConcordium;
