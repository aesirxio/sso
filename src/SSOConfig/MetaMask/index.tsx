import React, { useState } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { Image } from '../../components/Image';
import ButtonCopy from '../../components/ButtonCopy';
import ethereum_logo from '../../SSOButton/images/ethereum_icon.png';
import { useUserContext } from '../../SSOButton/Providers/user';
import { Button } from 'react-bootstrap';
import { shortenString } from '../../utils/index';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';
import { CONCORDIUM_WALLET_CONNECT_PROJECT_ID } from '@concordium/react-components';
interface Props {
  connectWallet: (address: string, walletType: string) => Promise<void>;
  setShow: any;
}

const chains = [arbitrum, mainnet, polygon];

const projectId = CONCORDIUM_WALLET_CONNECT_PROJECT_ID;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [...w3mConnectors({ projectId, chains })],
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const MetaMask = ({ connectWallet, setShow }: Props) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <MetaMaskApp connectWallet={connectWallet} setShow={setShow} />
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

const MetaMaskApp = ({ connectWallet, setShow }: Props) => {
  const { aesirxData } = useUserContext();
  const { open, isOpen } = useWeb3Modal();
  const { address, isConnecting } = useAccount();
  const [connecting, setConnecting] = useState(false);

  const walletAddress = aesirxData?.wallet_metamask ? aesirxData?.wallet_metamask : address;

  const hanleConnect = async (address: string, walletType: string) => {
    setConnecting(true);
    await connectWallet(address, walletType);
    setConnecting(false);
  };

  return (
    <div className="py-4 px-4 border rounded">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Image className="me-14px" src={ethereum_logo} width={25} height={40} alt="logo ethereum" />
        <p className="fw-semibold fs-18 mb-0 ms-2">Ethereum</p>
      </div>
      <p className="fw-medium mb-12px">Address</p>
      <div className="position-relative overflow-hidden fs-7 mb-3 py-2 px-3 bg-gray-100 rounded border border-gray-stoke-1">
        <span className="fw-normal">
          {!walletAddress ? 'Not Connect!' : shortenString(walletAddress, 20, 6)}
        </span>
        <ButtonCopy
          content={walletAddress || aesirxData?.wallet_metamask}
          className=" border-0 top-0 bottom-0 p-0 px-2 bg-gray-100 position-absolute end-0"
        />
      </div>
      {!aesirxData?.wallet_metamask && (
        <Button
          disabled={isConnecting || isOpen || connecting}
          onClick={() => {
            !address ? open() : hanleConnect(address, 'metamask');
          }}
          variant="success"
          className="fw-semibold py-12px py-12px w-100"
        >
          {address ? 'Connect this address' : 'Connect to Ethereum wallets'}
        </Button>
      )}
      {aesirxData?.wallet_metamask && (
        <Button
          onClick={() =>
            setShow({
              show: true,
              data: {
                wallet: 'metamask',
                address: aesirxData?.wallet_metamask,
              },
            })
          }
          variant="danger"
          className="fw-semibold py-12px py-12px w-100"
        >
          Disconnect
        </Button>
      )}
    </div>
  );
};

export default MetaMask;
