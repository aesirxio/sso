import {
  BROWSER_WALLET,
  concordium_default
} from "./chunk-FLCDBSBG.js";
import {
  logo_facebook_default,
  logo_google_default,
  logo_twitter_default
} from "./chunk-PQJIJPRP.js";
import {
  CreateAccount_default
} from "./chunk-CLTATKNT.js";
import {
  SSOModalContext,
  modal_default
} from "./chunk-C2QB5TE4.js";
import {
  login_bg_default
} from "./chunk-VXAG267Q.js";
import {
  arrow_left_default
} from "./chunk-LS5LYGC5.js";
import {
  GlobalContextProvider,
  Image,
  UserContextProvider,
  notify,
  useGlobalContext,
  useUserContext,
  warning_icon_default
} from "./chunk-I6J7OCMM.js";
import {
  ButtonCopy_default
} from "./chunk-XAJPVRVJ.js";
import {
  connectWallet,
  getClientApp,
  removeWallet,
  shortenString,
  updateMember,
  validateEmail
} from "./chunk-5VDMOXEK.js";
import "./chunk-L4YLJHLJ.js";

// src/SSOButton/index.tsx
import React, { useState } from "react";
var SSOButton = ({
  className,
  text = "Login",
  loginText = "AesirX SSO",
  loginBg,
  onGetData,
  demoUser = "",
  demoPassword = "",
  noCreateAccount = false,
  isRequireEmail = false,
  customClass,
  forgotPasswordLink
}) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    if (typeof window !== "undefined") {
      !show ? document.body.classList.add("modal-sso-open") : document.body.classList.remove("modal-sso-open");
    }
    setShow(!show);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", { type: "button", className: `btn ${className}`, onClick: toggle }, text), /* @__PURE__ */ React.createElement(
    modal_default,
    {
      demoUser,
      demoPassword,
      noCreateAccount,
      isRequireEmail,
      onGetData,
      show,
      toggle,
      loginText,
      loginBg,
      customClass,
      forgotPasswordLink
    }
  ));
};
var SSOButton_default = SSOButton;

// src/SSOButton/ConcordiumLogin.tsx
import React2, { Suspense as Suspense2 } from "react";
var SSOConcordiumProvider = React2.lazy(() => import("./Concordium-35IXYCHK.js"));
var ConcordiumLogin = ({ onGetData }) => {
  const handleOnData = (data) => {
    onGetData(data);
  };
  return /* @__PURE__ */ React2.createElement(React2.Fragment, null, /* @__PURE__ */ React2.createElement("div", null, /* @__PURE__ */ React2.createElement(
    SSOModalContext.Provider,
    {
      value: {
        handleOnData,
        toggle: () => {
        },
        demoUser: null,
        demoPassword: null,
        noCreateAccount: false,
        isSignUpForm: false,
        isRequireEmail: false
      }
    },
    /* @__PURE__ */ React2.createElement(Suspense2, { fallback: /* @__PURE__ */ React2.createElement(React2.Fragment, null, "Loading...") }, /* @__PURE__ */ React2.createElement(
      SSOConcordiumProvider,
      {
        setIsAccountExist: () => {
        },
        setExpand: () => {
        },
        setAccountInfo: () => {
        }
      }
    ))
  )));
};
var ConcordiumLogin_default = ConcordiumLogin;

// src/SSOButton/EmailLogin.tsx
import React3, { Suspense as Suspense3 } from "react";
var SSOEmailProvider = React3.lazy(() => import("./Email-425Q337M.js"));
var EmailLogin = ({
  onGetData,
  btnClass,
  spacingClass,
  noLabel,
  forgotPasswordLink,
  demoUser,
  demoPassword
}) => {
  const handleOnData = (data) => {
    onGetData(data);
  };
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("div", null, /* @__PURE__ */ React3.createElement(
    SSOModalContext.Provider,
    {
      value: {
        handleOnData,
        toggle: () => {
        },
        demoUser: demoUser ?? "",
        demoPassword: demoPassword ?? "",
        noCreateAccount: false,
        isSignUpForm: false,
        isRequireEmail: false
      }
    },
    /* @__PURE__ */ React3.createElement("div", { className: "control-group" }, /* @__PURE__ */ React3.createElement(Suspense3, { fallback: /* @__PURE__ */ React3.createElement(React3.Fragment, null, "Loading...") }, /* @__PURE__ */ React3.createElement(
      SSOEmailProvider,
      {
        btnClass,
        spacingClass,
        noLabel,
        forgotPasswordLink
      }
    )))
  )));
};
var EmailLogin_default = EmailLogin;

// src/SignUpButton/index.tsx
import React4, { Suspense as Suspense4, useState as useState2 } from "react";
import { CloseButton, Modal, ModalBody } from "react-bootstrap";
var SSOConcordiumProvider2 = React4.lazy(() => import("./Concordium-35IXYCHK.js"));
var SSOEthereumProvider = React4.lazy(() => import("./Ethereum-6A43EXB4.js"));
var SSOEmailProvider2 = React4.lazy(() => import("./Email-425Q337M.js"));
var SSOSocialProvider = React4.lazy(() => import("./Social-3QNDVJP7.js"));
var SignUpButton = ({
  className,
  text = "Login",
  loginBg,
  isRequireEmail = false,
  productOptions = [],
  customClass,
  alertButton = {
    isShow: false,
    handleClick: void 0,
    alertWarning: void 0
  }
}) => {
  const [show, setShow] = useState2(false);
  const [expand, setExpand] = useState2("");
  const [isAccountExist, setIsAccountExist] = useState2({ status: true, type: "" });
  const urlParams = new URLSearchParams(window.location.search);
  let login = ["concordium", "metamask", "regular"];
  if (urlParams.has("return")) {
    login = new URL(atob(urlParams.get("return"))).searchParams.getAll("login[]");
  }
  const hasMetamask = login.length === 0 || login.includes("metamask");
  const hasConcordium = login.length === 0 || login.includes("concordium");
  const toggle = () => {
    setShow(!show);
    setExpand("");
  };
  return /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("button", { type: "button", className: `btn ${className}`, onClick: toggle }, text), /* @__PURE__ */ React4.createElement(
    Modal,
    {
      show,
      centered: true,
      onHide: () => {
        setShow(!show);
      },
      size: "xl",
      className: `aesirxsso ${customClass ?? ""}`
    },
    /* @__PURE__ */ React4.createElement(
      CloseButton,
      {
        onClick: () => {
          setShow(!show);
        }
      }
    ),
    /* @__PURE__ */ React4.createElement(ModalBody, { className: "p-0 bg-white rounded-3 text-primary" }, /* @__PURE__ */ React4.createElement(
      SSOModalContext.Provider,
      {
        value: {
          handleOnData: null,
          toggle,
          demoUser: null,
          demoPassword: null,
          noCreateAccount: false,
          isSignUpForm: true,
          isRequireEmail
        }
      },
      /* @__PURE__ */ React4.createElement("div", { className: "row gx-0 w-100" }, /* @__PURE__ */ React4.createElement("div", { className: "col-lg-7 d-flex align-items-center" }, /* @__PURE__ */ React4.createElement("div", { className: "pt-0 pb-4 px-4 block-wallet" }, /* @__PURE__ */ React4.createElement("div", { className: "py-4 px-lg-4" }, !expand ? /* @__PURE__ */ React4.createElement(React4.Fragment, null, /* @__PURE__ */ React4.createElement("h3", { className: "fs-4 fw-semibold mt-2 mb-3 text-primary" }, "Sign up"), /* @__PURE__ */ React4.createElement("p", { className: "fs-7" }, "Select your sign up method"), /* @__PURE__ */ React4.createElement(
        "button",
        {
          type: "button",
          className: "btn btn-success w-100 lh-sm text-white fw-semibold mb-18px",
          onClick: () => {
            setExpand("wallet");
          }
        },
        "Connect with Web3 Wallets"
      ), /* @__PURE__ */ React4.createElement(
        "button",
        {
          type: "button",
          className: "btn btn-outline w-100 lh-sm fw-semibold mb-18px",
          onClick: () => {
            setExpand("social");
          }
        },
        "Connect with Social Media"
      ), /* @__PURE__ */ React4.createElement(
        "button",
        {
          type: "button",
          className: "btn btn-outline w-100 lh-sm fw-semibold",
          onClick: () => {
            setExpand("email");
          }
        },
        "Sign up with email"
      )) : expand === "social" || expand === "wallet" || expand === "email" ? /* @__PURE__ */ React4.createElement("div", { className: "text-start" }, /* @__PURE__ */ React4.createElement(
        "div",
        {
          className: "cursor-pointer fw-medium fs-14 d-inline-flex align-items-center back-button text-primary",
          onClick: () => {
            setExpand("");
            setIsAccountExist({ status: true, type: "" });
          }
        },
        /* @__PURE__ */ React4.createElement("img", { src: arrow_left_default, alt: "Back Icon", className: "me-1" }),
        "Back"
      )) : /* @__PURE__ */ React4.createElement(React4.Fragment, null), expand?.includes("wallet") && /* @__PURE__ */ React4.createElement(React4.Fragment, null, (expand === "wallet" || expand === "wallet-metamask") && hasMetamask && /* @__PURE__ */ React4.createElement("div", { className: "mb-3" }, /* @__PURE__ */ React4.createElement(Suspense4, { fallback: /* @__PURE__ */ React4.createElement(React4.Fragment, null, "Loading...") }, /* @__PURE__ */ React4.createElement(
        SSOEthereumProvider,
        {
          setIsAccountExist,
          setExpand
        }
      ))), (expand === "wallet" || expand === "wallet-concordium") && hasConcordium && /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement(Suspense4, { fallback: /* @__PURE__ */ React4.createElement(React4.Fragment, null, "Loading...") }, /* @__PURE__ */ React4.createElement(
        SSOConcordiumProvider2,
        {
          setIsAccountExist,
          setExpand
        }
      )))), expand === "email" && /* @__PURE__ */ React4.createElement(
        CreateAccount_default,
        {
          noLogin: true,
          isNoWallet: true,
          setShow: toggle,
          productOptions,
          alertButton,
          isRequireEmail
        }
      ), expand?.includes("social") && /* @__PURE__ */ React4.createElement("div", null, (expand === "social" || expand === "social-google") && /* @__PURE__ */ React4.createElement("div", { className: "mb-1" }, /* @__PURE__ */ React4.createElement(Suspense4, { fallback: /* @__PURE__ */ React4.createElement(React4.Fragment, null, "Loading...") }, /* @__PURE__ */ React4.createElement(
        SSOSocialProvider,
        {
          typeSocial: "google",
          isAccountExist: { status: false, type: "google" },
          setIsAccountExist,
          setExpand
        }
      ))), (expand === "social" || expand === "social-twitter") && /* @__PURE__ */ React4.createElement("div", { className: "mb-1" }, /* @__PURE__ */ React4.createElement(Suspense4, { fallback: /* @__PURE__ */ React4.createElement(React4.Fragment, null, "Loading...") }, /* @__PURE__ */ React4.createElement(
        SSOSocialProvider,
        {
          typeSocial: "twitter",
          isAccountExist: { status: false, type: "twitter" },
          setIsAccountExist,
          setExpand
        }
      ))), (expand === "social" || expand === "social-facebook") && /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement(Suspense4, { fallback: /* @__PURE__ */ React4.createElement(React4.Fragment, null, "Loading...") }, /* @__PURE__ */ React4.createElement(
        SSOSocialProvider,
        {
          typeSocial: "facebook",
          isAccountExist: { status: false, type: "facebook" },
          setIsAccountExist,
          setExpand
        }
      ))), (expand === "social" || expand === "social-reddit") && /* @__PURE__ */ React4.createElement("div", null, /* @__PURE__ */ React4.createElement(Suspense4, { fallback: /* @__PURE__ */ React4.createElement(React4.Fragment, null, "Loading...") }, /* @__PURE__ */ React4.createElement(
        SSOSocialProvider,
        {
          typeSocial: "reddit",
          isAccountExist: { status: false, type: "reddit" },
          setIsAccountExist,
          setExpand
        }
      ))))))), /* @__PURE__ */ React4.createElement("div", { className: "d-none d-lg-block col-lg-5" }, /* @__PURE__ */ React4.createElement(
        "img",
        {
          className: "w-100 h-100",
          src: loginBg ? loginBg : login_bg_default,
          alt: "Login Background"
        }
      )))
    ))
  ));
};
var SignUpButton_default = SignUpButton;

