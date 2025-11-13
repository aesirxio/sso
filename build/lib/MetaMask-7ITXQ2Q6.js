import {
  Image,
  useUserContext
} from "./chunk-I6J7OCMM.js";
import {
  ButtonCopy_default
} from "./chunk-XAJPVRVJ.js";
import {
  shortenString
} from "./chunk-5VDMOXEK.js";
import "./chunk-L4YLJHLJ.js";

// src/SSOConfig/MetaMask/index.tsx
import React, { useState } from "react";
import { useWeb3Modal } from "@web3modal/react";

// src/SSOButton/images/ethereum_icon.png
var ethereum_icon_default = "data:image/png;base64,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";

// src/SSOConfig/MetaMask/index.tsx
import { Button } from "react-bootstrap";
import { EthereumClient, w3mConnectors, w3mProvider } from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";
import { arbitrum, mainnet, polygon } from "wagmi/chains";
import { CONCORDIUM_WALLET_CONNECT_PROJECT_ID } from "@concordium/react-components";
var chains = [arbitrum, mainnet, polygon];
var projectId = CONCORDIUM_WALLET_CONNECT_PROJECT_ID;
var { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
var wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [...w3mConnectors({ projectId, chains })],
  publicClient
});
var ethereumClient = new EthereumClient(wagmiConfig, chains);
var MetaMask = ({ connectWallet, setShow }) => {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(WagmiConfig, { config: wagmiConfig }, /* @__PURE__ */ React.createElement(MetaMaskApp, { connectWallet, setShow })), /* @__PURE__ */ React.createElement(Web3Modal, { projectId, ethereumClient }));
};
var MetaMaskApp = ({ connectWallet, setShow }) => {
  const { aesirxData } = useUserContext();
  const { open, isOpen } = useWeb3Modal();
  const { address, isConnecting } = useAccount();
  const [connecting, setConnecting] = useState(false);
  const walletAddress = aesirxData?.wallet_metamask ? aesirxData?.wallet_metamask : address;
  const hanleConnect = async (address2, walletType) => {
    setConnecting(true);
    await connectWallet(address2, walletType);
    setConnecting(false);
  };
  return /* @__PURE__ */ React.createElement("div", { className: "py-4 px-4 border rounded" }, /* @__PURE__ */ React.createElement("div", { className: "d-flex justify-content-start align-items-center mb-3" }, /* @__PURE__ */ React.createElement(Image, { className: "me-14px", src: ethereum_icon_default, width: 25, height: 40, alt: "logo ethereum" }), /* @__PURE__ */ React.createElement("p", { className: "fw-semibold fs-18 mb-0 ms-2" }, "Ethereum")), /* @__PURE__ */ React.createElement("p", { className: "fw-medium mb-12px" }, "Address"), /* @__PURE__ */ React.createElement("div", { className: "position-relative overflow-hidden fs-7 mb-3 py-2 px-3 bg-gray-100 rounded border border-gray-stoke-1" }, /* @__PURE__ */ React.createElement("span", { className: "fw-normal" }, !walletAddress ? "Not Connect!" : shortenString(walletAddress, 20, 6)), /* @__PURE__ */ React.createElement(
    ButtonCopy_default,
    {
      content: walletAddress || aesirxData?.wallet_metamask,
      className: " border-0 top-0 bottom-0 p-0 px-2 bg-gray-100 position-absolute end-0"
    }
  )), !aesirxData?.wallet_metamask && /* @__PURE__ */ React.createElement(
    Button,
    {
      disabled: isConnecting || isOpen || connecting,
      onClick: () => {
        !address ? open() : hanleConnect(address, "metamask");
      },
      variant: "success",
      className: "fw-semibold py-12px py-12px w-100"
    },
    address ? "Connect this address" : "Connect to Ethereum wallets"
  ), aesirxData?.wallet_metamask && /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => setShow({
        show: true,
        data: {
          wallet: "metamask",
          address: aesirxData?.wallet_metamask
        }
      }),
      variant: "danger",
      className: "fw-semibold py-12px py-12px w-100"
    },
    "Disconnect"
  ));
};
var MetaMask_default = MetaMask;
export {
  MetaMask_default as default
};
