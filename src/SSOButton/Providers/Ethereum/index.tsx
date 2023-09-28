import React, { useEffect } from 'react';

import { configureChains, createConfig, WagmiConfig, useAccount } from 'wagmi';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import {
  arbitrum,
  arbitrumGoerli,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  baseGoerli,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  crossbell,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  foundry,
  gnosis,
  gnosisChiado,
  goerli,
  hardhat,
  harmonyOne,
  iotex,
  iotexTestnet,
  localhost,
  mainnet,
  metis,
  metisGoerli,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  okc,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvmTestnet,
  sepolia,
  taraxa,
  taraxaTestnet,
  telos,
  telosTestnet,
  zkSync,
  zkSyncTestnet,
} from 'wagmi/chains';

const chains = [
  arbitrum,
  arbitrumGoerli,
  aurora,
  auroraTestnet,
  avalanche,
  avalancheFuji,
  baseGoerli,
  bronos,
  bronosTestnet,
  bsc,
  bscTestnet,
  canto,
  celo,
  celoAlfajores,
  crossbell,
  evmos,
  evmosTestnet,
  fantom,
  fantomTestnet,
  filecoin,
  filecoinCalibration,
  filecoinHyperspace,
  foundry,
  gnosis,
  gnosisChiado,
  goerli,
  hardhat,
  harmonyOne,
  iotex,
  iotexTestnet,
  localhost,
  mainnet,
  metis,
  metisGoerli,
  moonbaseAlpha,
  moonbeam,
  moonriver,
  okc,
  optimism,
  optimismGoerli,
  polygon,
  polygonMumbai,
  polygonZkEvmTestnet,
  sepolia,
  taraxa,
  taraxaTestnet,
  telos,
  telosTestnet,
  zkSync,
  zkSyncTestnet,
];

import { Web3Modal } from '@web3modal/react';
import SignMessage from './sign';
import ConnectMetamask from './connect';
import { CONCORDIUM_WALLET_CONNECT_PROJECT_ID } from '@concordium/react-components';
import ComponentTags from '../../../components/ComponentTags';
import { shortenString } from '../../../utils';
import logo from '../../images/ethereum_logo.png';

const projectId = CONCORDIUM_WALLET_CONNECT_PROJECT_ID;

const { publicClient, webSocketPublicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const SSOEthereumProvider = ({
  setIsAccountExist,
  setExpand,
  noLogin,
  accountAddress,
  setAccountAddress,
  setConnection,
  setWalletType,
}: any) => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <SSOEthereumApp
          setIsAccountExist={setIsAccountExist}
          setExpand={setExpand}
          noLogin={noLogin}
          accountAddress={accountAddress}
          setAccountAddress={setAccountAddress}
          setConnection={setConnection}
          setWalletType={setWalletType}
        />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};

const SSOEthereumApp = ({
  setIsAccountExist,
  setExpand,
  noLogin,
  accountAddress,
  setAccountAddress,
  setConnection,
  setWalletType,
}: any) => {
  const { address, isConnected, connector } = useAccount();

  useEffect(() => {
    if (setAccountAddress) {
      if (address && connector) {
        setAccountAddress(address);
        setConnection(connector);
        setWalletType('metamask');
      } else {
        setAccountAddress('');
        setConnection(null);
        setWalletType('');
      }
    }
  }, [address, connector]);

  return isConnected ? (
    noLogin ? (
      <>
        {accountAddress ? (
          <ComponentTags
            className={'mb-12px'}
            title="Account Connected:"
            value={shortenString(address, 20, 5)}
            contentCopy={address}
          />
        ) : (
          <button
            onClick={() => {
              setAccountAddress(address);
              setConnection(connector);
              setWalletType('metamask');
            }}
            className="btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center justify-content-start"
          >
            <img className="me-3" src={logo} alt="Ethereum Logo" />
            Ethereum wallets
          </button>
        )}
      </>
    ) : (
      <SignMessage setIsAccountExist={setIsAccountExist} setExpand={setExpand} />
    )
  ) : (
    <ConnectMetamask />
  );
};

export default SSOEthereumProvider;
