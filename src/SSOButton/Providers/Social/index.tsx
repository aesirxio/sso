import React, { useContext, useState } from 'react';
import { getClientApp } from '../../../utils';
import axios from 'axios';
import { SSOModalContext } from '../../modal';
import fb_icon from '../../images/fb_icon.png';
import google_icon from '../../images/google_icon.png';
import twitter_icon from '../../images/twitter_icon.png';
import { Button, CloseButton, Modal, ModalBody } from 'react-bootstrap';
import CreateAccount from '../CreateAccount';

const SSOSocialProvider = ({ typeSocial, isAccountExist, setIsAccountExist }: any) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [idSocial, setIdSocial] = useState('');
  const { handleOnData } = useContext(SSOModalContext);
  const { endpoint } = getClientApp();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response: any = await axios.get(
        `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=${
          !isAccountExist?.status && isAccountExist?.type === typeSocial
            ? 'getSocialCreateUrl'
            : 'getSocialLoginUrl'
        }&api=hal&socialType=${typeSocial}`
      );
      response?.data.result[0] &&
        window.open(response?.data.result[0], 'SSO', 'status=1,height=750,width=650');
      window.addEventListener(
        'message',
        (e) => {
          if (e.origin !== endpoint) return;
          if (e.data && e.data.socialLogin) {
            const dataLogin = JSON.parse(e.data.socialLogin);
            handleOnData(dataLogin);
          } else if (e.data.error) {
            setIsAccountExist({ status: false, type: typeSocial });
            setIdSocial(e.data.id);
          }
        },
        false
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  return (
    <div className="mt-3">
      <Button
        variant="outline"
        type="button"
        onClick={(e) => {
          !isAccountExist?.status && isAccountExist?.type === typeSocial
            ? setShow(true)
            : handleSubmit(e);
        }}
        className="w-100 lh-sm fw-semibold d-flex align-items-center"
      >
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            Waiting...
          </>
        ) : (
          <>
            <img
              src={
                typeSocial === 'google'
                  ? google_icon
                  : typeSocial === 'facebook'
                  ? fb_icon
                  : twitter_icon
              }
              alt="Back Icon"
              className={`me-2 ${typeSocial === 'twitter' ? 'twitter-icon' : ''}`}
            />
            {!isAccountExist?.status && isAccountExist?.type === typeSocial
              ? 'Create account'
              : 'Log in'}{' '}
            with
            <span className="text-capitalize ms-1">
              {typeSocial?.charAt(0).toUpperCase() + typeSocial?.slice(1)}
            </span>
          </>
        )}
      </Button>
      {!isAccountExist?.status && isAccountExist?.type === typeSocial && (
        <Modal
          show={show}
          centered
          onHide={() => {
            setShow(!show);
          }}
          size={'lg'}
          className="aesirxsso aesirxsso-register"
        >
          <CloseButton
            onClick={() => {
              setShow(!show);
            }}
          />
          <ModalBody className="p-4 pt-5 bg-white rounded-3 text-primary">
            <CreateAccount
              setShow={setShow}
              setIsAccountExist={setIsAccountExist}
              isNoWallet={true}
              noLogin={true}
              socialType={{ id: idSocial, type: typeSocial }}
            />
          </ModalBody>
        </Modal>
      )}
    </div>
  );
};

export default SSOSocialProvider;