// src/SignUpButton/SignUpConcordium.tsx
import React5 from "react";
var SignUpConcordium = ({
  isRequireEmail = false,
  productOptions = [],
  packagesData,
  defaultValues = []
}) => {
  return /* @__PURE__ */ React5.createElement(React5.Fragment, null, /* @__PURE__ */ React5.createElement("div", null, /* @__PURE__ */ React5.createElement(
    SSOModalContext.Provider,
    {
      value: {
        handleOnData: null,
        toggle: () => {
        },
        demoUser: null,
        demoPassword: null,
        noCreateAccount: false,
        isSignUpForm: true,
        isRequireEmail
      }
    },
    /* @__PURE__ */ React5.createElement(
      CreateAccount_default,
      {
        noLogin: true,
        isNoWallet: true,
        setShow: true,
        packagesData,
        productOptions,
        isRequireEmail,
        defaultValues,
        isRequireConcordium: true
      }
    )
  )));
};
var SignUpConcordium_default = SignUpConcordium;

// src/SSOConfig/index.tsx
import React15 from "react";
import { Col, Row } from "react-bootstrap";

// src/SSOConfig/Concordium/index.tsx
import React8, { useState as useState4 } from "react";

// src/SSOButton/images/concordium_bg_black.png
var concordium_bg_black_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA4CAYAAABHRFAgAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAbaSURBVHgB1ZtfbFNVHMd/597O0WHaAg3xwc3yKhCKiYmsJhRJZMzEARHRB+OIoj6YAPInMajb3nxzU14ADRAfhmj4lzgG0VASxzQaN0JHfLOue2LduJ2GMV3v8fc7W8u9t7fdPbft2n2Srb3nnnt3v/f3O+f3O3/GoAIsCwRCdWpdlIEeZsCeAmBhAD2An4FHtbgGTEkA5xoHfpsDxNRMZljTtASUGQZlYnkgEFYVTxtjrB0FhMAtjA1zrt9UMpnucgkuWeTjgWBUVaEDv0ah/MR04Gf+npg4CyXgWmSFxVngiUyG7f1HS8XABdIiAwhX1dN46Q5YZLDtnkE37pJ1YymRc9bjJDAEVYMnGFpVk7Cq6rSib+XK/YrCzpl7yGqAf1+B9npvA8xMP7jp5ApHIn3BYAeGgk+hhmAMok6FLihSCOTQCTWIU6FFRdaywCxOhBYUSW2w1ly0ECT0sQZv4t/p6du25+0KMUqEMEwMVb+TkUJjmdmNduFFsauNAm8sMYFEgHvqLtqdyLNkOdthY2MjtG7fBpFNzbB+3dPiOEs8PgKjyTHo6++Hc9+ch3LBORycmkx1G8tMIufd9EapwT7SvAmOHj4kPhcimUzCxmefgzJCbrsG3VbLFniMZ3VV7cTOJgQu8fl8cPzzbmht2QZVJKArngP42ZktyLVJsiIKfBNcsm7dWrj54/VqCxRgb7ufcuzs8SNLqmoUXEICr1z4TliyEPF4HO6M3BXf/X4f+LFupLkZKoTJmjmRODLvABdQZ/L16a9sBY5ieztx6kvoPXcepqam8s77hNCF260bmAJtMC9SdDxo2TBXPUPggqFffzb1mllOnDwFxz7phGrCMrCFRivCkrqiRN2MnqkHtRP4/v6DZQ0LbtEVMaCfE8mY0gaSkLjX9+zOKz/2cYetQHLNpqZGWL92rXDjOxgn7VyY2mrr9pa88r6r/ZC2qV8M7IA20+dcm+Q8TCUyUFuyWrEXxVEbNELi3ntnH/68ndduqf5H+FKMD0/fX9vzal5bpWut93ZAmH4xt+0x9sN10asaoaBOwT0LvYQrF761deksVP/lXbvzrqO2bmTg1iC07XoFZJnBxECZ9Xikc1RyKavAvqvXTA9KUK9bTCBB54/3fGYqo/uQKCNkWX+REFWIOlXdoHg4C4EkVoEE5aBGyOXs6tlBAqzuab0f0RxxFW5WKDqXnwi2e/j4yIjpWDbzoZdiZGBgMK9O05PFvcIOhkZUwAV2bpNOm3u+pka5B3reYkm7npQyJTe4EukE2QfSJMODDK5EOolXFAdlSI6OmY6deItTcCqVJUASay9KRJrNY8K+/msgg7WjsWv3o2NJkIUznlAyoGuyF9p1Cq0t203HlPXEHVqTMiBrlmSXuMfjd0EWNcMSCq0JgiTkrlZrRiL5ceyNvW8JAcWg8227zOnhXMpo7m3vYO+dTMpbEvtXTRGzW7gQCpL0Wt48CTxy5JCpLDkvoLdAsj5w65Y4b334o4c/yKt74qR0SkegvPFhkbD6VwVxXkduCY5E/f7bL3nWo9TLmq0QZB2azPL7/OL4e0y4ZRL0n/CeLiwZS0+ktgiROEPXiTN00oNmeuM03DJCrkxC45K9ayXIztyJEIK/YuACciFrmyNLXMapkHf37YNqo+gsRp9imeDhgweJZd6GHThP8ITMTWZmZmBgcBB27miDZfX1uXL6vvWFqJjDIRdLJscK3oNCxb1741B2OE+k76c+pK+5QaRblyUo77SOJIwkxSD5Lua38VwZtdGXsO2l0+lyz7sKdODt2b0GOZFimVxR/8TBs6vlAZop/6KnW3o4VIHJZcH8BHOCvufSOppx5grrAZfQeDK69cUF4+JiQHsLjAs/ptxVmZ3tdhMzs5BVnkGr0ERW1cRySuMyXcYi0/rkQ8Tr9c6gy7ZACdDYkuZjsvGS4btdvXp1fj2ccL54+YptXHULrgL0aPcnL5nLbPCvDA7hmTCUGeNUSLISlqYedXJijbW48CKsgouwbAmtUWIzY3rG+SIsVcQZyoOwhGAKK7iJqeCegYfT08Pe5Q1k6SjUOBjfu7SJVMH9DUV3f2AmFKt1oULgZKqzWJ0F9/HUslAnAglHO7JqUSj1GcVc1FQXJAgEg1Gu89P4F0JQLTBMYCezV0tVYAMhQaMVb339ZUz/VjCx5XpxEVtB9cxObXLyD5nrXG/qXWSrxtA9u2SsZ6Tk7dmBVava+dyGiiiUn5LEZSnbRnvKknRVPYBrD5tLSwkZJiL8LHrIJW18XHom0faOUAFIMKhqWEfrYtvdgI0pIP7DwJgmcvEvEzji0Yc5wF8KKMOQ+S9WiX+Z+B/ckNpICfBRJgAAAABJRU5ErkJggg==";

// src/SSOButton/Providers/web3.tsx
import React6, { createContext, useContext, useEffect as useEffect2, useState as useState3 } from "react";
import secureLocalStorage from "react-secure-storage";
import {
  WithWalletConnector,
  useConnect,
  useConnection,
  MAINNET,
  TESTNET,
  BrowserWalletConnector,
  useGrpcClient
} from "@concordium/react-components";
import { BlockHash } from "@concordium/web-sdk";
var { network } = getClientApp();
var Web3Context = createContext({
  account: "",
  gRPCClient: {}
});
var checkNetwork = (hash) => {
  switch (network) {
    case "testnet":
      return BlockHash.toHexString(hash) === TESTNET.genesisHash;
    default:
      return BlockHash.toHexString(hash) === MAINNET.genesisHash;
  }
};
var Web3ContextProvider = ({ children, autoLoad }) => {
  return /* @__PURE__ */ React6.createElement(WithWalletConnector, { network: network === "mainnet" ? MAINNET : TESTNET }, (props) => /* @__PURE__ */ React6.createElement(Web3ContextApp, { ...props, autoLoad }, children));
};
var Web3ContextApp = ({ children, ...props }) => {
  const {
    activeConnectorError,
    network: network2,
    connectedAccounts,
    genesisHashes,
    activeConnector,
    setActiveConnectorType,
    activeConnectorType,
    autoLoad = true
  } = props;
  const { setConnection, account, connection, genesisHash } = useConnection(
    connectedAccounts,
    genesisHashes
  );
  const { connect, connectError, isConnecting } = useConnect(activeConnector, setConnection);
  const [, setRpcGenesisHash] = useState3();
  const { preregistration } = useUserContext();
  const rpc = useGrpcClient(network2);
  useEffect2(() => {
    if (activeConnector) {
      connect();
    }
  }, [activeConnector, connect]);
  useEffect2(() => {
    if (connectError) {
      notify(`${connectError}`, "error");
    }
  }, [connectError]);
  useEffect2(() => {
    if (activeConnectorError) {
      notify(`${activeConnectorError}`, "error");
    }
  }, [activeConnectorError]);
  useEffect2(() => {
    const connection2 = secureLocalStorage.getItem("concordium");
    if (connection2 === "browser" && autoLoad) {
      setActiveConnectorType(BROWSER_WALLET);
    } else if (connection2 === "walletconnect") {
    }
  }, []);
  useEffect2(() => {
    if (rpc) {
      setRpcGenesisHash(void 0);
      rpc.getConsensusStatus().then((status) => status.genesisBlock).then(async (hash) => {
        if (!checkNetwork(hash)) {
          throw new Error(`Please change the network to ${network2} in Wallet`);
        }
        setRpcGenesisHash(hash);
        secureLocalStorage.setItem(
          "concordium",
          activeConnector instanceof BrowserWalletConnector ? "browser" : "walletconnect"
        );
      }).catch((err) => {
        if (err) {
          notify(`${err.message}`, "error");
        }
        connection.disconnect();
        setRpcGenesisHash(void 0);
        setActiveConnectorType(void 0);
      });
    }
  }, [account, rpc, preregistration?.id, setActiveConnectorType]);
  return /* @__PURE__ */ React6.createElement(
    Web3Context.Provider,
    {
      value: {
        account: account ?? "",
        setActiveConnectorType,
        connection,
        isConnecting,
        gRPCClient: rpc
      }
    },
    children
  );
};
var useWeb3Context = () => useContext(Web3Context);

// src/SSOConfig/Concordium/Connect.tsx
import React7 from "react";
import { Button } from "react-bootstrap";
import { isDesktop } from "react-device-detect";
var Connect = (props) => {
  return /* @__PURE__ */ React7.createElement("div", null, isDesktop && /* @__PURE__ */ React7.createElement(React7.Fragment, null, /* @__PURE__ */ React7.createElement(
    Button,
    {
      type: "button",
      className: `fw-semibold text-white w-100  d-flex align-items-center justify-content-center `,
      variant: "success",
      onClick: () => props.setActiveConnectorType(BROWSER_WALLET)
    },
    /* @__PURE__ */ React7.createElement(Image, { src: concordium_default, alt: "concordium-logo", width: 20, height: 21 }),
    /* @__PURE__ */ React7.createElement("span", { className: "ms-2" }, "Browser Wallet")
  )));
};
var Connect_default = Connect;

