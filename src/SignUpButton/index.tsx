import React, { Suspense, useState } from 'react';
import { CloseButton, Modal, ModalBody } from 'react-bootstrap';
import '../SSOButton/styles/index.scss';
import arrow_left from '../SSOButton/images/arrow_left.svg';
import login_bg from '../SSOButton/images/login_bg.png';
import { SSOModalContext } from '../SSOButton/modal';
import CreateAccount from '../SSOButton/Providers/CreateAccount';
const SSOConcordiumProvider = React.lazy(() => import('../SSOButton/Providers/Concordium'));
const SSOEthereumProvider = React.lazy(() => import('../SSOButton/Providers/Ethereum'));
const SSOEmailProvider = React.lazy(() => import('../SSOButton/Providers/Email'));
const SSOSocialProvider = React.lazy(() => import('../SSOButton/Providers/Social'));
interface SignUpButtonProps {
  className: string;
  text: string;
  loginBg?: string;
  productOptions: Array<any>;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({
  className,
  text = 'Login',
  loginBg,
  productOptions = [],
}) => {
  const [show, setShow] = useState(false);
  const [expand, setExpand] = useState('');
  const [isAccountExist, setIsAccountExist] = useState({ status: true, type: '' });
  const urlParams = new URLSearchParams(window.location.search);
  let login = ['concordium', 'metamask', 'regular'];

  if (urlParams.has('return')) {
    login = new URL(atob(urlParams.get('return'))).searchParams.getAll('login[]');
  }

  const hasMetamask = login.length === 0 || login.includes('metamask');
  const hasConcordium = login.length === 0 || login.includes('concordium');

  const toggle = () => {
    setShow(!show);
    setExpand('');
  };
  return (
    <>
      <button type="button" className={`btn ${className}`} onClick={toggle}>
        {text}
      </button>
      <Modal
        show={show}
        centered
        onHide={() => {
          setShow(!show);
        }}
        size={'xl'}
        className="aesirxsso"
      >
        <CloseButton
          onClick={() => {
            setShow(!show);
          }}
        />
        <ModalBody className="p-0 bg-white rounded-3 text-primary">
          <SSOModalContext.Provider
            value={{
              handleOnData: null,
              toggle: toggle,
              demoUser: null,
              demoPassword: null,
              noCreateAccount: false,
              isSignUpForm: true,
            }}
          >
            <div className="row gx-0 w-100">
              <div className="col-lg-7 d-flex align-items-center">
                <div className="pt-0 pb-4 px-4 block-wallet">
                  <div className="py-4 px-lg-4">
                    {!expand ? (
                      <>
                        <h3 className="fs-3 fw-semibold mt-2 mb-3 text-primary">Sign up</h3>
                        <button
                          type="button"
                          className="btn btn-success w-100 lh-sm text-white fw-semibold mb-18px"
                          onClick={() => {
                            setExpand('wallet');
                          }}
                        >
                          Connect with Web3 Wallets
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline w-100 lh-sm fw-semibold mb-18px"
                          onClick={() => {
                            setExpand('social');
                          }}
                        >
                          Connect with Social Media
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline w-100 lh-sm fw-semibold"
                          onClick={() => {
                            setExpand('email');
                          }}
                        >
                          Sign up with email
                        </button>
                      </>
                    ) : expand === 'social' || expand === 'wallet' || expand === 'email' ? (
                      <div className="text-start">
                        <div
                          className="cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary"
                          onClick={() => {
                            setExpand('');
                            setIsAccountExist({ status: true, type: '' });
                          }}
                        >
                          <img src={arrow_left} alt="Back Icon" className="me-1" />
                          Back
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                    {expand?.includes('wallet') && (
                      <>
                        {(expand === 'wallet' || expand === 'wallet-metamask') && hasMetamask && (
                          <div className="mb-3">
                            <Suspense fallback={<>Loading...</>}>
                              <SSOEthereumProvider
                                setIsAccountExist={setIsAccountExist}
                                setExpand={setExpand}
                              />
                            </Suspense>
                          </div>
                        )}

                        {(expand === 'wallet' || expand === 'wallet-concordium') &&
                          hasConcordium && (
                            <div>
                              <Suspense fallback={<>Loading...</>}>
                                <SSOConcordiumProvider
                                  setIsAccountExist={setIsAccountExist}
                                  setExpand={setExpand}
                                />
                              </Suspense>
                            </div>
                          )}
                      </>
                    )}
                    {expand === 'email' && (
                      <CreateAccount
                        noLogin={true}
                        isNoWallet={true}
                        setShow={toggle}
                        productOptions={productOptions}
                      />
                    )}
                    {expand?.includes('social') && (
                      <div>
                        {(expand === 'social' || expand === 'social-google') && (
                          <div className="mb-1">
                            <Suspense fallback={<>Loading...</>}>
                              <SSOSocialProvider
                                typeSocial="google"
                                isAccountExist={{ status: false, type: 'google' }}
                                setIsAccountExist={setIsAccountExist}
                                setExpand={setExpand}
                              />
                            </Suspense>
                          </div>
                        )}
                        {(expand === 'social' || expand === 'social-twitter') && (
                          <div className="mb-1">
                            <Suspense fallback={<>Loading...</>}>
                              <SSOSocialProvider
                                typeSocial="twitter"
                                isAccountExist={{ status: false, type: 'twitter' }}
                                setIsAccountExist={setIsAccountExist}
                                setExpand={setExpand}
                              />
                            </Suspense>
                          </div>
                        )}
                        {(expand === 'social' || expand === 'social-facebook') && (
                          <div>
                            <Suspense fallback={<>Loading...</>}>
                              <SSOSocialProvider
                                typeSocial="facebook"
                                isAccountExist={{ status: false, type: 'facebook' }}
                                setIsAccountExist={setIsAccountExist}
                                setExpand={setExpand}
                              />
                            </Suspense>
                          </div>
                        )}
                        {(expand === 'social' || expand === 'social-reddit') && (
                          <div>
                            <Suspense fallback={<>Loading...</>}>
                              <SSOSocialProvider
                                typeSocial="reddit"
                                isAccountExist={{ status: false, type: 'reddit' }}
                                setIsAccountExist={setIsAccountExist}
                                setExpand={setExpand}
                              />
                            </Suspense>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="d-none d-lg-block col-lg-5">
                <img
                  className="w-100 h-100"
                  src={loginBg ? loginBg : login_bg}
                  alt="Login Background"
                />
              </div>
            </div>
          </SSOModalContext.Provider>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SignUpButton;
