import React, { Suspense, useState } from 'react';
import { CloseButton, Row, Col, Modal, ModalBody } from 'react-bootstrap';
import CreateAccount from '../SSOButton/Providers/CreateAccount';
import '../SSOButton/styles/index.scss';
import SSOEthereumProvider from '../SSOButton/Providers/Ethereum';
import SSOConcordiumProvider from '../SSOButton/Providers/Concordium';
interface SignUpButtonProps {
  className: string;
  text: string;
}

const SignUpButton: React.FC<SignUpButtonProps> = ({ className, text = 'Login' }) => {
  const [show, setShow] = useState(false);
  const [accountAddress, setAccountAddress] = useState('');
  const [connection, setConnection] = useState();
  const [walletType, setWalletType] = useState('');
  const [isExist, setIsExist] = useState(true);

  const toggle = () => {
    setAccountAddress('');
    setConnection(null);
    setWalletType('');
    setShow(!show);
  };
  console.log('walletType', walletType);
  console.log('accountAddress', accountAddress);
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
        size={'lg'}
        className="aesirxsso aesirxsso-register"
      >
        <CloseButton
          onClick={() => {
            setShow(!show);
          }}
        />
        <ModalBody className="p-4 pt-5 bg-white rounded-3">
          <div>
            <Row className="my-3">
              <Col lg={`${accountAddress ? '12' : '6'}`}>
                {walletType !== 'concordium' && (
                  <div className="mb-3">
                    <Suspense fallback={<>Loading...</>}>
                      <SSOEthereumProvider
                        noLogin={true}
                        accountAddress={accountAddress}
                        setAccountAddress={setAccountAddress}
                        setConnection={setConnection}
                        setWalletType={setWalletType}
                      />
                    </Suspense>
                  </div>
                )}
              </Col>
              <Col lg={12}>
                {walletType !== 'metamask' && (
                  <Suspense fallback={<>Loading...</>}>
                    <SSOConcordiumProvider
                      noLogin={true}
                      setAccountAddress={setAccountAddress}
                      setConnection={setConnection}
                      setWalletType={setWalletType}
                    />
                  </Suspense>
                )}
              </Col>
            </Row>
            <CreateAccount
              setShow={setShow}
              setIsExist={setIsExist}
              accountAddress={accountAddress}
              connection={connection}
              wallet={walletType}
              noLogin={true}
            />
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default SignUpButton;