// src/SSOConfig/Concordium/index.tsx
import { Button as Button2 } from "react-bootstrap";
var Concordium = ({ connectWallet: connectWallet2, setShow }) => {
  const { account, setActiveConnectorType } = useWeb3Context();
  const { aesirxData } = useUserContext();
  const [connecting, setConnecting] = useState4(false);
  const walletAddress = aesirxData?.wallet_concordium ? aesirxData?.wallet_concordium : account;
  const hanleConnect = async (address, walletType) => {
    setConnecting(true);
    await connectWallet2(address, walletType);
    setConnecting(false);
  };
  return /* @__PURE__ */ React8.createElement("div", { className: "py-4 px-4 border rounded" }, /* @__PURE__ */ React8.createElement("div", { className: "d-flex justify-content-start align-items-center mb-3" }, /* @__PURE__ */ React8.createElement(
    Image,
    {
      className: "me-14px",
      src: concordium_bg_black_default,
      width: 40,
      height: 40,
      alt: "logo concordium"
    }
  ), /* @__PURE__ */ React8.createElement("p", { className: "fw-semibold fs-18 mb-0 ms-2" }, "Concordium")), /* @__PURE__ */ React8.createElement("p", { className: "fw-medium mb-12px" }, "Address"), /* @__PURE__ */ React8.createElement("div", { className: "position-relative overflow-hidden fs-7 mb-3 py-2 px-3 bg-gray-100 rounded border border-gray-stoke-1" }, /* @__PURE__ */ React8.createElement("span", { className: "fw-normal" }, !walletAddress ? "Not Connect!" : shortenString(walletAddress, 20, 6)), /* @__PURE__ */ React8.createElement(
    ButtonCopy_default,
    {
      content: aesirxData?.wallet_concordium,
      className: " border-0 top-0 bottom-0 p-0 px-2 bg-gray-100 position-absolute end-0"
    }
  )), !aesirxData?.wallet_concordium && /* @__PURE__ */ React8.createElement(React8.Fragment, null, account ? /* @__PURE__ */ React8.createElement(
    Button2,
    {
      disabled: connecting,
      onClick: () => {
        !account ? open() : hanleConnect(account, "concordium");
      },
      variant: "success",
      className: "fw-semibold  w-100"
    },
    account ? "Connect this address" : "Connect to Ethereum wallets"
  ) : /* @__PURE__ */ React8.createElement(Connect_default, { setActiveConnectorType })), aesirxData?.wallet_concordium && /* @__PURE__ */ React8.createElement(
    Button2,
    {
      onClick: () => setShow({
        show: true,
        data: {
          wallet: "concordium",
          address: aesirxData?.wallet_concordium
        }
      }),
      variant: "danger",
      className: "fw-semibold py-12px py-12px w-100"
    },
    "Disconnect"
  ));
};
var Concordium_default = Concordium;

// src/SSOConfig/DeleteModal.tsx
import React9, { useState as useState5 } from "react";
import { Button as Button3, Modal as Modal2 } from "react-bootstrap";
var DeleteModal = ({ show, action, setShow, data }) => {
  const [loading, setLoading] = useState5(false);
  const handleDelete = async () => {
    setLoading(true);
    await action(data?.address, data?.wallet);
    setLoading(false);
    setShow({ show: false });
  };
  return /* @__PURE__ */ React9.createElement(Modal2, { show, onHide: () => setShow({ show: false }), centered: true }, /* @__PURE__ */ React9.createElement(Modal2.Body, { className: "py-4 px-2rem text-center" }, /* @__PURE__ */ React9.createElement(Image, { src: warning_icon_default, alt: "warning icon", className: "mb-3" }), /* @__PURE__ */ React9.createElement("h3", { className: "text-center mb-2 fs-18 fw-semibold" }, "Are you sure you want to disconnect your wallet?"), /* @__PURE__ */ React9.createElement("p", { className: "mb-4" }, "This action is irreversible, are you sure you want to disconnect?"), /* @__PURE__ */ React9.createElement("div", { className: "d-flex justify-content-between" }, /* @__PURE__ */ React9.createElement(
    Button3,
    {
      onClick: () => setShow({ show: false }),
      variant: "outline-light",
      className: "border text-primary fw-semibold fs-7 px-4 py-12px"
    },
    "Cancel"
  ), /* @__PURE__ */ React9.createElement(
    Button3,
    {
      onClick: handleDelete,
      disabled: loading,
      variant: "danger",
      className: "fw-semibold fs-7 px-4 py-12px"
    },
    "Yes, disconnect!"
  ))));
};
var DeleteModal_default = DeleteModal;

// src/SSOConfig/index.tsx
import { useState as useState9, useEffect as useEffect4 } from "react";

// src/SSOConfig/AesirX/Email.tsx
import React10, { useCallback, useState as useState6, useEffect as useEffect3 } from "react";
import { Button as Button4, Form } from "react-bootstrap";
import { useFormik } from "formik";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

// src/SSOButton/images/mail_logo.png
var mail_logo_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAADpUlEQVR4Ac2YP0wTURzHv+/aMhQ0dcA4gJZRGMCNjbIYRjGUwgYDM38S4widHDBSBjcVnJBSIoMaYaEMJAQTgwkw4MApbULCwCFQE8vd8/cetoHSlrv2bPtJ2ubuvZf79vve+93v/RgKpK5rxqcwRzPn3AcFLYwzDwf3iDYGphngKuNQObABGCuxSG8UBcCsdPY+mvIYVe4hcDaYEmPhQSSWRR1JPagu9KoWxpkU5qoeI1GDsAU2bVbotQLvdr8jx5RRq46ZeLAKA2M/5wNvr+mXR5w/HLLPtZwKQnvhwHDu5iyIKdVd1e8B2gAlQGykk2SiXVvo1zLblGwDDJd7uVTiBORSS4005CpXBJ5PK1pQYhgZUt89O5F533Hxot4/00ddn6F8tHoaHx8dbc+vpW6k16C3Z8ZrGMoy5/CivGjHyURDaj2mp1jXHaMVIE7guVHlHk1dSAeFe7qu7KKCIBdvCRelg8I9VBg1TreMv1IgY6ULKWZhDEPyV2QljCnLZgcO+5vkpxAm5rbkxyycG+1OMrENFhDitnYPMfB8FbGDhKkxN90uzI755FgrAsnGZoVyN8tBefFLnB7Yjrpa97V962qr8Xn8IRbX47AK5ZOUczLroSUU2cabjztSZOO93ElOo9eDMDn36sOOHGNdIWuhKS4s9r3+9B17NMXhYDvGpr4isvLjUnuXz4uRriaMvFzH2vYBCsTjLCbPW6Kp7niyhPCoD/W3a9LrS6y1rjYvuoPLptdpToEoktjBKQmJSpGCm9UutN6vRaB4cRKxSTQUiRDZ8XRJrjmxJgMk2A5xhObkjGuUMRadzv86TWJgfBV2QmmfqsBgG6hQGOeqCDNRWEQE3lKMoWPqhtPg+jd61Zke9CK8ic3pThSCGGsJxqIy3aI0/9DuY6UNqHtzgYZz6zgPoeLgUfEtBSpnVZOoMJJJHhS/UqC60KmJAzQqBj69/68skt4djj9VQTuCtg2oKfcEaYHCRZ0bQZQZg+o1+xeKSpfiSzzSEyrrVNNmjWcUk7LWZur94ZKWPgSiPhObCzzIvJ81QjuSrk5ajyV7BVKVNiqKR9na8pbfZK2En5+u/hs0rXuRnpzlt7zvOFG3M2D0099QYTtMo7fXUD5xshdMcIcqDy6d0eGe9cEOyLXjs9/BbPXATCwV0dNCGfPBch2HHCNhJ2eJSTPCChJ4kTp/uI2c8IniI6eTIW0qL9IJhwj4BiXCbINTRgK5Q7tXUAB/AXHFfj1wiRX1AAAAAElFTkSuQmCC";

// src/SSOConfig/AesirX/Email.tsx
import * as Yup from "yup";
import { debounce } from "lodash";
var Email = () => {
  const [updating, setUpdating] = useState6(false);
  const { aesirxData, getData } = useUserContext();
  const { jwt, accessToken } = useGlobalContext();
  const debouncedCheckEmail = useCallback(debounce(validateEmail, 200), []);
  console.log(aesirxData, "aesirxData");
  const formik = useFormik({
    initialValues: {
      email: aesirxData?.email
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Please enter your email").test("unique", "This Email is already taken", async (value) => {
        if (value != aesirxData?.email) {
          return await debouncedCheckEmail(value);
        } else {
          return true;
        }
      })
    }),
    onSubmit: async (values) => {
      let updateSuccess = true;
      setUpdating(true);
      try {
        const response = await updateMember(
          { id: aesirxData?.member_id, ...values },
          accessToken
        );
        if (response?.result?.success) {
          notify("Update email sucessfully!", "success");
        } else {
          updateSuccess = false;
          notify(`${response?._messages?.[0]?.message || "Something when wrong!"}`, "error");
        }
      } catch (error) {
        console.log("Error", error);
        updateSuccess = false;
        notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, "error");
      }
      setUpdating(false);
      if (updateSuccess) {
        await getData(jwt, accessToken);
      }
    },
    validateOnMount: true
  });
  useEffect3(() => {
    formik.setFieldValue("email", aesirxData?.email);
  }, [aesirxData?.email]);
  return /* @__PURE__ */ React10.createElement("div", { className: "py-4 px-4 border rounded" }, /* @__PURE__ */ React10.createElement("div", { className: "d-flex justify-content-start align-items-center mb-3" }, /* @__PURE__ */ React10.createElement(
    Image,
    {
      quality: 100,
      className: "me-2",
      src: mail_logo_default,
      width: 40,
      height: 40,
      alt: "logo ethereum"
    }
  ), /* @__PURE__ */ React10.createElement("p", { className: "fw-semibold fs-18 mb-0 ms-2" }, " Email")), /* @__PURE__ */ React10.createElement(Form, { onSubmit: formik.handleSubmit, className: "text-start" }, /* @__PURE__ */ React10.createElement(Form.Group, null, /* @__PURE__ */ React10.createElement(Form.Label, { className: "fw-medium mb-2" }, "Email address", /* @__PURE__ */ React10.createElement("span", { className: "text-danger" }, "*")), /* @__PURE__ */ React10.createElement("div", { className: "position-relative fs-7 mb-2" }, /* @__PURE__ */ React10.createElement(
    Form.Control,
    {
      type: "email",
      name: "email",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values["email"],
      className: `py-2 fs-7 ${formik.touched["email"] && formik.errors["email"] ? "border-danger" : ""}`
    }
  ), /* @__PURE__ */ React10.createElement(
    ButtonCopy_default,
    {
      content: formik.values["email"],
      className: "border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
    }
  )), formik.touched["email"] && formik.errors["email"] ? /* @__PURE__ */ React10.createElement("p", { className: "mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center" }, /* @__PURE__ */ React10.createElement(FontAwesomeIcon, { icon: faCircleExclamation, width: 14, height: 14 }), /* @__PURE__ */ React10.createElement("span", { className: "fs-7 fw-semibold ms-2 lh-1" }, formik.errors["email"].toString())) : null), /* @__PURE__ */ React10.createElement(
    Button4,
    {
      type: "submit",
      disabled: !formik.isValid || formik.values["email"] == aesirxData?.email || updating,
      variant: "success",
      className: "fw-semibold py-12px py-12px w-100"
    },
    formik.values["email"] != aesirxData?.email ? "Update Email" : "Connected"
  )));
};
var Email_default = Email;

// src/SSOConfig/AesirX/Password.tsx
import { faCircleExclamation as faCircleExclamation2 } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FontAwesomeIcon3 } from "@fortawesome/react-fontawesome";
import React12 from "react";
import { Button as Button5, Form as Form2, Modal as Modal3 } from "react-bootstrap";
import * as Yup2 from "yup";
import { useFormik as useFormik2 } from "formik";
import { useState as useState7 } from "react";

