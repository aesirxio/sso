import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {
  TESTNET,
  MAINNET,
  WithWalletConnector,
  useConnection,
  useConnect,
  WalletConnectionProps,
  withJsonRpcClient,
  ConnectorType,
} from '@concordium/react-components';
import ConnectConcordium from './connect';
import SignMessageConcordium from './sign';
import secureLocalStorage from 'react-secure-storage';
import { getClientApp } from '../../../utils';

const SSOConcordiumProvider = () => {

  const { network } = getClientApp();

  return (
    <WithWalletConnector network={network === 'testnet' ? TESTNET : MAINNET}>
      {(props) => <ConcordiumApp {...props} />}
    </WithWalletConnector>
  );
};

const ConcordiumApp = (props: WalletConnectionProps) => {
  const {
    activeConnectorType,
    activeConnector,
    activeConnectorError,
    network,
    connectedAccounts,
    genesisHashes,
    setActiveConnectorType,
  } = props;

  const { connection, setConnection, account, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );

  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);

  const [rpcGenesisHash, setRpcGenesisHash] = useState();
  const [rpcError, setRpcError] = useState('');

  useEffect(() => {
    if (connection) {
      setRpcGenesisHash(undefined);
      withJsonRpcClient(connection, async (rpc) => {
        const status = await rpc.getConsensusStatus();
        return status.genesisBlock;
      })
        .then((hash: any) => {
          const { network } = getClientApp();

          let r = false;

          switch (network) {
            case 'testnet':
              r = hash === TESTNET.genesisHash;
              break;

            default:
              r = hash === MAINNET.genesisHash;
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
  }, [connection, genesisHash, network]);

  useEffect(() => {
    if (activeConnector) {
      connect();
    }
  }, [activeConnector]);

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
        />
      ) : (
        <>
          {rpcGenesisHash ? (
            <SignMessageConcordium account={account} connection={connection} />
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
