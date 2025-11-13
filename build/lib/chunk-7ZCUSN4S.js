import {
  ButtonCopy_default
} from "./chunk-XAJPVRVJ.js";
import {
  getClientApp
} from "./chunk-5VDMOXEK.js";

// src/components/ComponentTags.tsx
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
var ComponentTags = ({ title, value, className, contentCopy }) => {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `custom_tags border text-dark rounded-1 mb-0 py-1 px-20px d-flex justify-content-between fw-semibold ${className}`
    },
    /* @__PURE__ */ React.createElement("span", { className: "d-flex align-items-center" }, /* @__PURE__ */ React.createElement(
      FontAwesomeIcon,
      {
        icon: faCheckCircle,
        width: 16,
        height: 16,
        className: "text-success me-1"
      }
    ), title),
    /* @__PURE__ */ React.createElement("p", { className: "mb-0" }, value, " ", contentCopy && /* @__PURE__ */ React.createElement(
      ButtonCopy_default,
      {
        content: contentCopy,
        isBlack: true,
        className: "bg-transparent border-0 text-dark px-1"
      }
    ))
  );
};
var ComponentTags_default = ComponentTags;

// src/Hooks/useWallet.ts
import { toast } from "react-toastify";
import axios from "axios";
var useWallet = (wallet, publicAddress) => {
  const { endpoint } = getClientApp();
  const getWalletNonce = async () => {
    try {
      const reqAuthFormData = {
        publicAddress,
        wallet,
        text: `Login with nonce: {}`
      };
      const config = {
        method: "post",
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getWalletNonce&api=hal`,
        headers: {
          "Content-Type": "application/json"
        },
        data: reqAuthFormData
      };
      const { data } = await axios(config);
      if (data.result) {
        return data.result;
      }
      throw false;
    } catch (error) {
      return false;
    }
  };
  const verifySignature = async (wallet2, publicAddress2, signature) => {
    try {
      const returnParams = new URLSearchParams(window.location.search)?.get("return");
      const channelTypeParams = new URLSearchParams(window.location.search)?.get("channel_type");
      const organisationParams = new URLSearchParams(window.location.search)?.get("organisationId");
      const reqAuthFormData = {
        wallet: wallet2,
        publicAddress: publicAddress2,
        signature,
        ...channelTypeParams && { channel_type: channelTypeParams },
        ...returnParams && { return: returnParams },
        ...organisationParams && { organisationId: organisationParams }
      };
      const config = {
        method: "post",
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=walletLogin&api=hal&return=${returnParams ?? null}`,
        headers: {
          "Content-Type": "application/json"
        },
        data: reqAuthFormData
      };
      const { data } = await axios(config);
      if (data?.result) {
        return data?.result;
      } else {
        throw false;
      }
    } catch (error) {
      console.log(error);
      toast("Wrong authentication", { closeOnClick: false });
      return false;
    }
  };
  return { getWalletNonce, verifySignature };
};
var useWallet_default = useWallet;

export {
  useWallet_default,
  ComponentTags_default
};
