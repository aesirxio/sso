import {
  BROWSER_WALLET,
  WALLET_CONNECT,
  concordium_default
} from "./chunk-FLCDBSBG.js";
import {
  ComponentTags_default,
  useWallet_default
} from "./chunk-7ZCUSN4S.js";
import {
  CreateAccount_default
} from "./chunk-CLTATKNT.js";
import {
  SSOModalContext
} from "./chunk-C2QB5TE4.js";
import {
  arrow_left_default
} from "./chunk-LS5LYGC5.js";
import "./chunk-XAJPVRVJ.js";
import {
  checkWalletAccount,
  getChallenge,
  getClientApp,
  getMember,
  getStatement,
  shortenString
} from "./chunk-5VDMOXEK.js";
import "./chunk-L4YLJHLJ.js";

// src/SSOButton/Providers/Concordium/index.tsx
import React3, { useEffect, useState as useState2 } from "react";
import { toast as toast2 } from "react-toastify";
import {
  TESTNET,
  MAINNET,
  WithWalletConnector,
  useConnection,
  useConnect,
  useGrpcClient
} from "@concordium/react-components";

// src/SSOButton/Providers/Concordium/connect.tsx
import React from "react";
import { isMobile, isDesktop } from "react-device-detect";
import { Col, Row } from "react-bootstrap";
var ConnectConcordium = ({
  isConnecting,
  handleOnConnect,
  activeConnectorError,
  activeConnectorType,
  activeConnector,
  noLogin,
  disabled
}) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "" }, /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, { lg: `${noLogin ? "6" : "12"}` }, isDesktop ? /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: isConnecting || disabled,
      type: "button",
      className: `btn btn-dark btn-concordium fw-medium text-nowrap py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center justify-content-start w-100 ${noLogin ? "mb-3 mb-lg-0" : "mb-3"}`,
      onClick: () => handleOnConnect(BROWSER_WALLET, "browser")
    },
    isConnecting ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "spinner-border spinner-border-sm me-1",
        role: "status",
        "aria-hidden": "true"
      }
    ), "Connecting") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: concordium_default,
        className: "me-3 align-text-bottom",
        alt: "Concordium",
        width: 24
      }
    ), "Browser Wallet")
  ) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `btn btn-dark btn-concordium flex-grow-1 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center justify-content-start w-100`,
      onClick: () => handleOnConnect(WALLET_CONNECT, "walletconnect"),
      disabled: isConnecting || disabled
    },
    !activeConnectorError && activeConnectorType && !activeConnector ? /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "spinner-border spinner-border-sm me-1",
        role: "status",
        "aria-hidden": "true"
      }
    ) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "d-flex text-start align-items-center" }, /* @__PURE__ */ React.createElement("p", { className: "mb-0 fs-18 text-nowrap pe-3 me-3 border-end text-nowrap" }, "QR Code"), /* @__PURE__ */ React.createElement("p", { className: "mb-0 fs-12" }, "Concordium or CryptoX Mobile Wallets")))
  ))))), isMobile && /* @__PURE__ */ React.createElement("div", { className: "bg-success-light p-3 mt-3 fs-14 text-start" }, /* @__PURE__ */ React.createElement("p", { className: "mb-1 fw-bold" }, "Note for Concordium/CryptoX Mobile Wallet:"), /* @__PURE__ */ React.createElement("p", { className: "mb-0" }, "Please connect & sign your signature on the app then switch back to the browser to continue")));
};
var connect_default = ConnectConcordium;

