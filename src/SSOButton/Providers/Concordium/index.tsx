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

const SSOConcordiumProvider = () => {
  return (
    <WithWalletConnector network={process.env.NODE_ENV === 'development' ? TESTNET : MAINNET}>
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
          console.log('NODE_ENV', process.env.NODE_ENV);

          if (process.env.NODE_ENV === 'development' && hash !== TESTNET.genesisHash) {
            throw new Error(`Please change the network to Testnet in Wallet`);
          }

          if (process.env.NODE_ENV === 'production' && hash !== MAINNET.genesisHash) {
            throw new Error(`Please change the network to Mainnet in Wallet`);
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
    if (connectError) {
      toast(connectError);
    }
  }, [connectError]);

  const handleOnConnect = async (connectorType: ConnectorType, name: string) => {
    secureLocalStorage.setItem('concordium', name);
    await setActiveConnectorType(connectorType);
  };
  return (
    <>
      {activeConnectorError && <div>Connector error: {activeConnectorError}.</div>}

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
            <div className="p-2 bg-white border fw-semibold text-center rounded-2">
              <div className="pb-2">Connect to Concordium</div>
              <div className="d-flex">
                <button className="btn btn-secondary bg-secondary fw-semibold text-white w-50 py-3">
                  <span
                    className="spinner-border spinner-border-sm me-1"
                    role="status"
                    aria-hidden="true"
                  ></span>
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {rpcError && <div className="mt-1">RPC error: {rpcError}</div>}
    </>
  );
};

export default SSOConcordiumProvider;
