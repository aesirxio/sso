import React, { useState } from 'react';
import concordium_logo from '../../SSOButton/images/concordium_bg_black.png';
import { useWeb3Context } from '../../SSOButton/Providers/web3';
import { Image } from '../../components/Image';
import { useUserContext } from '../../SSOButton/Providers/user';
import Connect from './Connect';
import { Button } from 'react-bootstrap';
import ButtonCopy from '../../components/ButtonCopy';
import { shortenString } from '../../utils/index';
interface Props {
  connectWallet: (address: string, walletType: string) => Promise<void>;
  setShow: any;
}

const Concordium = ({ connectWallet, setShow }: Props) => {
  const { account, setActiveConnectorType } = useWeb3Context();

  const { aesirxData } = useUserContext();
  const [connecting, setConnecting] = useState(false);

  const walletAddress = aesirxData?.wallet_concordium ? aesirxData?.wallet_concordium : account;

  const hanleConnect = async (address: string, walletType: string) => {
    setConnecting(true);
    await connectWallet(address, walletType);
    setConnecting(false);
  };

  return (
    <div className="py-4 px-4 border rounded">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Image
          className="me-14px"
          src={concordium_logo}
          width={40}
          height={40}
          alt="logo concordium"
        />
        <p className="fw-semibold fs-18 mb-0 ms-2">Concordium</p>
      </div>
      <p className="fw-medium mb-12px">Address</p>
      <div className="position-relative overflow-hidden fs-7 mb-3 py-2 px-3 bg-gray-100 rounded border border-gray-stoke-1">
        <span className="fw-normal">
          {!walletAddress ? 'Not Connect!' : shortenString(walletAddress, 20, 6)}
        </span>
        <ButtonCopy
          content={aesirxData?.wallet_concordium}
          className=" border-0 top-0 bottom-0 p-0 px-2 bg-gray-100 position-absolute end-0"
        />
      </div>
      {!aesirxData?.wallet_concordium && (
        <>
          {account ? (
            <Button
              disabled={connecting}
              onClick={() => {
                !account ? open() : hanleConnect(account, 'concordium');
              }}
              variant="success"
              className="fw-semibold  w-100"
            >
              {account ? 'Connect this address' : 'Connect to Ethereum wallets'}
            </Button>
          ) : (
            <Connect setActiveConnectorType={setActiveConnectorType} />
          )}
        </>
      )}
      {aesirxData?.wallet_concordium && (
        <Button
          onClick={() =>
            setShow({
              show: true,
              data: {
                wallet: 'concordium',
                address: aesirxData?.wallet_concordium,
              },
            })
          }
          variant="danger"
          className="fw-semibold  w-100"
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default Concordium;