// src/SSOButton/Providers/Concordium/sign.tsx
import React2, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { stringMessage } from "@concordium/react-components";
import { isMobile as isMobile2 } from "react-device-detect";
var SignMessageConcordium = ({
  account,
  connection,
  setIsAccountExist,
  setExpand,
  setAccountInfo,
  noSignUpForm
}) => {
  const [status, setStatus] = useState("");
  const [isExist, setIsExist] = useState(true);
  const [proof, setProof] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const wallet = "concordium";
  const { noCreateAccount, isSignUpForm, handleOnData, toggle, isRequireEmail } = useContext(SSOModalContext);
  const { getWalletNonce, verifySignature } = useWallet_default(wallet, account);
  const handleConnect = async () => {
    setStatus("connect");
    const nonce = await getWalletNonce();
    if (nonce) {
      try {
        setStatus("sign");
        const signature = await connection.signMessage(account, stringMessage(`${nonce}`));
        const convertedSignature = typeof signature === "object" && signature !== null ? signature : JSON.parse(signature);
        if (signature) {
          const data = await verifySignature(wallet, account, convertedSignature);
          if (isRequireEmail) {
            const member = await getMember(data?.access_token);
            if (!member?.email || /@aesirx\.io$/.test(member?.email) && (member?.wallet_concordium && member?.email?.includes(member?.wallet_concordium) || member?.wallet_metamask && member?.email?.includes(member?.wallet_metamask))) {
              setExpand("require-email");
              setAccountInfo({ data, memberId: member?.member_id });
            } else {
              handleOnData({ ...data, loginType: "concordium" });
            }
          } else {
            handleOnData({ ...data, loginType: "concordium" });
          }
        }
      } catch (error) {
        toast(error.message);
      }
    } else {
      !noCreateAccount && setIsExist(false);
      setIsAccountExist({ status: false, type: "concordium" });
    }
    setStatus("");
  };
  const handleCreate = async () => {
    setStatus("loading");
    try {
      const checkAccount = await checkWalletAccount(account, wallet);
      if (!checkAccount?.data?.result) {
        if (!proof) {
          const responseProof = await handleProof();
          if (responseProof) {
            setShow(true);
            setExpand("wallet-concordium");
          }
        } else {
          setShow(true);
          setExpand("wallet-concordium");
        }
      } else {
        toast.error("You've already created an account with this wallet.");
      }
      setStatus("");
    } catch (error) {
      console.log(error);
      setStatus("");
      toast.error(error?.response?.data?.error || error?.message);
    }
  };
  const handleProof = async () => {
    setLoading(true);
    try {
      const challenge = await getChallenge(account ?? "");
      const statement = await getStatement();
      const formattedStatement = [
        {
          statement,
          idQualifier: {
            type: "cred",
            issuers: [0, 1, 2, 3, 4]
          }
        }
      ];
      const presentation = await connection.requestVerifiablePresentation(
        challenge,
        formattedStatement
      );
      if (presentation) {
        setProof(true);
        setLoading(false);
      }
      return true;
    } catch (error) {
      setProof(false);
      setLoading(false);
      return false;
    }
  };
  const handleSuccess = async () => {
    setShow(false);
    setExpand("wallet");
    setIsAccountExist({ status: true, type: "" });
  };
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, show && !noSignUpForm ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("div", { className: "text-start" }, /* @__PURE__ */ React2.createElement(
    "div",
    {
      className: "cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary",
      onClick: () => {
        setShow(false);
        setExpand("wallet");
        setIsAccountExist({ status: true, type: "" });
      }
    },
    /* @__PURE__ */ React2.createElement("img", { src: arrow_left_default, alt: "Back Icon", className: "me-1" }),
    "Back"
  )), /* @__PURE__ */ React2.createElement("div", { className: "text-primary" }, /* @__PURE__ */ React2.createElement(
    CreateAccount_default,
    {
      setShow: isSignUpForm ? toggle : handleSuccess,
      setIsExist,
      setIsAccountExist,
      accountAddress: account,
      connection,
      wallet: "concordium",
      isRequireEmail
    }
  ))) : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
    "button",
    {
      disabled: status !== "" || loading,
      type: "button",
      className: "btn btn-dark btn-concordium w-100 fw-medium py-2 px-4 fs-18 lh-sm text-white d-flex align-items-center text-start",
      onClick: () => {
        !isExist || isSignUpForm ? handleCreate() : handleConnect();
      }
    },
    status ? /* @__PURE__ */ React2.createElement("div", { className: "d-flex align-items-center" }, /* @__PURE__ */ React2.createElement(
      "span",
      {
        className: "spinner-border spinner-border-sm me-1",
        role: "status",
        "aria-hidden": "true"
      }
    ), /* @__PURE__ */ React2.createElement("span", { className: "ms-1" }, status === "sign" ? `Please sign message on the wallet ${isMobile2 ? "and wait for verification." : ""}` : status === "loading" ? "Connecting..." : `Please wait to connect...`)) : !isExist || isSignUpForm ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
      "img",
      {
        src: concordium_default,
        className: "me-3 align-text-bottom",
        alt: "Concordium logo",
        width: 24
      }
    ), loading ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
      "span",
      {
        className: "spinner-border spinner-border-sm me-1",
        role: "status",
        "aria-hidden": "true"
      }
    ), /* @__PURE__ */ React2.createElement("span", { className: "ms-1" }, !proof ? "Authorizing" : "Loading...")) : /* @__PURE__ */ React2.createElement(React2.Fragment, null, "Create account via Concordium (", account && shortenString(account), ")")) : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
      "img",
      {
        src: concordium_default,
        className: "me-3 align-text-bottom",
        alt: "Concordium logo",
        width: 24
      }
    ), "Sign in via Concordium (", account && shortenString(account), ")")
  )));
};
var sign_default = SignMessageConcordium;