// src/SSOButton/images/register_success_icon.png
var register_success_icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHsAAAB/CAYAAADPVr1pAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAADldSURBVHgB7X15jF3Xed937n3LvFk4C0lxCSWNHFlWSC+SZddpmjrjJDCCLLX6B92mRWAbSdAEaFI7KQq0TcIhirZIAddJ0C2oEztGm9SmizpNggCNE7F1Gie1ZVmORdsSJY1IiouG5Kxvv/ec/r7l3HffcEhR4nBEKjzS5d3vu/f8vv37zhmiO+1Ou9PutDvtTrvT7rQ77ZZqjv4KtaWl3kNYPTQ44haIKgvT07x+/bfXNdhLS2EqqfQ/EMjNYZeXqatc+tXEuV/ZMV75LXodt9cd2EtL/TmqhEcdue+hIS6+jubcQkI0/3oF/bYH+xVw73U359wnfT89+noT77cV2CEE5tS3NZu5y0O4Nyi4c3ST2usN9FsabIDLXDqXeZrz3n8gz8JUPw84TtvXINpDnv3q9OTIr9Bt3m45sAHwLFbv62fh0dyHuRzgZvl2onuV9jrQ56852Ma9D3kGuOcf9T7Mbjv3vrL2uZBVPnI7ivbXDGyAPAdMj/T6/iGfh6lbgntfQWN9XkvDbzUa1eN0m7RtB5s5GbB+ot3JH4Woptu5Jei9Wi2hejWZx+5vgQAW6BZu2w62D+GJ9Wb2kL+9cR5qCnq6UK+6eQB+y+r0hLaxgas/1urkryugufH3dLr5LL7tkzAqn2cVRbdg2zaw0QFHOj3/4ew2F93XaqyW1prZLFTUY7BBPmGexS3TtkWM46Mf7fb9/+h0Pf1VaWV9DtF+lG6BdtPBZuqGr/zEeju/4TDmZm21RbRjlG7ZVkkdNUZSJFrob7/WBtxNFeMMNPzmx5qdrQf69CWiD38yoQc/UqF3/bNU9m/Fxi5ls5U9BF3+mIV7X7N2Uzk7zz1z9ENbHSBhbv6lzyT0mS8O0+rP/7Cnn/+RW1dVjNaT5Wo1+RA4/HP0GrSbBjZb3s12/uGbGSz59BcdffT3UjpT4uq7dwb67M/nWNMt2Qzw9wDwr9I2t5sCtlne893ezecyFt8f/b3bh8sdenyskS6niXt4u3X4loMNoN8HoD+3HUCX2+3E5Wypj49WjieJew9tY9tSsM3y/gr09DS9Bu124vI63LKRWvJhcPev0ja1LQNbLO8QHltv5bOvdcbqduByFucTo5VlcPe2McaWgM3JDY55NwH0doRCv35aX3uyARB3bf6DtwOXG3c/Cu7+XdqGtlVgf2y9lX0436Y+fO+/SOnrZ4Zf/QA4l8GPARbm4MlGoD98MhnicD0X6Dd+2tOb735tRRDr7omxyicB9odoG9oNgy2WdxeWd3/7uIUDKexrb0XbMRpoR4MKQuFFJMZOJYQDuzYQ0QzO8z1bFLXbMbZ9ovyGwAbQH4Dl/cnttrxPX3K00tbgCi+8feaiK86t2jnd5/Nuy4ij3JhQPvtzNyYhxhtpSFM3A+5eppvcKnQDDYbYh7cbaG7MdXdfcfTlO5wBP3XZ0cc/767Q5cypP/C2UBBKJCImnqs/78a1IGJOLtXy55sO9g29bYaAL6xvuh3bK7XYN5MmTBg/+b03pvcRYOFkyX3bEWB51WBzgh6c/dhaK7uViwOv2W4Fi318rBKQGHv7doRPbwhsrB4DcxNi4Lct4NxeK7/cImnsc9/6nI3VY7yNNCbBUKPbuYDwalz+E9/n6R+D029GzrxakVw3gzC9HQbajYDNRsVS+Ri7X2ywvR65/GMf9PRdD2zth41CX1dTtwygbwvXizl7rnyMI2g9gM7L602XbyWXw7emUXB1mtBxgL0tCZEbBZuHxR7X7eKYAJ5lRH2E1PxtXEr6Z087+vAnbw6Xp5WEGgiX4ilHwd3ztA1tKyJoH8TqE7YtQDPAfYDd6eGjUj3u6PYEnd2sj/5+Qv/5j7fOYvfBUQVgj1TBEL3s7WNjtSdoG9qWxMbb7fZ9tVrtCB73AeZwttC5ZLgNsNc7PDAP/uQIyce523REeORy8a0hzn/ye1+9OG/3HNWrjq3xJ6cm0odLp24qR2xVIoSrZV2z+QsfrFbdL3rOazNnQ2+3OswdgVawjI442jPF5bWss+i2azHkeiM6uwsmWF4nWOEJtZr9n3hw9pd5BAlExJFQguOmgL4lXR65dWzsC5966KH//qaLi+2fyjJ/ikV36nKqpZ4aFU/LKxk9ebJHz57LqdO9/cR6TJTcSLu0FuglLOcv9U49OPup3yE6yBgkDHQQw+fm9csW8ZcL8/NEjzzytDtxopkcOPCZ3z527JlHLy22P+7wAZXEUzUB6AmibVmfnj3Vpj/6coueB+jt2xD0V9uWm55euJAB6C594csX/w1XlSOFkx48SMnhw4cTlo43s+B3i8Q4j2D9THLw4Il0aYkq587tg6BuQ0uHxk/8g7e88QM/duhnp2ZGfrgJ/b3SzCHGPHQfIm/QXXt21uit3z5Ce2YkRkyv18YBp+cA9JPP9ejk6cv0B6dap1svNH/k+f/y5WfhcWePPNLLH398GhrwsEdn3hQOSOnGmzt6FM723KGk2STXao2llUqz0u1WAHha/8rji/1P/Oa3vjQ5WT23c3fjO2Cvj7U7fepggSVKlyDav/FCj5odFpGpGi7J6w/0JRD4k8926dylFv3+Yyfo4vMLk439kz914Affunbh+Mn/d+7cdDh8mML733+IvTG6GW0rwBbO/tCH5pLFxRkAvivpdntInbZqPNoJBlvd+2z0i3929tJ//dTTX1gdHTk0Vg87axV2O3LK4ZAH5PkWl3J67hwnVRKamkgklPh6aczVz5zp0rdOd+j4X5yiZ557kUUh9VeXyVXT77/nfW915//kj79w112L4Z3vXIQqPHarcrbI8OT48YN08OC4S5IsbTZbgBIRfsqq3lcBelIDt45MP7z/u863ej/4pT9foOZ6n+6aGSEOKwTvZen3A51ZzOnpM7n4ojM7kttetHd6gZ4926MvP92hpaUm/eGfnECXZZoFAeDZ+iq5Svo37370u1f+/Dde+osTJ56HZX78VgX7KB0/zlHTE273bkoWFtaSqaks6XS6ab0+WslzD9Dz+vh9Mwd2HNrzC60Xz9WYoxcWVulLj58nn3naNVNXUEMuYoJBP70Y6FtnOOTqaGLUITgjfukt3Xj0S6tLdHk90NnLnv7yBU9fe75P33wBKqvbo8f+9Fk6f/4SOXyIY/tb7HDm8DVKG7X33v23Hvw/5//4689bUHLL2xb62cfw6ktYvglw74O+7o6MjFRHOp3q2M6H9j0w+fDeX19/bmFPtt4lDzA9KN7DD+ft3VMj9H3vmaX7ZpFbSXB7WtOlwksVLl0VBlyF3nR3QvfsTsSGfS31OoQQ8SQ/HCVcbjpaXEXwCAbn5XUH1wqxhZ5dBA52OXZ8j9ZWm/Trn/wiPs9DzoFwqwlEONZQVw5LUqvSzMNvW+6uXb7/m//6XZfpJvhgN1SWNNxOmJP4ViwgadqVdzpgYcTSdr37vl9e/dYzewIiLQ5hQoeOcPjlJDi5Y/Fyh37n0ydo/74J+r65e+nue6Z5VCDJ9XmN1qHXm+spPfdiyjVbtGc6odl9KX3broRG6+D6xN20II1GAwEmOHYNQRUG9hKWZa5WQaCoB33M7mUMCcs64PN9ruLaK9j/98+eF7cz8It6/e4yuQb8yNrJk1PTb3vLR7H7QboJbYvYI4h/ODc3n770EiUnTjARqft18J+89182Tz3/452LS/ggdAZzdX/A1cHWsp2xP57SW968m9797llqjDGHI7mfVNFJyPsmzNKpyj/uNOi86R0p7cQyM5nS7smEdk4iRwzOcaoSRfRfSwp4I1Eug/YW6l01UBncJUS7LqwEiQTCsGA4NetTXvgY38wgczAMa8cqyYNYQ59W8aD/+PEvgZsDJfUEQithK0Y43Blnu1Tfeeptb6H61Njbv/yzs1seL98iztboz3vec5ROnNiHr6753btfyPf+w7//kc75cz/eX1sBRo4kbRBiJIf/ReeJ8vKCDAxx6GtPjz9xnr72tZfokXfsp4cf2kfTMw3isjzhiqjsbPtyD8slSIvS8Ro6cRxuXA2icrzhZA2vQCzgGO6LWbpmV7cZVOZSdgGVOxXEEKkh+BKgBrJnTlZwdWHu1u0AsNdWO/T0yUXYJmeU04kLFSxuIq70BiLEu7VOnaba5Js/gL0tB3sLh//wuzJcxxwiQmn17z78aPvihU83Xzit/cBDd3kyOyyeOdyWnPPeJc72fZI1n/O4toq02b33TNLDD++lN7xhGio8RheVs4v1BkJwts/E5IbOSU/LPbwVyh9wBdd6AzOYDg4FqAOAYZ10+7Sy3KHTp1fp8uIanTqzRsuwvHu9Prg2GBeDo8HVyciAq0VvszqrqAgSgw3vtfuvf+fyV37u3i0vaNjKsV7yLDbU3v6v3n5fv9f+0tJfPjWlhB4orsMmgPso3jMDPh7vD67nBQYfPfjgTnrj/dN094EJGh2tKqARPAFX11HMX0EELhKBKzpAeIz1LpXBDGI3DHM1RPxaj146vwZp0qIL55t0amEZAK+LfaGAmcFVGF6uADth+0LWuq/XkYjwMtg73vRGGt154OEvfeSuLS1C3DIDTUN8wb3j37773qy3/kdrzzw7Jf0pMjuKrrjgo3G5T9C9Ccv1uKYN+0YQuYrTLszfJ792gb4KMV+tprRv3zi4fgcdODBOO3c2aGpyZCCq449vkAChLA3UpJL3D0Oc7cGtOa2udATQ8+fWZLmApbUGb4INzJj9kZ8CUMyl5koJgBU3tPCxJFWAXeKG+kIJ1R6Glq03ie6Sv3pwa4LNjfvpHf8u+9nmMwuzea+rB4W7gqmokr5y6jcH++gguIDjUlyL6z2vsfC+SAJWA2kw6eCgEeCLv7gKkblqABHV6ynt2jlKMwjWTE7yUqeRRpUmJmpg6hQdzvo8ld/u9liF5Fo318lo+XIbordDLfhNL11oCuf6zGriI64RzCRaf/Y5Bp6sxYYsgVyLXJ4Uhhhf41K93rlS7sPWns1/XKQu7dbFybcEbH0pEqUdfu3MQ/31dT1RiErloEi9rgSydp5xsBtwNANLlSjSwUnsyQBkBZvMONJ9eRgkbQ8m9dkL6/Tief59VR1UMpjF4LpWFnFgv+luxUUBMCBUogFAbrCt2oGBdMNgs2HIS83W8bwzsZ2EYcD5EDyQbt9NWefyxVsC+A2DrYYZqd/ogntrb/FtSX2E8k53YAA5BVys1cTuKXouFGLM88fn5l2hQ5gAHHLhHkZaFOVi5G20A/hHvL6MgqkEENWvC/Gc/aqdlxPRKC6M4wExFpI6um5J3LfrTMeWwRYXysAWUKtRjCeFHicjiuJ+ovjjSv8jI3SxNTbljmJ3nl2VYK/two1U+rxqsKOI4f/lwFG1cfb+zMTUrnsfJP+tr1Le7Q5uKOkkaQkV1C1RUrOluCO8cXjg+rU8FYu2MNRKhp7aTga6WMyKWrCgRRgiAGdOtTJLQYXl5gaHksRAp6jeh7lcgYqmQSKqR4giMbFtoAtnmxEmVrccpwLowTOtX7HUpiahVkbd/BjREQPaBGdZ7rxibn/VYEeDTF6QueeoLG4Pts88d4Bm9kFftr9JnQsvlW4qr5yIbQoq5IXac+U27mgBNo0gkwApIEewC84ms5TLXD7g9hBKRGEgm0Tf8EGlzaT4RuVmVxbdbmD7DXF1UljUBXdHYMuiPTFdXzbSaCBc0pE6tbs7YUckLzy1gJ84jFOH7G3n7dVDGfjrB/1VCAWTf1Em8k8B5MNP6bP+dF/75MrFxixvT+5u0cyui9T81hPDXE406OwQSi5uEDGuXEqFfo4gF4EMu6YANJ7b8IzBeeNoI4r426pOStwbe8TALbyJsm7eSABJaR1BLIv0EgGQRclk2w3UQTnAMv6GN9By9yCdS0a/n3bQ/6an8HqHSqR5xLaHkLs+wF8R2NEQK/T0fOl+gD13iNxz7fVfvHh6/JfK9zHoE9VnqXfhOdHlGx5q65IhFSLItl2sNwAYSvfZuUgoA26mARGEEvAloIuOiLwSuTihK4yxKL4L/R7FcSSAxA2pKNqQ4SpUV2ETuOJ3mavHHniYTj57D3Un6K5H3kzLj5/DKwJw7tvj+mXajqg2Mim5tWAXFrfs6Gr+qN4/b0AfP0vu/nvXpy4v1J/uNKtDU1hW6zntOrBGVYj25gunhjo6PjNE+bpBBJeBK9Zlwth4jR0v3zt0vRmLV3RGufMNjIKTqQQ0Dc6XDbSBiB/o4rK4HhDC4AfL/TB27z200n8rXV4bfbI7Ru+i8xQemabwOJ98GpftpjAPLp+PL1xw+fWBfd0625X6x5nY5h+OHH2cP2M/Tp4fX9159+oPnH+m8uk8d/fG+/vdlM49OwXQ30kzs7NUAehd6POw4TcoBjpY10UdG0yPBz2msWuyc07j2GaEDblZRjCFevM0UHrkhqmtLMapBFYJ0OIdyyDbPYXFXoh7Kol7oiFjbBMeY65OJ/fTyjdGKZ+kPwAyCe0l3+ZRpGdJRlHuxvLUUwMdPuDs6Fpcu103Z2tP2qZxNB0E0P8BQD+A/f1YkJc/gJfsI34xMX353ubF+j9vLY/8PQZ6Y1N9vkjtZ79O/Waz/DtEoSRCQokJy2J7g/gXDglh0/OFGC/vx+1CadtOAWAJtKKnSsc2cGdRpzuk30v2QIkWwibdPvHAA3Rp5UFE7UYIAB+kFr1AYxTuz8jXdlJoAPCJ/fraxyHWDx8mOnTCuPyIkW/x2M2BvyrYQ2I7dgw3Blqpyz0Csc0i5uASuRNj+Nxpcvua5M4xVQLwKSz9Vbp3x1jr91Yujd692e+oPj9JvfPPX92IG7xUeVWI6mBcWgBuwZMoBcrPGSKEK7R2KHrsCoMtHtwoAYrtwbXF/W7DcwerocZc3XjTd9MLJ3aSH/W/3WkkP70bmwlC7skqhXqP/MIERDoitSLS96seLwy3kji/VtTt5cG2vnLGzSy+jx2y+84OOFrEDoDejfXiOPZ7ks9LJhBLWMsond2x/KPrlxo/11quXwF6WZ+3Xzxr4cLNXmqTnShwyjq4ANRdwdG6qaI9ckO0FYaoewjk0rGyr0QD1VM83BWi4rrl5sQDb6RzF95CnW6F2nvpYerTwswk+cuLUDzgbOZwWsIyi+2z+kNzAPx4CfB5XuaLl9gU7Jev7zg6eOV5LMd4g0E2oGf5GRHo/QAa3CxAT2E9Qukazo5CHS10pz67Xqu/e+pA89cY3HKL+vzcpXdScuC7aGTPXZu/iysvJieLPIcbXjjpYD5uOaqlPu9wximxCNfG66K7NIh4RTeKBhZ2ye2iGCN31w90imhZN7mPuq0KhRH6b+jLFwF2enkFT52gdNcU+hJ9eqCpTHVwvy7H+eZDKmXnsXnkCFlO5+q6+ypgqygIBrAz0W3GgXwGi27+8WwF60nl7PySim9q4N8upWPgaGoj+psJl1c6WC5lY/++Ptt578Tu1v+s1K4E/cKLe2mVvpN2vPU7qTo2RtfV3IalcI8Gbk8Bki1khEBXHKNBYKTsM0cCi0mQYrEeK6Eb6Prb6D1308UzExIt7EzTx8DJ6TikIUtF9KG72Ca3C/tnDmkfn0Cfn3iKlOHQDkeM4m8H2szRkHYNzg4i+Z86aDr6sB5lPf0I1if2qjF2hoF+iZKZ3ZRc3onngaPH1ykZxas1GeQxGN7gbuidCoRQ2q1S9aW1sQuXa6NHm9X0fTv2tM5t/OW1yyP0/Dfuoc7k99IIQq9pvU6vuF0hAaJcdoW/q8RggJWkwpDr5OgKi3yrGutq5momcj9CnwXQ55g51gHuOPpuBwOeWQUw+piZanYn3Nu9AzUqKnWeVALLKwY3HFYd7pJNml0cqIiOifieNuKoY71TRLmI8F3Q0fkyJUtjeLER1dUNpkO8eAS6m2G/gnO8AHSEjCv9oBy/t9H8of5y9QPt5drejW/CIn/nvnWq9b5BnfMXrjTibuO2400P0JkX30K9LKX+LprL+nRqJEHcKaV8rEFZcw09VaF8Csm/5RrigsgJHXiBfAU6nA02YBCATX7Mnhc+o9kBaWpLDPH41Q00ppB5Oz8vS5QCCS2o5b3nIkT3PkouAmiaEb3N2jthHd1isHOAaRxdq1La42OBqqKFGHzdT+U/XLMr7fxY+0LtfSFPrpDfDDq7auyf95dXbmvQXaVCjX3fRu30IF18cYKyKfpcL6F/Wq9SBibPxSzj3uti4XWL8mkcXYKxtqdP/sIuM9x2iv/tj/NDD6In4YqFI1qfsVmGbBOwgwslFwGBeAEZkZzEzH43C8AXGHSIlmkYEUuczYRRIboaYqcBbg6AtAOga32q9BLjamcA41NgA1WyCHZFPkm2J0e6e6tt+ju95cr3ZL0r/fMIeqN2jlqIxN3yoMMKdLUGuZEJSMQd8KemsExSuzVKnfUqhRpReyr7wZqrnOr1Ka87keoC9OgE5a1V9NYY+ckq5StNHGdSuAsLW+IIuuA6H6Nr5YSJYvgynG1uiKg0OO5JdLNYV7ejP10zCzwVcZ7sgOW4mgl/ViC+k3YN3OuNqxMD2Li64hX0zBnAWMM4TpHc4kEfFV7zkxvB7xnLev+odXHkns36kEEf3dGlUYCetE/fEtwe2LxvIORVHYWsnaQ82UWZH4crqQj67EoTqb/Lf5yqyX+CSsuIF4hx9FsffZw1wL9t9NJ4h/J17i2Ic2JxDv8bqjSfXTJxDsDZFdsNAjjE4dT5so04AHxTMT4/H+QviUobWOCJ+NNrWHYJIMk0gIWSSFb6ytF4gXSkA66uU7XLIhzGWBWc3QeIoqMjVwPkjM/qfhrFeYqn5qmJf6e6f6ba+e6wkv5wd6V61ennGPixHT0aqUHMBzin68vUX1m5ur++BS1URhHt2Ek5gwrWy9Pd5D2QgBjzUlHz8tacHwnn+9PuZ/KMTnNPVAF2n2VkkF5h7u5TWay3VKxzwGVRkyKyPGLRtePYnif1t4tk1bXBVuMMN4j/JsbZtMS93f0Au8MWuEBt/jRE9zhead3Ed5u5uSrEUKl5qvaMqyvg6izq7BJXkxlpRLZNwuFprvUAqdeahmSm0vmh1osj78I1M/QyrT6a0ch4D5Szgs9vYb1KlLUo9NpgJfgyWZuup/lkFL9cFUARLYD1M0aZmxJwGVjfvz5Qr9b6u/2n+knymwxutUb9fg+gRrCxHsHa5VgAeIL1Ogw09F4O3zTfMwPdDTLgcOrJjaJcODvWGwzAvmoiRFwuKPxFcPVB3MH+XQYLPIc4h6OfePTZ5Uz5b53XdYj5jpj/iYhwriKDnq6CCPrYzgKP7cDaiQ+p4hvHcidDt1R8O9HsCW8nCrz4m0hauYvZyP8avzv7Cj70r7m2e0feTa9aV80BCl7gxRbHhHKqXr6YCxnFk8p1kpSiNyyxEiAruVdjbZskVLpb53f5Wmj6RvjdfiX5bZFiKYV+RlbLLBZ4AOQ8kNV3vNg0YSwR9Rk4Vz8zRu7CBVy5i+gkJO1BBFxOPEAkiagi13Nl2PSqnC3nDpu+ZuOMgyjQ13vwchf2mdPfM/Hdha7GuXbkWl7XIbrRYyK6ezLcupIFWxP3pHG2L0S4AA42Tr0XItTfIKlHdN6ZKsF2LfWj9Tx7s2smfyNvpftuhLtuauNhXdXQQvTtVEjCKWw/HyrJs+jh8zi3wgPhIiejX/rQOv1qxUQ5tgsuT4Qk+qK7M8pmIBeTBoWLSJAdWKGwA5rkxD5c+Xn0JnP2VVKfQ5y9sSgBIpwWNX0pnMvwXIgGMgxMGApubBIRMmyHTAw2hsRBfDtYlgmMDgGMo5HC0bgiy83Vwjnh7EQ4uDDMKHK0DicWgL1KC7VusN3zSa+X1J5IJuiJ0Z3d/dVW8rBvuzeEbrI37798BPhmNKmTq4UlgHoyT5Izrh4ugnNPgT05wp0jUAOB63JhDzXGUqmjZI3MBbRO5KHvs0vljNCx1NFPiFH40Z6En9ndcgFS9SLu2YP+R1BrUNBwyIL0bpDQG3rH4d2B2yWWOB8yfQ1N6YTGEEiZQSg0RwCFQQisrztmdfPClnhfnKkqczReUNais6siuqt5LkQm3J16DbXkZEZZrqCznvYKui786QY4B7h4NE4SjBhIr2pUsmnXcrMQF9/hWykr171+i8FndRCqoRMq7hze/Jyv+LNZGs45l1zG6zW9M1EsAhccqHMAZnIM8bCUDGxHOQi8B8Az9Ec0ynpQe33m7BoWMExffG+2zqGzgUEmvjdvM5HAIj+A9Zn7YKR9nfwblhT4Y6K3Y1XqNXR2wdkHNe763OeJxL++jGOwdzheK7qawx49cDZvs/AORTyXAHBS7YKzOd8AOoXHAbKGqsxFH+t1iXJrXhEQRdeLuFbx7XwYEuFKr8EEu4LsPBtx/HlWs9jtVVZ8hZ4ErTzpp/BxDga66+9L+8me0A9TePg0rOU6njkFsTI1RAil5JgMTiCHUFHoeJ4tuOqX8TpLVPfLAPa895XL0qvyRmlIchtHouMHZMCIESsZIabGc2KP8OGUx0Gwy5nLJZKHyeKVQZhI+km6ExFK14JNtIwjDcVgBrkiZMXcGe7/ZxSjCezPzZHXiNqVBQ1DnD0Yr2WAH8cPPqBZlhaiZgvRv9aYt+jrMYRHPdb42ionOpirES2r9tScEB1NJUsclnaNOVt86gT7viTCjbOTKM4T0VbOq0iLRZ9isMl/BnSiKLkCgEgUJUK4QqbZsYrzIy5FZJr0+jyvLAmx2bPkMQKHjkbyg/t5UKm3d1HjKlGRzANaSA11CXEmOiJYuDla2mmQiRoy9EM/dyIL++Jfk3B5j6+ppTI2sC+uF/ZH0TutXIIsGZhPQqkSSdtvbthxLGaRhyNqkZejaMkwV28Isc2RJMpPYLUwq4e4NAZhUXbq2WgNXGPSBmd37JYa4uY98ZAHRm6mHcn1/i7muXL7Jx8GQGCVN09klGvwiQFIUlMo4rvo7NjNpLjGal7rfl0raFdmfOw7s5B08qyyzEvfV5a9ShXtnCDbIQ7092GQQbXfFMlT+i0xIL0zdROMEBM75zWZxtu5GaC5DQETc6wmJebxeupB6tWdhaXsmTROwtnT04YF57oXiOMhAlfxeUeH0/P62KE2nC05zCG5s8M8sag/oCJ9Y+vyEByJAMoLSWfqJAsDfaHDlLWlkiYOsWMEQK/cJD2ZDrjWOGdwLH5AYpxOWmAaOc3uIxthE67ywWQ/VYwdl2scxWKHQAZglBY+vo/TcQEUCcyGZid2HESZmEpKfSjGEMiz0miD2LMg6YQQROV5VWs8ThCJJMdivN4ljUKwJxlHVrUG30SzxLZVOD5X+igJrAzjOfTtISa/zRqP2RQOpgj17C9dPEIO0V5R3SJ4uHEmEgKYAa8mAo4sMtwa6zwpYNPrcxmvJ8f8QPTJPtcXMmebULZ6JJlUyfsBp8tgWor3yOsXnM7HdZbkEreKBFAgr+wAN7hG7h1wcKmT7B1NyvhSIlsMRye2xPC0H+Y6RkJhmZ5GaRBBZ53NIhBma5VnK/bC6dJEb7Mgbyljy2PATFIRxO0ShfshUR85S9f0QTeIcXmMC0OxVYhmZFdmZ0sHIEJ2YLXG27FWECDUg7gPcm8/kZhtEC3FnIy1cDGAT71ZrHE/GGFE4HNRkz5J7BojBANECCFJVUcmoeC7YJ0ZypxMbsM6bhv3+qt0RrJxP9oCkYujpCEjICWoYqxefK7f8AN5aZ1qv+nXlfRZv6tq0LCmesXUJDh7fbz0PI6RI6Ayi8DKyfMUHn+aBjVpm1StXMHZHCYdIg+raFzAsk9/MIDCwirr7A50NhI3o1W9plv8w9AbgKUYLnuacDV8ntonkvqWefzkeCxRlc2AMycXXSIko2XgxX+Rq8OAu/1AjAth8KGCAIwoEr2v9PEl44uGRPvgl5y9RaSR+ATl8GBkKdsCuhqIxe9GykqpdJxVGfcT+jCqOpGKTAA93XfxTg749fU3lyIWjA2SIQcPkSjt+ViTtonOHnK97GQoG6+4n46fVYPsXIxkcwPQO2CgrbZxDEtjHPf1KHRq8qKICJKHgYGgkcyRo+LcFYBFhvDgcp7fQAUm9wKLMnOvEjfYlj5Vt40JQWZhIWdumbo9zjhVXr8k6rXpc3xUCHw8cUOcrZ9thFNwqyuscLYnXEEsiUVSnRhwSoAWXZX38EZQNAy4jFUcEIFKNTuflYxa7i+eJ5LfuFPVdYvvY2nJRhm89d1wxxYRpucKlhNnyR9GFuwpk1nzG6Rz7IIy3JotmR/Q/PHyaa5wBKi72aFg7uZj+LHWJIU2622N6ea1VChVuLHvJAiQV3JbK9fn4sBhgR73qbooujhd2G1hT8j7wT6vk2DXRSngC3en4OBEJcFAVShAfki8U4kbB8fjfcKVvnTOrGpf2BPOfkf/MkYhQSJ/i2QaHPN2bRyvyNKLQZf9KAXhpgYekt7nIHJHVWA9099voH/HwP0TzExmHC8yZ3OtLnT2I4+ojXWs9H0ba9E2D6owdc5vUPbQ21KKhFisWOQmxsVCBEePNgB6R17b8Xx2NRJIGCCZ2y1El4jFEFMq6yj1lZ0YbiCQNNeQE0XKDzLFWbAATBS1A0uWhOs0CGPCyNvoWXKFPo3GnSvs37IPbr9VcqeU21M7HgrDakASUWo44XAV3c7eMNrlCmJUS0IcosK8DmNTM0YCK3zMszeN8JqvJHZnVaUj0uABxlmQPB3so4mG9T1A34OnX1gVXHSIELdDVKgnrUVzV/dE4vCZeds/zOUupreZgmS9RmFmxn4ULzqOpbVe0rvg7l4m3FssmXF2lhiHp0WyPuMAA5OGBBdUkHNYUbifQ40+12vFroncT3KPjxKAqOD23KvhxlOayWBfMm73VJICzsBwNg+dhjVV7/uCQ9XaL0uKDdviHZDJJT+4VyRRUkgWqTCRaBm2C0mW2H38JhW932mgVTi9l6q47njyll4a8OpFBfoAV/eytwS05w4NmCBsYqBtmvUaSohY8QKip0kPDz1pNeIgAI6Tp1x7NnGZ0rWGFi801iht1zVdWUM4oGcFC1RexzoXjbhpWZK3Y5wgiAkSr36q2Ka5nE0s0OEopl3Mh5UAhyKaUNn0KvmzZrxFzg8WGKONFnk5SlbYDCUDr9xbiadC5/oYRfPqSbAKSpwQnS8IlMFGLDyPxI5tcDN4QwhfImd8TNYcUavK8f4oomWtNvUn8Oy1cRxbw1WIjYtqbRJnu3wxSsT09cY6tE2zBOUhKhwfn8PSQAqNzXsYAzo64VksU+SnEbZbGyMN3YG7OdGOlxBq7SUWss+MG7kaoyKc268ESeJlwuGkYUOyUKJwOMsH5nqvxyEChet9YlUcJg3iYp3Kx2XbOjda8fw52ule9L/eG7l5oM+9z4f1fckG8CYLopb1ideJEe05SHYpmPj9zKtkEsmTkiVALFwq4lsTH7x4nvRSihJIxTk/u6YlSJ5FOPeA0/2wNmG0GMdRTChUcxswHFSqXAPsYqQmldDmZ/5OSZSzNfjtWODnLdX14yc6onfzVkOMN+4UyfTUEwVZoOWym6DlN5l9bJYawDEmzMAmRRqQDbjMqD0rAA4GpnWuT3WKUYHdjgmAzq41cZ4khUqOIt1HY88yU7lZByJ2EyWIPHIolZdgRmMiwGaJKwzHTIzBqI7U2+BKpaH7uXJJ1JllwOJ/VdPXPRXtoaP9F7ismINYUx3t731nxQoP9zMmh4YN6c2KDbldzUCj6H4dO0E8iEzxh6hgcc6xcjbUpOs7IozDWqovwyNk13MBsjLSogwvS/URBHzAlzyhfMDL9usUk37CQRBjXtyyinZXrrqUjZcc21yQmFD0clnMS2wMcWUV++YQiRgXu9aAjMkMFetJEe2KPrNSe2KRMmcWuIptjYcnJWOt5DNHX754oxj5SwreZ+IBDZZA1vQmxxRyJuZcCZjPSU/AZhUrXLwXJlsulmkrN49CYiboszV+Nta78BbnLJpZOy8GmrxmHLvtaHPO3jS8VszZEWnj/SYB2ACwMV73R/0d69Fi7Tjr4CYlozOICHI2rEkp/MS0rqNBpD68hqXnrfS4Lfls+a+CeznnTZ5iKiXlNCCTTp5aUMuOW59zAYSTcxkViQi2DArdXk6IJMbzNj+dEUMM4LpEXSDn413R7dKoXgS9CN0mielpEikQfMXEf25AkxpjDHiqBqgCjy+qZCqpskGBYVaFrnacx9aqcJVoXtXWBFentChfuYvyPc9RfoE9n71gPoB9F5iwGOR3JA7fvZKzrxJL3WCkcdOaNN1mwBGL5aEoCytiQg0Aj9v834hppZoVJSDHXW9QpdsmHRnCZWEAuZ8Z4FrtosAHJYwsGPBaxhQ5XI04K14gm58GUkDXlj1jnufkQwyQmIvkDEAXDTQKBnBxQCkhglkijFBw+CD9KRxdhIDVQMslSqjHGFSNJZjedqy++kURQx99IOoNejqDndOvg+dBjf1ObvaJJjI9YhzZbhhmCfzrCxdx1MqIaYn8xkl2iK5DjMu3B53yyga5BxlHBHE+RzZ6kLE/r6lPCZCzzweRc6G64UEd/Ut9zZ51EEDs9kj9UHRKrWO6KSWtV8mtcLYic915BBn4zxCwAcMc7HNdcwGA6lVnxJVbypBrCJ2OzYtFEhaUkSnOqZT8jFxvXKyiOQJtXGwAR+tcV4q8OKhe90V0sw6Wd7TyIjPkMuNs9qVzqCvmZC4R5pqznLm6qiJebICecrsHFWboOi+xC4ApFjg/cZH84gxpWIkbMIC7FY7Hv3U8Pxih7DZh403BHkySo7MiyZASAL7bRvxzlOaE+t6RuzUWzWJsnPwMwqeXrWSbp3QW61w5nAMxSewwVzGdB4OkqrVXUW/LdOSZM4eLuVg7O7EqVG9z42lO2Ol2brq74PggUodSKo7JxIlMCBbUKNyO6G6lBmgeU5zDQR6rnyndEjmbga6Y+PaS9BGPWewPlVmeLMbAlrdwNvYjRzMBiEXOQCsD5C21ADxb4Oz1pLvgXi/Dt0aqcQRcfbKmAwP4Nbjk+9C8YObpKu2qpcQxA2YmTdHEYONPP45/H6CwsF+1y7kexaQAlx9pJXhqRsyqAjwGrm7iMxo4xr541xnAHYjyum0r1eZVLTfm0iYvBouWIidZFPcVAz6nogqVh1obqJIzzq1quCzW43fkpSgclfzyfJDdCkNXxMy2EozPI43YMeFoLynbQYLHi/EpehrpSy++dKqh46xqVaNxQEDDvAZ+yhjxqBA/jmchy8WGmng9e/RcqMD1PTlLXGvA9WZc3y+DAzgX8qpmXrBvLM7HQQPSbM6zYqoNLuThYaRItfGgcRlL3FImmbbRnRMghgCDbN2JEadmSs30MetyGG/By+C/whCr2lAhAR3bFTPOMjPOKlWA7wuSSkVfJ2LfsmHnrBpGbPlUw7Ku4OhorKnRVQ7ChLjP2ajcFaFNdQ4T3acIuIU3zSAjGvbvJZhSAQlzKLRwsGoGsnE6jNesi20eFCCulldxzkbZGnN7HOMVZ2HgNevq/WYnxEl1rqGv9dWuBvPGOVUK1O2ep3jMnwXeuQKVB22fo6EpN/bsIIfcbHpZeo4SHm/M9WrrdXKjGlJwrZoabjKKRCNlsRAniVZ51bi5T2aJy1wE5MAhSVbR2Z35OnCPcreW/8iakhJXG4cLeBHgyL/qOjkTywq2iWoBUUWzTLaYllKreZHYlAJHJq3AoeFKRcHJ0pL4joSA/VqiuruXmKXSN0OM4xQ2mI//mwbQSwheMVfLCJBvkj/5LiQ+kIl83KpJAUKwkbbhaj62fuLLtk0Gdm9MkjBlxbHbJS6Pw3rhgDuefmMaSfkwSm6Z51qBe7a2Q6GQEOsoJWUu75bAJh3PnfSrdk1fQReQmbuZy3Pl9swXAjip1Mih41U/KyfLO4oEMKDZii6L9IKLIwGUM2XRr44VN3E7rnMFm2KsG44Tg57lhRGmwKe2DSDro5R3jZMhuqOJ6neAq1dVAhRAy0A+Do1OwzB7GoaZzYvGU2y83ExJ3BJ62eYszjoEdhhsWlvSkYQSo+3KhwhlX8DLSyoOcdwUFLpsgf+EP6qtIxShvzOKvmWuddIjicaG6z2toe6n1KtlNlIiE/+T/6RHD9zcrfDa9rn2mtR3lX2IUJ6Zmruxz9uyz9cBCojpXq6Vnuwj9KTS07Z54ecSWcVnRTLJes6eL78Vj3GmuarvJcd7us4Gz5MYt7y7/TfSgF/dUqBH+dtHzMWCP70aw7OIUkpma9KA5sYjNq2KdF6J8KpTa7xCsBVwFQ3y13SVho6oAz/P2+bjzc0XRi0PGQrsGrAveH9XQ5mwJDV4v4rggJoift1GJooI68r5OGyVxV6/iw7pWeCBy2pr3E11JQAEIXoSeu2Ir9qregOpIopBQIEYVdA42eCoy/siQHGN42sZ8MTWJGQqwFX0T11H0DtyPBEi0fMRRDuO99AlLRFEYgkNZ0QQy4KVkzNxsWq6j/RwPrFKmmOYUEOVOXpfJnf6+y3jKP2KTOSxyHRH9HjE55oo0itsQ9G1eDdvHy09KxpwLNqXxHigYrgvRDvSc8luiPYQp+eAaGd9vgrRPg7RDgLgqnOLNWENET+C8x0T8yzKEXp1PVKRzpP1AynJm3MhpOh3/htpmYh+MjtfRTsNSps5r46oHccx5X0rWi/n5HwuLmGsqwk8QI09jMxENp/qWxFClf+0SU5FHpqsFk+qdVIzonigPSDuRlFunDsGCdeEzJiAjhZjrMTRTAZws8IZm2WBnzNHOund0Bxo1yHCXxXYhu5gdoYioQ8KmFd3W2T74Q0GHEDnOqkTEfQaJWzAXWBbuS2AOi4/FtB1OLDjkYtNBr0NvQ5Drp2JxkaYmJJulYroGcSeK8y6WE/Chl1OmiDFfj+WU21wwYq20SLfuG15ZgGZ/wkSz2YZ72uJVtRSdMUM+DqA7qrxFUY4qdFWaSZjtgZZNAmacB58ZQdJ4ARhZy/Devh3DWjkJBDXEss7cL8e+oxI1QLo65l4/lXONz54cJyZJ84xx5/Mb3EUwM4bhx+GPucx3g34hbEcGdma/CSbLePm6qwJMMmqWkhsoDDoLEDdGP+5DHRNQ2PgPJRVAB3JpepSjDQGuo59NuxqXC3DBh2+rgaQexH0PsU6lYGLlSuHQyowd8r7yrZZ5lXW1DWAakMOXd+Ax76LRQaZcXVaMthwlUQLET8Y4ToyVhA1vW6Ms1gstjlluQy3DWI7sdSqjLtGn5zhN2XRzRwNy5uDWHN46O7DGus4xt18VCrIuBjHuetg21fJ2Zu10gxL5WZJlMjlc4sIuf4ofvfzZrVrqZOTgogd4p+7XQD4Irtvo8axUbxzgbyOU2bXTd02G2s2AvEeAHhXAzqDZGLchjio5QZ8jQpO5k0p4mRi6Mm6KOHlXRiFWjHCfyC6x3/ojYJUdVptGK9hUYdup7BXFPS+LUE5WQJKVeNlK8qcRAZQuLlFGk5Zw7pBYRaBqoVLZvOwjmagj0N8z6lPHS1wZbrrm6SW2xaCHdvAVSvUuhl1MO7oKYj3YwD8kQd03tPoqhVJFZ5XbV1BB9c7mcoDEbgVHpTAU2PilnEcW7fhMqPYbvVFT+sAQxP1XFQvkdqKjarAuS4Iqq6inpgoWMxSPE+xCpo0dVERtSLgy7m4zpSr+TIRzXEfwDa04DK0K1pe7ZCalLL6qjxPPDrm5gTc7BARE8+kYQSwKmHQcGaSYqBE2lzMaHEbSnZce57SzdpNADu24i+uRKA1AhejPXGuFp5ED6g//iPkhow4bqnq4xms2T+XWZl4YeCh09ewHgfXc5BGDLoNoDf0LZIONkbayMtUjctxToCqbPj+Dg90kZW2ygY5FTk2nuMqwBHj6GrhhEkVKHPxOFTAuuYDwiTrZAA8DS52TeQOvk1B3geQz8F/nuUwKMe734hnfcE4Ok6dwS1GyDR/GYiun6Nju4lgx7bhj5jw+COz3K+Y9JZbaeLbA3bXGQOdOZ2NOQ7OsAWvj9TJcOWXQAAyFKqv3M1jk4TzW/agyPlEMvK1jX8a2I8zrDSw0Y6zvjCn6rNCu1H6HOyPAtCWVdXyobEpgIvtceZmrGWkjDciAMBcXbLMopr/fiGrgHUDkP3nGP48Lxa23hnbUyVii7lqy1VsnBznetp1+tk30gYvFIq/taTt0KFCZGkF6341RsTbnaScXQ4O+s+Om39ufvpSxeLLuUah1uCjr7V0+iiOPEmosYEuhBHU4tq1kSJgIUGbMSw8IQ06PWunUm7Rx7V9Ce6MSGJCyqDavGhYMx+L/jH+ayVFaFOW5grWS5StcwUs3mOKz9XkCrlnmSfGwXtJIuOs+tB0UZMdfIWUFjEn7zNwn7J+kU7SKJn0n4vc6UJ4RTAbErRNLfrn5b9GME/mpdl0mVbuplN7GKfLhLhovb06UxNvs0tSzGuOVkynWRdCKdw4Fvc8Jk0GM8SsHHP9BNfpIRXPLFiXa0NxrCcqIUzg3Bof64jodiKm8bA1flhHDDb5kkksLJ5Jd/yu0xQuIhVZcC9z8rgQMR0A4RZTUVorzyHOo2bFVT00rD5CKRwaS4Tdq0Bu28DmVgRk4jZvxGAMW5c2+zHvivXOIv44cSq1EPFSDsXbaxQDNzqhfbTkAfzF8o868fF5LCKJ6F/GRvzrJd3S93MwplPqZAYQx6bs2HI8DnHMz2IDixM8XD5/uSnXBrGm95CIZx4Xdw7Asiqq6FzhtLBARBbb5rxRBHmONgmUoC+CBUykYIhtnnnnb+RPNm4r2LENjxuWcNxgP4I/L/O6uGI4ixlz8lcLDtkxM+hmZ2FAw5I/A9D32SmZ6ritz+JoHQ9v3Q0uW2wNvnmGp/eK28QziVgDeMycPPXUEOGsl4hhtKR3YxuzbQO3GFTBQRFERU583vb3D4lr4eTDB/Gt7wchsOdiIVByGwsHb+zPNL4mYF/ZQrlMQA1OBn2eBpmWUkrV/gDNwKizkGzB9ey7L5BwvXQ8Tw+yX67XxkQAl2cfjp1bv7IPdoMwFktGVORSiQWgiYvEG+wmLdhNs/KvlwnguWQL3CuEaX6yfYNWldg/VgginyiZK+mJYeK/VsrylbZbBOzYht01pvL5I1g5GZXoYkSOWxTzc6Q104/sg98OucjisW3cPwT+Ja2xPhkJgduE+L9i9Vc4q4T17IJNKWLX3M/u0Jroeb0/vkC0ns8KmK785xzWQIQTgz/r4AoOPlb4yYN2ZOMfc4ltawAeeiLdYm1gyJUoPL7lPBX1cMUNFlGaj5yPgI1NIlP8wZqi8Z9ceEpizGSx5qIdtPUJA5AnDZIZ+8v61Z4RgeWRk0xg4g/PFe+jf3CNAT4mNXvu0CZ/i2tgWcsHhs3qvLe63XJgb9YGf5ym+OOdg1YigHmiQvIXUgAUcNgU/+LioDpW2hypWLjKWlbxWLz+oIBI8dm8bVImxN/mmStk2HPM+5cyhJuDuvVcvFm7LcAetJIlH6NIUcdbsEE4hgnAOpxDtLKQrsXoi2U8LBWw/VTJEIzAUek+qdwsc2epyXOPlIw0+9sqVJR1lYF85VGvO22TFudJZymg1n5picfChm0+x2lZnnJb0rO2H++hwXXFM+3+CGj53OB377TXqMXO3whIDPAoqGXACuCH7r/TbvMWQdbtoTPhDsh32p12p90O7f8DfoTNxsBrkhgAAAAASUVORK5CYII=";

