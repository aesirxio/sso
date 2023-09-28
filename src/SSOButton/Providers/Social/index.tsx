import React, { useContext, useEffect, useState } from 'react';
import { getClientApp } from '../../../utils';
import axios from 'axios';
import { SSOModalContext } from '../../modal';
import fb_icon from '../../images/fb_icon.png';
import google_icon from '../../images/google_icon.png';
import twitter_icon from '../../images/twitter_icon.png';
import { Button } from 'react-bootstrap';
import CreateAccount from '../CreateAccount';
import arrow_left from '../../images/arrow_left.svg';
import { toast } from 'react-toastify';

const SSOSocialProvider = ({ typeSocial, isAccountExist, setIsAccountExist, setExpand }: any) => {
  const [loading, setLoading] = useState(false);
  const [idSocial, setIdSocial] = useState('');
  const { noCreateAccount, isSignUpForm, handleOnData, toggle } = useContext(SSOModalContext);
  const { endpoint } = getClientApp();
  const [showCreate, setShowCreate] = useState('');
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);
  const [isExist, setIsExist] = useState(true);

  const handleSubmit = async (event: any, isCreate = false) => {
    event.preventDefault();
    setShowCreatedMessage(false);
    setLoading(true);
    try {
      const response: any = await axios.get(
        `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getSocialLoginUrl&api=hal&socialType=${typeSocial}`
      );
      response?.data.result[0] &&
        window.open(response?.data.result[0], 'SSO', 'status=1,height=750,width=650');
      window.addEventListener(
        'message',
        (e) => {
          if (e.origin !== endpoint) return;
          if (e.data && e.data.socialLogin) {
            if (isCreate) {
              setShowCreatedMessage(true);
            } else {
              const dataLogin = JSON.parse(e.data.socialLogin);
              handleOnData(dataLogin);
            }
          } else if (e.data.error) {
            !noCreateAccount && setIsExist(false);
            setIsAccountExist({ status: false, type: typeSocial });
            setIdSocial(e.data.id);
            if (isCreate) {
              setExpand(`social-${typeSocial}`);
              setShowCreate(typeSocial);
            }
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
  useEffect(() => {
    showCreatedMessage && toast.error("You've already created an account with this social media");
  }, [showCreatedMessage]);
  const handleSuccess = async () => {
    setShowCreate('');
    setExpand('social');
    setIdSocial('');
    setIsAccountExist({ status: true, type: '' });
  };
  return (
    <>
      {showCreate === typeSocial ? (
        <>
          <div className="text-start">
            <div
              className="cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary"
              onClick={() => {
                setShowCreate('');
                setExpand('social');
                setIdSocial('');
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
              setIsAccountExist={setIsAccountExist}
              isNoWallet={true}
              noLogin={true}
              socialType={{ id: idSocial, type: typeSocial }}
            />
          </div>
        </>
      ) : (
        <div className="mt-3">
          <Button
            variant="outline"
            type="button"
            onClick={(e) => {
              if (
                !isAccountExist?.status &&
                isAccountExist?.type === typeSocial &&
                (!isExist || isSignUpForm)
              ) {
                if (idSocial) {
                  setExpand(`social-${typeSocial}`);
                  setShowCreate(typeSocial);
                } else {
                  handleSubmit(e, true);
                }
              } else {
                handleSubmit(e);
              }
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
                {!isAccountExist?.status &&
                isAccountExist?.type === typeSocial &&
                (!isExist || isSignUpForm)
                  ? 'Create account'
                  : 'Log in'}{' '}
                with
                <span className="text-capitalize ms-1">
                  {typeSocial?.charAt(0).toUpperCase() + typeSocial?.slice(1)}
                </span>
              </>
            )}
          </Button>
        </div>
      )}
    </>
  );
};

export default SSOSocialProvider;
