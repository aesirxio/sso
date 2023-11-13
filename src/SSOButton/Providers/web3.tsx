/* eslint-disable  */
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { BROWSER_WALLET } from '../Providers/Concordium/config';

import { notify } from '../../components/Toast';
import { useUserContext } from './user';
import secureLocalStorage from 'react-secure-storage';
import {
  WithWalletConnector,
  ConnectorType,
  Network,
  WalletConnector,
  useConnect,
  useConnection,
  MAINNET,
  TESTNET,
  BrowserWalletConnector,
  useGrpcClient,
} from '@concordium/react-components';
import { getClientApp } from '../../utils';

import { BlockHash, ConcordiumGRPCClient } from '@concordium/web-sdk';
interface Web3ContextType {
  account: string;
  setActiveConnectorType?: any;
  connection?: any;
  isConnecting?: any;
  gRPCClient: ConcordiumGRPCClient;
}

interface Props {
  autoLoad: boolean;
  children?: ReactNode;
}

interface AppProps {
  network: Network;
  setActiveConnectorType: (type: ConnectorType | undefined) => void;
  activeConnectorType: ConnectorType | undefined;
  activeConnector: WalletConnector | undefined;
  activeConnectorError: string;
  connectedAccounts: any;
  genesisHashes: any;
  autoLoad?: boolean;
  children?: ReactNode;
}
declare global {
  interface Window {
    concordium: any;
  }
}
const { network } = getClientApp();
const Web3Context = createContext<Web3ContextType>({
  account: '',
  gRPCClient: {} as ConcordiumGRPCClient,
});
const checkNetwork = (hash: string) => {
  switch (network) {
    case 'testnet':
      return BlockHash.toHexString(hash) === TESTNET.genesisHash;

    default:
      return BlockHash.toHexString(hash) === MAINNET.genesisHash;
  }
};

const Web3ContextProvider: React.FC<Props> = ({ children, autoLoad }) => {
  return (
    <WithWalletConnector network={network === 'mainnet' ? MAINNET : TESTNET}>
      {(props) => (
        <Web3ContextApp {...props} autoLoad={autoLoad}>
          {children}
        </Web3ContextApp>
      )}
    </WithWalletConnector>
  );
};

const Web3ContextApp: React.FC<AppProps> = ({ children, ...props }) => {
  const {
    activeConnectorError,
    network,
    connectedAccounts,
    genesisHashes,
    activeConnector,
    setActiveConnectorType,
    activeConnectorType,
    autoLoad = true,
  } = props;

  const { setConnection, account, connection, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );

  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);
  const [, setRpcGenesisHash] = useState<string>();

  const { preregistration } = useUserContext();

  const rpc = useGrpcClient(network);

  useEffect(() => {
    if (activeConnector) {
      connect();
    }
  }, [activeConnector, connect]);

  useEffect(() => {
    if (connectError) {
      notify(`${connectError}`, 'error');
    }
  }, [connectError]);

  useEffect(() => {
    if (activeConnectorError) {
      notify(`${activeConnectorError}`, 'error');
    }
  }, [activeConnectorError]);

  useEffect(() => {
    const connection = secureLocalStorage.getItem('concordium');
    if (connection === 'browser' && autoLoad) {
      setActiveConnectorType(BROWSER_WALLET);
    } else if (connection === 'walletconnect') {
      // setActiveConnectorType(WALLET_CONNECT);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (rpc) {
      setRpcGenesisHash(undefined);
      rpc
        .getConsensusStatus()
        .then((status) => status.genesisBlock)
        .then(async (hash: any) => {
          if (!checkNetwork(hash)) {
            throw new Error(`Please change the network to ${network} in Wallet`);
          }

          setRpcGenesisHash(hash);
          secureLocalStorage.setItem(
            'concordium',
            activeConnector instanceof BrowserWalletConnector ? 'browser' : 'walletconnect'
          );
        })
        .catch((err: any) => {
          if (err) {
            notify(`${err.message}`, 'error');
          }

          connection.disconnect();
          setRpcGenesisHash(undefined);
          setActiveConnectorType(undefined);
        });
    }
  }, [account, rpc, preregistration?.id, setActiveConnectorType]);

  return (
    <Web3Context.Provider
      value={{
        account: account ?? '',
        setActiveConnectorType: setActiveConnectorType,
        connection: connection,
        isConnecting: isConnecting,
        gRPCClient: rpc,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

const useWeb3Context = () => useContext(Web3Context);

export { Web3ContextProvider as default, useWeb3Context };