// src/components/ComponentAlert.tsx
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon as FontAwesomeIcon2 } from "@fortawesome/react-fontawesome";
import React11 from "react";
var ComponentAlert = ({ type, content }) => {
  let alertClass = "bg-green-light text-success";
  switch (type) {
    case "success":
      alertClass = "bg-green-light text-success";
      break;
    case "error":
      alertClass = "bg-warning-50 text-warning";
      break;
  }
  return /* @__PURE__ */ React11.createElement("div", { className: `${alertClass} text-start rounded py-20px px-3 mb-4 d-flex` }, /* @__PURE__ */ React11.createElement("span", { className: "me-2" }, /* @__PURE__ */ React11.createElement(
    FontAwesomeIcon2,
    {
      icon: type == "success" ? faCheckCircle : faXmarkCircle,
      width: 16,
      height: 16,
      className: "fs-6"
    }
  )), /* @__PURE__ */ React11.createElement("div", null, content));
};
var ComponentAlert_default = ComponentAlert;

// src/SSOConfig/AesirX/Password.tsx
var Password = ({ show, setShow }) => {
  const { aesirxData, getData } = useUserContext();
  const { accessToken, jwt } = useGlobalContext();
  const [sending, setSending] = useState7(false);
  const [alert, setAlert] = useState7({ show: false, content: "", type: "success" });
  const transformMessage = (content_id) => {
    let message = "Update password unsucessfully!";
    switch (content_id) {
      case "wrong_current_password":
        message = "Current password is wrong!";
        break;
    }
    return message;
  };
  const formik = useFormik2({
    initialValues: {
      curr_password: "",
      new_password: ""
    },
    validationSchema: Yup2.object({
      curr_password: Yup2.string().required("Please enter current password"),
      new_password: Yup2.string().required("Please enter new password").notOneOf([Yup2.ref("curr_password")], "New password must be different from old password")
    }),
    onSubmit: async (values) => {
      let alertObject = {
        show: true,
        content: "Something when wrong!",
        type: "error"
      };
      setSending(true);
      try {
        const response = await updateMember({ id: aesirxData?.member_id, ...values }, accessToken);
        if (response?.result?.success) {
          alertObject.type = "success";
          alertObject.content = `Update password successfully!`;
          formik.resetForm();
        } else {
          const message = transformMessage(response?.result?.content_id);
          alertObject = {
            ...alertObject,
            type: "error",
            content: message
          };
        }
      } catch (error) {
        console.log("Error", error);
        notify("Something when wrong!", "error");
      }
      setSending(false);
      setAlert(alertObject);
    },
    validateOnMount: true
  });
  return /* @__PURE__ */ React12.createElement(
    Modal3,
    {
      show,
      onHide: () => setShow(false),
      "aria-labelledby": "contained-modal-title-vcenter",
      centered: true
    },
    /* @__PURE__ */ React12.createElement(Modal3.Header, { className: "border-0 pb-0", closeButton: true }),
    /* @__PURE__ */ React12.createElement(Modal3.Body, null, /* @__PURE__ */ React12.createElement("div", { className: "py-2rem px-4 rounded text-center" }, alert?.show && /* @__PURE__ */ React12.createElement(ComponentAlert_default, { type: alert.type, content: alert.content }), /* @__PURE__ */ React12.createElement(Image, { src: register_success_icon_default, width: 96, height: 99, quality: 100, alt: "Icon Image " }), /* @__PURE__ */ React12.createElement("h3", { className: "fw-medium text-primary fs-2 mb-4" }, "Change password"), /* @__PURE__ */ React12.createElement(Form2, { onSubmit: formik.handleSubmit, className: "text-start" }, /* @__PURE__ */ React12.createElement(Form2.Group, null, /* @__PURE__ */ React12.createElement(Form2.Label, { className: "text-primary mb-2" }, "Current password", /* @__PURE__ */ React12.createElement("span", { className: "text-danger" }, "*")), /* @__PURE__ */ React12.createElement(
      Form2.Control,
      {
        type: "password",
        name: "curr_password",
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values["curr_password"],
        className: `py-13px lh-sm ${formik.touched["curr_password"] && formik.errors["curr_password"] ? "border-danger" : ""}`
      }
    ), formik.touched["curr_password"] && formik.errors["curr_password"] ? /* @__PURE__ */ React12.createElement("p", { className: "mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center" }, /* @__PURE__ */ React12.createElement(FontAwesomeIcon3, { icon: faCircleExclamation2, width: 14, height: 14 }), /* @__PURE__ */ React12.createElement("span", { className: "fs-7 fw-semibold ms-2 lh-1" }, formik.errors["curr_password"].toString())) : null), /* @__PURE__ */ React12.createElement(Form2.Group, { className: "mt-3" }, /* @__PURE__ */ React12.createElement(Form2.Label, { className: "text-primary mb-2" }, "New password", /* @__PURE__ */ React12.createElement("span", { className: "text-danger" }, "*")), /* @__PURE__ */ React12.createElement(
      Form2.Control,
      {
        type: "password",
        name: "new_password",
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values["new_password"],
        className: `py-13px lh-sm ${formik.touched["new_password"] && formik.errors["new_password"] ? "border-danger" : ""}`
      }
    ), formik.touched["new_password"] && formik.errors["new_password"] ? /* @__PURE__ */ React12.createElement("p", { className: "mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center" }, /* @__PURE__ */ React12.createElement(FontAwesomeIcon3, { icon: faCircleExclamation2, width: 14, height: 14 }), /* @__PURE__ */ React12.createElement("span", { className: "fs-7 fw-semibold ms-2 lh-1" }, formik.errors["new_password"].toString())) : null), /* @__PURE__ */ React12.createElement("p", { className: "mb-0 text-end mt-1" }, /* @__PURE__ */ React12.createElement(
      "a",
      {
        className: "fs-7 fw-medium text-decoration-none",
        href: "/auth/forgot-password",
        target: "_blank"
      },
      "Forgot password?"
    )), /* @__PURE__ */ React12.createElement(
      Button5,
      {
        disabled: sending || !formik.isValid,
        type: "submit",
        variant: "success",
        className: "fw-semibold py-12px mt-12px py-12px w-100"
      },
      "Change Password"
    ))))
  );
};
var Password_default = Password;

