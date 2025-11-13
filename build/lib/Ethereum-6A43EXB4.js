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
  getMember,
  shortenString
} from "./chunk-5VDMOXEK.js";
import "./chunk-L4YLJHLJ.js";

// src/SSOButton/Providers/Ethereum/index.tsx
import React3, { useEffect } from "react";
import { configureChains, createConfig, WagmiConfig, useAccount as useAccount2 } from "wagmi";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
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
  zkSyncTestnet
} from "wagmi/chains";
import { Web3Modal } from "@web3modal/react";

// src/SSOButton/Providers/Ethereum/sign.tsx
import React, { useContext, useState } from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers";
import { useAccount } from "wagmi";

// src/SSOButton/images/ethereum_logo.png
var ethereum_logo_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAhCAYAAAA2/OAtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI/SURBVHgBxVY9SEJRFD6vokgIAqea3uTUIDS5Ra4GtbiqY1POLRkEDSHmFE3RFi4NOrXkFARGDkLkotEQ/QiBYBSFfUfPq+fzvvd8JvTBx33v3nM+z73n3PMkGhDtdjtKowQE42AJDNIoACEdrIloBvS5+YyROzZAXZ5ZMOLm4CjKUWJIWqbDmA/QsKLAuc38Cg0jysmh321bEcB6mLyIyra3yBkRu6TZRZoi+ygNsGB0IFH8+iqGGA2GkCppqkgz5A1xR1H8Kp+jTt7gh19P7WomQR1DTeH0IPMn4Au4CM5YbFrgjqZpDX6ZMC2kFGIlGRnvYFWogwvgvKxx0uJg+kdUajImjnfgrUlMhbpwRiLnZHHtBhBtVcPDLCYuwSZYEWEVroQqGOKTYJYjnQPz1H9OXsABFcFPcHoM4d7gYRe8oL/hCaxwsjTJOuGljmc/dW+JqhnbbZ+jrMP/Q/x9nZLCyz4PYFbEQ9TtRH4H0U5SYd+UHhCR4HKGKCfrWoxTWDiWeTbkbuQzifK5PYOPsPuSbsV2b9St1Za5+IMm4TqYgEFRtsROU+AZeC9iAdmNcfc3jeLvAQyT7V4cGWeOcVxGvpbr4KGJ6mtqEuZuv2SZToF7chTLchwGyojwwE1Up+5nRLcsqbLP201bt93X+jj7GBI0GHKqc1R2fk4Qhiw5Iw+7smrB9sMHB/40l22WG1gv2Pm6faLXwFfLHPfOtJOTo6ic77ZluqCsR69ARZzKf6k4jQp8jaXI/fRf+AaHjRu6xDEXQwAAAABJRU5ErkJggg==";

// src/SSOButton/Providers/Ethereum/sign.tsx
import { toast } from "react-toastify";
var SignMessage = ({ setIsAccountExist, setExpand, setAccountInfo }) => {
  const wallet = "metamask";
  const { address, connector } = useAccount();
  const { getWalletNonce, verifySignature } = useWallet_default(wallet, address);
  const [status, setStatus] = useState("");
  const { noCreateAccount, isSignUpForm, handleOnData, toggle, isRequireEmail } = useContext(SSOModalContext);
  const [isExist, setIsExist] = useState(true);
  const [show, setShow] = useState(false);
  const { isLoading, signMessage } = useSignMessage({
    async onSuccess(data, variables) {
      const address2 = verifyMessage(variables.message, data);
      const res = await verifySignature(wallet, address2, data);
      if (isRequireEmail) {
        const member = await getMember(res?.access_token);
        if (!member?.email || /@aesirx\.io$/.test(member?.email) && (member?.wallet_concordium && member?.email?.includes(member?.wallet_concordium) || member?.wallet_metamask && member?.email?.includes(member?.wallet_metamask))) {
          setExpand("require-email");
          setAccountInfo({ data: res, memberId: member?.member_id });
        } else {
          handleOnData({ ...res, loginType: "metamask" });
        }
      } else {
        handleOnData({ ...res, loginType: "metamask" });
      }
    }
  });
  const handleSignMessage = async () => {
    setStatus("connect");
    const nonce = await getWalletNonce();
    if (nonce) {
      setStatus("sign");
      signMessage({ message: `${nonce}` });
    } else {
      !noCreateAccount && setIsExist(false);
      setIsAccountExist({ status: false, type: "metamask" });
    }
    setStatus("");
  };
  const handleSuccess = async () => {
    setShow(false);
    setExpand("wallet");
    setIsAccountExist({ status: true, type: "" });
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, show ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "text-start" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary",
      onClick: () => {
        setShow(false);
        setExpand("wallet");
        setIsAccountExist({ status: true, type: "" });
      }
    },
    /* @__PURE__ */ React.createElement("img", { src: arrow_left_default, alt: "Back Icon", className: "me-1" }),
    "Back"
  )), /* @__PURE__ */ React.createElement("div", { className: "text-primary" }, /* @__PURE__ */ React.createElement(
    CreateAccount_default,
    {
      setShow: isSignUpForm ? toggle : handleSuccess,
      setIsExist,
      setIsAccountExist,
      accountAddress: address,
      connection: connector,
      wallet: "metamask",
      isRequireEmail
    }
  ))) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "button",
    {
      disabled: isLoading,
      className: "btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center text-start",
      onClick: async () => {
        if (!isExist || isSignUpForm) {
          setStatus("loading");
          try {
            const checkAccount = await checkWalletAccount(address, wallet);
            if (!checkAccount?.data?.result) {
              setShow(true);
              setExpand("wallet-metamask");
            } else {
              toast.error("You've already created an account with this wallet.");
            }
            setStatus("");
          } catch (error) {
            setStatus("");
            console.log(error);
            toast.error(error?.response?.data?.error || error?.message);
          }
        } else {
          handleSignMessage();
        }
      }
    },
    status ? /* @__PURE__ */ React.createElement("div", { className: "d-flex align-items-center" }, /* @__PURE__ */ React.createElement(
      "span",
      {
        className: "spinner-border spinner-border-sm me-1",
        role: "status",
        "aria-hidden": "true"
      }
    ), /* @__PURE__ */ React.createElement("span", { className: "ms-1" }, status === "sign" ? `Please sign message via ${connector?.name}` : status === "loading" ? "Connecting..." : `Please wait to connect... via ${connector?.name}`)) : !isExist || isSignUpForm ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { className: "me-3", src: ethereum_logo_default, alt: "Ethereum Logo" }), "Create account via ", connector?.name, " (", address && shortenString(address), ")") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { className: "me-3", src: ethereum_logo_default, alt: "Ethereum Logo" }), "Sign in via ", connector?.name, " (", address && shortenString(address), ")")
  )));
};
var sign_default = SignMessage;

