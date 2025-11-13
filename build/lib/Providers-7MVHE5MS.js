import {
  login_bg_default
} from "./chunk-VXAG267Q.js";
import {
  arrow_left_default
} from "./chunk-LS5LYGC5.js";
import "./chunk-L4YLJHLJ.js";

// src/SSOButton/Providers/index.tsx
import React, { Suspense, useState } from "react";

// src/SSOButton/images/privacy_icon.png
var privacy_icon_default = "data:image/png;base64,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";

// src/SSOButton/images/cancel.svg
var cancel_default = 'data:image/svg+xml,<?xml version="1.0" encoding="iso-8859-1"?>%0D%0A<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->%0D%0A<svg fill="%23fff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"%0D%0A%09 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">%0D%0A<g>%0D%0A%09<g>%0D%0A%09%09<path d="M256,0C115.39,0,0,115.39,0,256s115.39,256,256,256s256-115.39,256-256S396.61,0,256,0z M383.28,340.858l-42.422,42.422%0D%0A%09%09%09L256,298.422l-84.858,84.858l-42.422-42.422L213.578,256l-84.858-84.858l42.422-42.422L256,213.578l84.858-84.858l42.422,42.422%0D%0A%09%09%09L298.422,256L383.28,340.858z"/>%0D%0A%09</g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A<g>%0D%0A</g>%0D%0A</svg>%0D%0A';

// src/SSOButton/Providers/index.tsx
var SSOConcordiumProvider = React.lazy(() => import("./Concordium-35IXYCHK.js"));
var SSOEthereumProvider = React.lazy(() => import("./Ethereum-6A43EXB4.js"));
var SSOEmailProvider = React.lazy(() => import("./Email-425Q337M.js"));
var SSOUpdateEmailProvider = React.lazy(() => import("./update-5LHN5TP5.js"));
var SSOSocialProvider = React.lazy(() => import("./Social-3QNDVJP7.js"));
var SSOProviders = ({ loginText, loginBg, forgotPasswordLink }) => {
  const [expand, setExpand] = useState("");
  const [accountInfo, setAccountInfo] = useState({});
  const [isAccountExist, setIsAccountExist] = useState({ status: true, type: "" });
  const urlParams = new URLSearchParams(window.location.search);
  let login = ["concordium", "metamask", "regular"];
  if (urlParams.has("return")) {
    login = new URL(atob(urlParams.get("return"))).searchParams.getAll("login[]");
  }
  const hasMetamask = login.length === 0 || login.includes("metamask");
  const hasConcordium = login.length === 0 || login.includes("concordium");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "row gx-0 align-items-center w-100" }, /* @__PURE__ */ React.createElement("div", { className: "col-lg-7" }, /* @__PURE__ */ React.createElement("div", { className: "pt-0 pb-4 px-4 block-wallet" }, /* @__PURE__ */ React.createElement("div", { className: "py-4 px-lg-4" }, !expand ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("img", { src: privacy_icon_default, alt: "Privacy Icon" }), /* @__PURE__ */ React.createElement(
    "h3",
    {
      className: "fs-3 fw-semibold mt-2 mb-3 text-primary",
      dangerouslySetInnerHTML: { __html: `Welcome to ${loginText}` }
    }
  ), /* @__PURE__ */ React.createElement("p", { className: "mb-20px fs-14" }, "Select your login method"), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "btn btn-success w-100 lh-sm text-white fw-semibold mb-18px",
      onClick: () => {
        setExpand("email");
      }
    },
    "Log in with Email and Password"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "btn btn-outline w-100 lh-sm fw-semibold mb-18px",
      onClick: () => {
        setExpand("social");
      }
    },
    "Log in with Social Media"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "button",
      className: "btn btn-outline w-100 lh-sm fw-semibold",
      onClick: () => {
        setExpand("wallet");
      }
    },
    "Log in with Web3 Wallets"
  )) : expand === "social" || expand === "wallet" || expand === "email" ? /* @__PURE__ */ React.createElement("div", { className: "text-start" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary",
      onClick: () => {
        setExpand("");
        setIsAccountExist({ status: true, type: "" });
      }
    },
    /* @__PURE__ */ React.createElement("img", { src: arrow_left_default, alt: "Back Icon", className: "me-1" }),
    "Back"
  )) : /* @__PURE__ */ React.createElement(React.Fragment, null), expand?.includes("wallet") && /* @__PURE__ */ React.createElement(React.Fragment, null, !isAccountExist?.status && (expand === "social" || expand === "wallet" || expand === "email") && /* @__PURE__ */ React.createElement("div", { className: "bg-danger text-white px-3 py-2 rounded-2 d-flex align-items-center mb-3" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      className: "me-1",
      src: cancel_default,
      alt: "cancel Icon",
      width: "16px",
      height: "16px"
    }
  ), "Your account not exist"), (expand === "wallet" || expand === "wallet-metamask") && hasMetamask && /* @__PURE__ */ React.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
    SSOEthereumProvider,
    {
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  ))), (expand === "wallet" || expand === "wallet-concordium") && hasConcordium && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
    SSOConcordiumProvider,
    {
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  )))), expand === "email" && /* @__PURE__ */ React.createElement("div", { className: "control-group" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(SSOEmailProvider, { forgotPasswordLink }))), expand?.includes("social") && /* @__PURE__ */ React.createElement("div", null, !isAccountExist?.status && (expand === "social" || expand === "wallet" || expand === "email") && /* @__PURE__ */ React.createElement("div", { className: "bg-danger text-white px-3 py-2 rounded-2 d-flex align-items-center" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      className: "me-1",
      src: cancel_default,
      alt: "cancel Icon",
      width: "16px",
      height: "16px"
    }
  ), "Your account not link to ", isAccountExist?.type, " yet"), (expand === "social" || expand === "social-google") && /* @__PURE__ */ React.createElement("div", { className: "mb-1" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
    SSOSocialProvider,
    {
      typeSocial: "google",
      isAccountExist,
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  ))), (expand === "social" || expand === "social-twitter") && /* @__PURE__ */ React.createElement("div", { className: "mb-1" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
    SSOSocialProvider,
    {
      typeSocial: "twitter",
      isAccountExist,
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  ))), (expand === "social" || expand === "social-facebook") && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
    SSOSocialProvider,
    {
      typeSocial: "facebook",
      isAccountExist,
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  ))), (expand === "social" || expand === "social-reddit") && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
    SSOSocialProvider,
    {
      typeSocial: "reddit",
      isAccountExist,
      setIsAccountExist,
      setExpand,
      setAccountInfo
    }
  )))), expand?.includes("require-email") && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { className: "control-group" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(SSOUpdateEmailProvider, { accountInfo }))))))), /* @__PURE__ */ React.createElement("div", { className: "d-none d-lg-block col-lg-5" }, /* @__PURE__ */ React.createElement("img", { className: "w-100", src: loginBg ? loginBg : login_bg_default, alt: "Login Background" }))));
};
var Providers_default = SSOProviders;
export {
  Providers_default as default
};