// src/SSOConfig/Social/index.tsx
import React13 from "react";
import { Button as Button6, Form as Form3, Spinner } from "react-bootstrap";
import { useState as useState8 } from "react";
import axios from "axios";
var Social = ({ typeSocial, keySocial }) => {
  const [loading, setLoading] = useState8(false);
  const { aesirxData, getData } = useUserContext();
  const { accessToken, jwt } = useGlobalContext();
  const { endpoint } = getClientApp();
  const connectSocial = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getSocialConnectUrl&api=hal&socialType=${typeSocial}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken
          }
        }
      );
      const popupSocial = response?.data.result[0] && window.open(response?.data.result[0], "SSO", "status=1,height=750,width=650");
      const timer = setInterval(function() {
        if (popupSocial?.closed) {
          clearInterval(timer);
          setLoading(false);
        }
      }, 1e3);
      window.addEventListener(
        "message",
        (e) => {
          if (e.origin !== endpoint)
            return;
          if (e.data && e.data.socialType) {
            setLoading(false);
            getData(jwt, accessToken);
          } else if (e.data.error) {
            notify(`${e.data.error}`, "error");
          }
        },
        false
      );
    } catch (error) {
      console.error(error);
    }
  };
  const disconnectSocial = async () => {
    let updateSuccess = true;
    setLoading(true);
    try {
      const response = await updateMember(
        { id: aesirxData?.member_id, [keySocial]: "" },
        accessToken
      );
      if (response?.result?.success) {
        notify("Disconnect sucessfully!", "success");
      } else {
        updateSuccess = false;
        notify(`${response?._messages?.[0]?.message || "Something when wrong!"}`, "error");
      }
    } catch (error) {
      console.log("Error", error);
      updateSuccess = false;
      notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, "error");
    }
    setLoading(false);
    if (updateSuccess) {
      getData(jwt, accessToken);
    }
  };
  let logoSocial = logo_google_default;
  switch (typeSocial) {
    case "facebook":
      logoSocial = logo_facebook_default;
      break;
    case "twitter":
      logoSocial = logo_twitter_default;
      break;
  }
  let valueSocial = "";
  switch (typeSocial) {
    case "facebook":
      valueSocial = aesirxData?.social_facebook;
      break;
    case "twitter":
      valueSocial = aesirxData?.social_twitter;
      break;
    case "google":
      valueSocial = aesirxData?.social_google;
      break;
  }
  return /* @__PURE__ */ React13.createElement("div", { className: "py-4 px-4 border rounded" }, /* @__PURE__ */ React13.createElement("div", { className: "d-flex justify-content-start align-items-center mb-3" }, /* @__PURE__ */ React13.createElement(
    Image,
    {
      quality: 100,
      className: "me-2",
      src: logoSocial,
      width: 40,
      height: 40,
      alt: "logo social"
    }
  ), /* @__PURE__ */ React13.createElement("p", { className: "fw-semibold fs-18  text-capitalize ms-2 mb-0" }, typeSocial)), valueSocial && /* @__PURE__ */ React13.createElement(Form3.Group, null, /* @__PURE__ */ React13.createElement(Form3.Label, { className: "fw-medium mb-1" }, "ID"), /* @__PURE__ */ React13.createElement("div", { className: "position-relative fs-7 mb-1" }, /* @__PURE__ */ React13.createElement(
    Form3.Control,
    {
      type: "email",
      name: "email",
      value: valueSocial,
      className: `py-13px fs-7`,
      readOnly: true
    }
  ), /* @__PURE__ */ React13.createElement(
    ButtonCopy_default,
    {
      content: valueSocial,
      className: "border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
    }
  ))), /* @__PURE__ */ React13.createElement(
    Button6,
    {
      type: "button",
      variant: `${valueSocial ? "danger" : "success"}`,
      className: `fw-semibold py-12px py-12px w-100 ${valueSocial ? "" : "mt-3"}`,
      onClick: () => {
        if (valueSocial) {
          disconnectSocial();
        } else {
          connectSocial();
        }
      },
      disabled: loading
    },
    loading && /* @__PURE__ */ React13.createElement(Spinner, { size: "sm", className: "me-1" }),
    valueSocial ? "Disconnect" : /* @__PURE__ */ React13.createElement(React13.Fragment, null, "Connect to ", /* @__PURE__ */ React13.createElement("span", { className: "text-capitalize" }, typeSocial))
  ));
};
var Social_default = Social;