// src/SSOButton/Providers/Ethereum/connect.tsx
import { useWeb3Modal } from "@web3modal/react";
import React2, { useState as useState2 } from "react";
var ConnectMetamask = () => {
  const [loading, setLoading] = useState2(false);
  const { open } = useWeb3Modal();
  async function onOpen() {
    setLoading(true);
    await open();
    setLoading(false);
  }
  return /* @__PURE__ */ React2.createElement(
    "button",
    {
      onClick: onOpen,
      disabled: loading,
      className: "btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center justify-content-start"
    },
    loading ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement(
      "span",
      {
        className: "spinner-border spinner-border-sm me-1",
        role: "status",
        "aria-hidden": "true"
      }
    ), "Waiting for signing...") : /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("img", { className: "me-3", src: ethereum_logo_default, alt: "Ethereum Logo" }), "Ethereum wallets")
  );
};
var connect_default = ConnectMetamask;

// src/SSOButton/Providers/Ethereum/index.tsx
import { CONCORDIUM_WALLET_CONNECT_PROJECT_ID } from "@concordium/react-components";
var chains = [
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
  zkSyncTestnet
];
var projectId = CONCORDIUM_WALLET_CONNECT_PROJECT_ID;
var { publicClient, webSocketPublicClient } = configureChains(chains, [
  w3mProvider({ projectId })
]);
var wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
  webSocketPublicClient
});
var ethereumClient = new EthereumClient(wagmiConfig, chains);
var SSOEthereumProvider = ({
  setIsAccountExist,
  setExpand,
  noLogin,
  accountAddress,
  setAccountAddress,
  setConnection,
  setWalletType,
  setAccountInfo
}) => {
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement(WagmiConfig, { config: wagmiConfig }, /* @__PURE__ */ React3.createElement(
    SSOEthereumApp,
    {
      setIsAccountExist,
      setExpand,
      noLogin,
      accountAddress,
      setAccountAddress,
      setConnection,
      setWalletType,
      setAccountInfo
    }
  )), /* @__PURE__ */ React3.createElement(Web3Modal, { projectId, ethereumClient }));
};
var SSOEthereumApp = ({
  setIsAccountExist,
  setExpand,
  noLogin,
  accountAddress,
  setAccountAddress,
  setConnection,
  setWalletType,
  setAccountInfo
}) => {
  const { address, isConnected, connector } = useAccount2();
  useEffect(() => {
    if (setAccountAddress) {
      if (address && connector) {
        setAccountAddress(address);
        setConnection(connector);
        setWalletType("metamask");
      } else {
        setAccountAddress("");
        setConnection(null);
        setWalletType("");
      }
    }
  }, [address, connector]);
  return isConnected ? noLogin ? /* @__PURE__ */ React3.createElement(React3.Fragment, null, accountAddress ? /* @__PURE__ */ React3.createElement(
    ComponentTags_default,
    {
      className: "mb-12px",
      title: "Account Connected:",
      value: shortenString(address, 20, 5),
      contentCopy: address
    }
  ) : /* @__PURE__ */ React3.createElement(
    "button",
    {
      onClick: () => {
        setAccountAddress(address);
        setConnection(connector);
        setWalletType("metamask");
      },
      className: "btn btn-ethereum fw-medium px-4 fs-18 lh-sm w-100 btn-secondary text-white d-flex align-items-center justify-content-start"
    },
    /* @__PURE__ */ React3.createElement("img", { className: "me-3", src: ethereum_logo_default, alt: "Ethereum Logo" }),
    "Ethereum wallets"
  )) : /* @__PURE__ */ React3.createElement(
    sign_default,
    {
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  ) : /* @__PURE__ */ React3.createElement(connect_default, null);
};
var Ethereum_default = SSOEthereumProvider;
export {
  Ethereum_default as default
};
