import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Concordium from './Concordium';
import { useUserContext, UserContextProvider } from '../SSOButton/Providers/user';
import MetaMask from './MetaMask';
import 'react-toastify/dist/ReactToastify.css';
import { useGlobalContext, GlobalContextProvider } from '../SSOButton/Providers/global';
import { connectWallet, removeWallet } from '../utils/index';
import DeleteModal from './DeleteModal';
import { useState, useEffect } from 'react';
import Email from './AesirX/Email';
import Password from './AesirX/Password';
import Social from './Social';
import Web3ContextProvider from '../SSOButton/Providers/web3';
import { Spinner } from '../components/Spinner';
import { notify } from '../components/Toast';

const SSO = () => {
  return (
    <GlobalContextProvider>
      <UserContextProvider>
        <Web3ContextProvider autoLoad={true}>
          <SSOApp />
        </Web3ContextProvider>
      </UserContextProvider>
    </GlobalContextProvider>
  );
};
interface DeleteModal {
  show: Boolean;
  data?: {
    address: string;
    wallet: string;
  };
}

const SSOApp = () => {
  const [modal, setModal] = useState<DeleteModal>({ show: false });
  const [modalPassword, setModalPassword] = useState(false);
  const { aesirxData, getData } = useUserContext();
  const { jwt, accessToken } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  const connectWeb3Wallet = async (address: string, walletType: string) => {
    let connectSuccess = true;
    if (address) {
      try {
        const response = await connectWallet(
          address,
          walletType ?? 'concordium',
          accessToken,
          aesirxData?.username
        );
        if (response?.result) {
          notify('Connect wallet sucessfully!', 'success');
        } else {
          notify(`${response?._messages?.[0]?.message}`, 'error');
        }
      } catch (error: any) {
        connectSuccess = false;
        notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, 'error');
      }
    }
    if (connectSuccess) {
      await getData(jwt, accessToken);
    }
  };
  const removeWeb3Wallet = async (address: string, walletType: string) => {
    let removeSuccess = true;
    if (address) {
      try {
        const response = await removeWallet(
          address,
          walletType ?? 'concordium',
          accessToken,
          aesirxData?.username
        );
        if (response?.result) {
          notify('Remove wallet sucessfully!', 'success');
        } else {
          notify(`${response?._messages?.[0]?.message}`, 'error');
        }
      } catch (error: any) {
        removeSuccess = false;
        notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, 'error');
      }
    }
    if (removeSuccess) {
      await getData(jwt, accessToken);
    }
  };

  return (
    <>
      {modal?.show && (
        <DeleteModal
          data={modal?.data}
          action={removeWeb3Wallet}
          setShow={setModal}
          show={modal?.show}
        />
      )}
      {modalPassword && <Password setShow={setModalPassword} show={modal} />}
      <h2 className="fs-24 fw-semibold mb-3 p-3">Single Sign-On Management</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="bg-white rounded p-4">
          <h3 className="fs-5 fw-medium mb-12px">WEB3</h3>
          <Row>
            <Col md={6} lg={6} xxl={4} className="mb-4">
              <Concordium setShow={setModal} connectWallet={connectWeb3Wallet} />
            </Col>
            <Col md={6} lg={6} xxl={4} className="mb-4">
              <MetaMask setShow={setModal} connectWallet={connectWeb3Wallet} />
            </Col>
          </Row>
          <h3 className="fs-5 d-flex align-items-center fw-medium mb-12px">
            AesirX Account
            <p
              onClick={() => setModalPassword(true)}
              className="fw-medium fs-7 ms-4 mb-0 text-decoration-underline text-success cursor-pointer"
            >
              Change Password
            </p>
          </h3>
          <Row>
            <Col md={6} lg={6} xxl={4} className="mb-4">
              <Email />
            </Col>
          </Row>
          <h3 className="fs-5 fw-medium mb-12px">Social Media</h3>
          <Row>
            <Col md={6} lg={6} xxl={4} className="mb-4">
              <Social typeSocial="google" keySocial={'social_google'} />
            </Col>
            <Col md={6} lg={6} xxl={4} className="mb-4">
              <Social typeSocial="twitter" keySocial={'social_twitter'} />
            </Col>
            <Col md={6} lg={6} xxl={4} className="mb-4">
              <Social typeSocial="facebook" keySocial={'social_facebook'} />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default SSO;