// src/components/Spinner.tsx
import React14 from "react";
import MoonLoader from "react-spinners/MoonLoader";
function Spinner2({ className = "", size }) {
  return /* @__PURE__ */ React14.createElement(
    "div",
    {
      className: `${className} d-flex justify-content-center align-items-center position-absolute top-50 start-50 translate-middle zindex-1 w-100 h-100`
    },
    /* @__PURE__ */ React14.createElement(MoonLoader, { color: `#1ab394`, size: `${size ?? "60px"}` })
  );
}

// src/SSOConfig/index.tsx
var MetaMask = React15.lazy(() => import("./MetaMask-7ITXQ2Q6.js"));
var SSO = () => {
  return /* @__PURE__ */ React15.createElement(GlobalContextProvider, null, /* @__PURE__ */ React15.createElement(UserContextProvider, null, /* @__PURE__ */ React15.createElement(Web3ContextProvider, { autoLoad: true }, /* @__PURE__ */ React15.createElement(SSOApp, null))));
};
var SSOApp = () => {
  const [modal, setModal] = useState9({ show: false });
  const [modalPassword, setModalPassword] = useState9(false);
  const { aesirxData, getData } = useUserContext();
  const { jwt, accessToken } = useGlobalContext();
  const [isLoading, setIsLoading] = useState9(true);
  useEffect4(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3e3);
  }, []);
  const connectWeb3Wallet = async (address, walletType) => {
    let connectSuccess = true;
    if (address) {
      try {
        const response = await connectWallet(
          address,
          walletType ?? "concordium",
          accessToken,
          aesirxData?.username
        );
        if (response?.result) {
          notify("Connect wallet sucessfully!", "success");
        } else {
          notify(`${response?._messages?.[0]?.message}`, "error");
        }
      } catch (error) {
        connectSuccess = false;
        notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, "error");
      }
    }
    if (connectSuccess) {
      await getData(jwt, accessToken);
    }
  };
  const removeWeb3Wallet = async (address, walletType) => {
    let removeSuccess = true;
    if (address) {
      try {
        const response = await removeWallet(
          address,
          walletType ?? "concordium",
          accessToken,
          aesirxData?.username
        );
        if (response?.result) {
          notify("Remove wallet sucessfully!", "success");
        } else {
          notify(`${response?._messages?.[0]?.message}`, "error");
        }
      } catch (error) {
        removeSuccess = false;
        notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, "error");
      }
    }
    if (removeSuccess) {
      await getData(jwt, accessToken);
    }
  };
  return /* @__PURE__ */ React15.createElement(React15.Fragment, null, modal?.show && /* @__PURE__ */ React15.createElement(
    DeleteModal_default,
    {
      data: modal?.data,
      action: removeWeb3Wallet,
      setShow: setModal,
      show: modal?.show
    }
  ), modalPassword && /* @__PURE__ */ React15.createElement(Password_default, { setShow: setModalPassword, show: modal }), /* @__PURE__ */ React15.createElement("h2", { className: "fs-24 fw-semibold mb-3 p-3" }, "Single Sign-On Management"), isLoading ? /* @__PURE__ */ React15.createElement(Spinner2, null) : /* @__PURE__ */ React15.createElement("div", { className: "bg-white rounded p-4" }, /* @__PURE__ */ React15.createElement("h3", { className: "fs-5 fw-medium mb-12px" }, "WEB3"), /* @__PURE__ */ React15.createElement(Row, null, /* @__PURE__ */ React15.createElement(Col, { md: 6, lg: 6, xxl: 4, className: "mb-4" }, /* @__PURE__ */ React15.createElement(Concordium_default, { setShow: setModal, connectWallet: connectWeb3Wallet })), /* @__PURE__ */ React15.createElement(Col, { md: 6, lg: 6, xxl: 4, className: "mb-4" }, /* @__PURE__ */ React15.createElement(MetaMask, { setShow: setModal, connectWallet: connectWeb3Wallet }))), /* @__PURE__ */ React15.createElement("h3", { className: "fs-5 d-flex align-items-center fw-medium mb-12px" }, "AesirX Account", /* @__PURE__ */ React15.createElement(
    "p",
    {
      onClick: () => setModalPassword(true),
      className: "fw-medium fs-7 ms-4 mb-0 text-decoration-underline text-success cursor-pointer"
    },
    "Change Password"
  )), /* @__PURE__ */ React15.createElement(Row, null, /* @__PURE__ */ React15.createElement(Col, { md: 6, lg: 6, xxl: 4, className: "mb-4" }, /* @__PURE__ */ React15.createElement(Email_default, null))), /* @__PURE__ */ React15.createElement("h3", { className: "fs-5 fw-medium mb-12px" }, "Social Media"), /* @__PURE__ */ React15.createElement(Row, null, /* @__PURE__ */ React15.createElement(Col, { md: 6, lg: 6, xxl: 4, className: "mb-4" }, /* @__PURE__ */ React15.createElement(Social_default, { typeSocial: "google", keySocial: "social_google" })), /* @__PURE__ */ React15.createElement(Col, { md: 6, lg: 6, xxl: 4, className: "mb-4" }, /* @__PURE__ */ React15.createElement(Social_default, { typeSocial: "twitter", keySocial: "social_twitter" })), /* @__PURE__ */ React15.createElement(Col, { md: 6, lg: 6, xxl: 4, className: "mb-4" }, /* @__PURE__ */ React15.createElement(Social_default, { typeSocial: "facebook", keySocial: "social_facebook" })))));
};
var SSOConfig_default = SSO;
export {
  ConcordiumLogin_default as ConcordiumLogin,
  CreateAccount_default as CreateAccount,
  EmailLogin_default as EmailLogin,
  SSOButton_default as SSOButton,
  SSOConfig_default as SSOConfig,
  SignUpButton_default as SignUpButton,
  SignUpConcordium_default as SignUpConcordium
};
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