// src/SSOButton/Providers/Concordium/index.tsx
import secureLocalStorage from "react-secure-storage";
import { BlockHash } from "@concordium/web-sdk";
var SSOConcordiumProvider = ({
  setIsAccountExist,
  setExpand,
  setAccountInfo,
  noLogin,
  setAccountAddress,
  setConnection,
  setWalletType,
  noSignUpForm = false,
  setWalletState,
  disabled
}) => {
  const { network } = getClientApp();
  return /* @__PURE__ */ React3.createElement(WithWalletConnector, { network: network === "testnet" ? TESTNET : MAINNET }, (props) => /* @__PURE__ */ React3.createElement(
    ConcordiumApp,
    {
      ...props,
      setIsAccountExist,
      setExpand,
      setAccountInfo,
      noLogin,
      setAccountAddress,
      setConnectionProvider: setConnection,
      setWalletType,
      noSignUpForm,
      setWalletState,
      disabled
    }
  ));
};
var ConcordiumApp = (props) => {
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
    disabled
  } = props;
  const { connection, setConnection, account, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );
  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);
  const [rpcGenesisHash, setRpcGenesisHash] = useState2();
  const [rpcError, setRpcError] = useState2("");
  const rpc = useGrpcClient(network);
  useEffect(() => {
    if (rpc) {
      setRpcGenesisHash(void 0);
      rpc.getConsensusStatus().then((status) => {
        return status.genesisBlock;
      }).then((hash) => {
        const { network: network2 } = getClientApp();
        let r = false;
        switch (network2) {
          case "testnet":
            r = BlockHash.toHexString(hash) === TESTNET.genesisHash;
            break;
          default:
            r = BlockHash.toHexString(hash) === MAINNET.genesisHash;
        }
        if (!r) {
          const { network: network3 } = getClientApp();
          throw new Error(`Please change the network to ${network3} in Wallet`);
        }
        setRpcGenesisHash(hash);
        setRpcError("");
      }).catch((err) => {
        setRpcGenesisHash(void 0);
        toast2(err.message);
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
        setWalletType("concordium");
      } else {
        setAccountAddress("");
        setConnectionProvider(null);
        setWalletType("");
      }
    }
    if (setWalletState) {
      if (account && connection) {
        setWalletState({ wallet: "concordium", accountAddress: account, connection });
      }
    }
  }, [account, connection]);
  useEffect(() => {
    if (connectError && connectError !== "A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received") {
      toast2(connectError);
    }
  }, [connectError]);
  const handleOnConnect = async (connectorType, name) => {
    secureLocalStorage.setItem("concordium", name);
    await setActiveConnectorType(connectorType);
  };
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, !account || rpcError ? /* @__PURE__ */ React3.createElement(
    connect_default,
    {
      isConnecting,
      handleOnConnect,
      activeConnectorError,
      activeConnectorType,
      activeConnector,
      noLogin,
      disabled
    }
  ) : /* @__PURE__ */ React3.createElement(React3.Fragment, null, rpcGenesisHash ? noLogin ? /* @__PURE__ */ React3.createElement(
    ComponentTags_default,
    {
      className: "mb-12px",
      title: "Account Connected:",
      value: shortenString(account, 20, 5),
      contentCopy: account
    }
  ) : /* @__PURE__ */ React3.createElement(
    sign_default,
    {
      account,
      connection,
      setIsAccountExist,
      setExpand,
      setAccountInfo,
      noSignUpForm,
      setWalletState
    }
  ) : /* @__PURE__ */ React3.createElement("button", { className: "btn btn-dark" }, /* @__PURE__ */ React3.createElement(
    "span",
    {
      className: "spinner-border spinner-border-sm me-1",
      role: "status",
      "aria-hidden": "true"
    }
  ))), activeConnectorError && /* @__PURE__ */ React3.createElement("div", { className: "mt-1 fs-7 text-danger text-start" }, "Connector error: ", activeConnectorError, "."), rpcError && /* @__PURE__ */ React3.createElement("div", { className: "mt-1 fs-7 text-danger text-start" }, "RPC error: ", rpcError));
};
var Concordium_default = SSOConcordiumProvider;
export {
  Concordium_default as default
};
