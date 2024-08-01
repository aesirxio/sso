import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {
  TESTNET,
  MAINNET,
  WithWalletConnector,
  useConnection,
  useConnect,
  WalletConnectionProps,
  ConnectorType,
  useGrpcClient,
} from '@concordium/react-components';
import ConnectConcordium from './connect';
import SignMessageConcordium from './sign';
import secureLocalStorage from 'react-secure-storage';
import { getClientApp, shortenString } from '../../../utils';
import ComponentTags from '../../../components/ComponentTags';
import { BlockHash } from '@concordium/web-sdk';
interface WalletConnectionPropsExtends extends WalletConnectionProps {
  setIsAccountExist: any;
  setExpand: any;
  setAccountInfo: any;
  noLogin: any;
  setAccountAddress: any;
  setConnectionProvider: any;
  setWalletType: any;
  noSignUpForm?: any;
  setWalletState?: any;
  disabled?: boolean;
}
const SSOConcordiumProvider = ({
  setIsAccountExist,
  setExpand,
  setAccountInfo,
  noLogin,
  setAccountAddress,
  setConnection,
  setWalletType,
  noSignUpForm = false,
  setWalletState,
  disabled,
}: any) => {
  const { network } = getClientApp();

  return (
    <WithWalletConnector network={network === 'testnet' ? TESTNET : MAINNET}>
      {(props) => (
        <ConcordiumApp
          {...props}
          setIsAccountExist={setIsAccountExist}
          setExpand={setExpand}
          setAccountInfo={setAccountInfo}
          noLogin={noLogin}
          setAccountAddress={setAccountAddress}
          setConnectionProvider={setConnection}
          setWalletType={setWalletType}
          noSignUpForm={noSignUpForm}
          setWalletState={setWalletState}
          disabled={disabled}
        />
      )}
    </WithWalletConnector>
  );
};

const ConcordiumApp = (props: WalletConnectionPropsExtends) => {
  const {
    activeConnectorType,
    activeConnector,
    activeConnectorError,
    network,
    connectedAccounts,
    genesisHashes,
    setActiveConnectorType,
    setIsAccountExist,
    setExpand,
    setAccountInfo,
    noLogin,
    setAccountAddress,
    setConnectionProvider,
    setWalletType,
    noSignUpForm,
    setWalletState,
    disabled,
  } = props;

  const { connection, setConnection, account, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );

  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);

  const [rpcGenesisHash, setRpcGenesisHash] = useState();
  const [rpcError, setRpcError] = useState('');
  const rpc = useGrpcClient(network);

  useEffect(() => {
    if (rpc) {
      setRpcGenesisHash(undefined);
      rpc
        .getConsensusStatus()
        .then((status) => {
          return status.genesisBlock;
        })
        .then((hash: any) => {
          const { network } = getClientApp();

          let r = false;
          switch (network) {
            case 'testnet':
              r = BlockHash.toHexString(hash) === TESTNET.genesisHash;
              break;

            default:
              r = BlockHash.toHexString(hash) === MAINNET.genesisHash;
          }
          if (!r) {
            const { network } = getClientApp();
            throw new Error(`Please change the network to ${network} in Wallet`);
          }

          setRpcGenesisHash(hash);
          setRpcError('');
        })
        .catch((err) => {
          setRpcGenesisHash(undefined);
          toast(err.message);
          setRpcError(err.message);
        });
    }
  }, [rpc]);

  useEffect(() => {
    if (activeConnector) {
      connect();
    }
  }, [activeConnector]);

  useEffect(() => {
    if (setAccountAddress) {
      if (account && connection) {
        setAccountAddress(account);
        setConnectionProvider(connection);
        setWalletType('concordium');
      } else {
        setAccountAddress('');
        setConnectionProvider(null);
        setWalletType('');
      }
    }
    if (setWalletState) {
      if (account && connection) {
        setWalletState({ wallet: 'concordium', accountAddress: account, connection: connection });
      }
    }
  }, [account, connection]);

  useEffect(() => {
    if (
      connectError &&
      connectError !==
        'A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received'
    ) {
      toast(connectError);
    }
  }, [connectError]);

  const handleOnConnect = async (connectorType: ConnectorType, name: string) => {
    secureLocalStorage.setItem('concordium', name);
    await setActiveConnectorType(connectorType);
  };
  return (
    <>
      {!account || rpcError ? (
        <ConnectConcordium
          isConnecting={isConnecting}
          handleOnConnect={handleOnConnect}
          activeConnectorError={activeConnectorError}
          activeConnectorType={activeConnectorType}
          activeConnector={activeConnector}
          noLogin={noLogin}
          disabled={disabled}
        />
      ) : (
        <>
          {rpcGenesisHash ? (
            noLogin ? (
              <ComponentTags
                className={'mb-12px'}
                title="Account Connected:"
                value={shortenString(account, 20, 5)}
                contentCopy={account}
              />
            ) : (
              <SignMessageConcordium
                account={account}
                connection={connection}
                setIsAccountExist={setIsAccountExist}
                setExpand={setExpand}
                setAccountInfo={setAccountInfo}
                noSignUpForm={noSignUpForm}
                setWalletState={setWalletState}
              />
            )
          ) : (
            <button className="btn btn-dark">
              <span
                className="spinner-border spinner-border-sm me-1"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          )}
        </>
      )}
      {activeConnectorError && (
        <div className="mt-1 fs-7 text-danger text-start">
          Connector error: {activeConnectorError}.
        </div>
      )}
      {rpcError && <div className="mt-1 fs-7 text-danger text-start">RPC error: {rpcError}</div>}
    </>
  );
};

export default SSOConcordiumProvider;
