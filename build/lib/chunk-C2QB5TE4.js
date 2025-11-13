// src/SSOButton/modal.tsx
import React, { Suspense } from "react";
import { CloseButton, Modal, ModalBody } from "react-bootstrap";
if (typeof window !== "undefined") {
  window.process = { env: "" };
}
var SSOModalContext = React.createContext(void 0);
var SSOProviders = React.lazy(() => import("./Providers-7MVHE5MS.js"));
var SSOModal = ({
  onGetData,
  show,
  toggle,
  demoUser,
  demoPassword,
  noCreateAccount,
  isRequireEmail = false,
  isSignUpForm = false,
  loginText,
  loginBg,
  customClass,
  forgotPasswordLink
}) => {
  const handleOnData = (data) => {
    onGetData(data);
    toggle();
  };
  return /* @__PURE__ */ React.createElement("div", { className: "aesirxsso" }, /* @__PURE__ */ React.createElement(
    Modal,
    {
      centered: true,
      fade: false,
      show,
      onHide: () => {
        toggle();
      },
      size: "xl",
      className: `aesirxsso ${customClass ?? ""}`
    },
    /* @__PURE__ */ React.createElement(CloseButton, { onClick: toggle }),
    /* @__PURE__ */ React.createElement(ModalBody, { className: "p-0 bg-white rounded-3" }, /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(React.Fragment, null, "Loading...") }, /* @__PURE__ */ React.createElement(
      SSOModalContext.Provider,
      {
        value: {
          handleOnData,
          toggle,
          demoUser,
          demoPassword,
          noCreateAccount,
          isRequireEmail,
          isSignUpForm
        }
      },
      /* @__PURE__ */ React.createElement(
        SSOProviders,
        {
          forgotPasswordLink,
          loginText,
          loginBg
        }
      )
    )))
  ));
};
var modal_default = SSOModal;

export {
  SSOModalContext,
  modal_default
};
