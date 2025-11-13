import {
  getMember,
  getPreregistration
} from "./chunk-5VDMOXEK.js";

// src/components/Toast.tsx
import React from "react";
import { ToastContainer, toast } from "react-toastify";

// src/SSOButton/images/toast_danger.png
var toast_danger_default = "data:image/png;base64,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";

// src/SSOButton/images/warning_icon.png
var warning_icon_default = "data:image/png;base64,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";

// src/SSOButton/images/toast_success.png
var toast_success_default = "data:image/png;base64,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";

// src/components/Toast.tsx
var notify = async (msg, type = "success") => {
  switch (type) {
    case "error":
      toast.error(
        /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "Error"), msg && typeof msg === "string" && /* @__PURE__ */ React.createElement("p", { className: "fw-normal m-0" }, msg)),
        {
          className: "bg-red-10 fw-bold text-red-100 ps-4 bg-noti-bg-error text-noti-error",
          icon: () => /* @__PURE__ */ React.createElement("img", { alt: "error", src: toast_danger_default })
        }
      );
      break;
    case "warn":
      toast.warn(
        /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "Warning"), msg && typeof msg === "string" && /* @__PURE__ */ React.createElement("p", { className: "fw-normal m-0" }, msg)),
        {
          className: "bg-yellow-10 fw-bold text-yellow-200 ps-4 bg-noti-bg-warn text-noti-warn",
          icon: () => /* @__PURE__ */ React.createElement("img", { alt: "warn", src: warning_icon_default })
        }
      );
      break;
    case "success":
      toast.success(
        /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "Successful"), msg && typeof msg === "string" && /* @__PURE__ */ React.createElement("p", { className: "fw-normal m-0" }, msg)),
        {
          className: "bg-primary-10 bg-noti-bg-success text-green fw-bold ps-4",
          icon: () => /* @__PURE__ */ React.createElement("img", { alt: "success", src: toast_success_default })
        }
      );
      break;
    case "promise":
      return await toast.promise(
        msg,
        {
          pending: {
            render() {
              return /* @__PURE__ */ React.createElement("span", { className: "p-15 pe-2" }, "Progressing...");
            },
            icon: () => /* @__PURE__ */ React.createElement("img", { alt: "success", src: toast_success_default })
          },
          success: {
            render() {
              return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "Successful"), msg && typeof msg === "string" && /* @__PURE__ */ React.createElement("p", { className: "fw-normal m-0" }, msg));
            },
            className: "bg-primary-10 text-green bg-noti-bg-success  fw-bold ps-4",
            icon: () => /* @__PURE__ */ React.createElement("img", { alt: "success", src: toast_success_default })
          },
          error: {
            render() {
              return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", null, "Error"), msg && typeof msg === "string" && /* @__PURE__ */ React.createElement("p", { className: "fw-normal m-0" }, msg));
            },
            className: "bg-red-10 fw-bold bg-noti-bg-error text-noti-error text-red-100 ps-4",
            icon: () => /* @__PURE__ */ React.createElement("img", { alt: "error", src: toast_danger_default })
          }
        },
        {
          className: "bg-dark"
        }
      );
    default:
      toast.info(msg, {
        className: "bg-info"
      });
      break;
  }
};

// src/SSOButton/Providers/user.tsx
import React3, {
  createContext as createContext2,
  useCallback as useCallback2,
  useContext as useContext2,
  useEffect as useEffect2,
  useState as useState2
} from "react";

// src/SSOButton/Providers/global.tsx
import React2, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from "react";
import { AUTHORIZATION_KEY, Storage } from "aesirx-lib";
import secureLocalStorage from "react-secure-storage";
var globalContext = createContext({
  jwt: "",
  accessToken: "",
  globalLoading: false,
  onLogin: void 0,
  onLogout: void 0
});
var GlobalContextProvider = ({ children }) => {
  return /* @__PURE__ */ React2.createElement(GlobalContextApp, null, children);
};
var GlobalContextApp = ({ children }) => {
  const [jwt, setJwt] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const onSSOData = useCallback(async (response) => {
    if (response.error) {
      console.log("ee", response);
    } else {
      secureLocalStorage.setItem("jwt", response?.jwt);
      Storage.getItem("accessToken", AUTHORIZATION_KEY.ACCESS_TOKEN);
      setJwt(response?.jwt);
      setAccessToken(response?.access_token);
    }
  }, []);
  useEffect(() => {
    const jwt2 = secureLocalStorage.getItem("jwt");
    const accessToken2 = Storage.getItem(AUTHORIZATION_KEY.ACCESS_TOKEN);
    if (jwt2) {
      setJwt(jwt2);
    }
    if (accessToken2) {
      setAccessToken(accessToken2);
    }
  }, []);
  const handleLogout = async () => {
    secureLocalStorage.removeItem("jwt");
    secureLocalStorage.removeItem("accessToken");
    secureLocalStorage.removeItem("connection");
    secureLocalStorage.removeItem("aesirxData");
    secureLocalStorage.removeItem("preregistration");
    setJwt("");
    setAccessToken("");
  };
  return /* @__PURE__ */ React2.createElement(
    globalContext.Provider,
    {
      value: {
        jwt,
        accessToken,
        globalLoading: false,
        onLogin: onSSOData,
        onLogout: handleLogout
      }
    },
    children
  );
};
var useGlobalContext = () => useContext(globalContext);

// src/SSOButton/Providers/user.tsx
import secureLocalStorage2 from "react-secure-storage";
import axios from "axios";
import { AUTHORIZATION_KEY as AUTHORIZATION_KEY2, Storage as Storage2 } from "aesirx-lib";
var userContext = createContext2({
  userLoading: void 0,
  getData: void 0
});
var UserContextProvider = ({ children, isGetInterest = false }) => {
  const { jwt, onLogout } = useGlobalContext();
  const accessToken = Storage2.getItem(AUTHORIZATION_KEY2.ACCESS_TOKEN);
  const [preregistration, setPreregistration] = useState2(null);
  const [aesirxData, setAesirxData] = useState2(null);
  const [isAdmin, setIsAdmin] = useState2(false);
  const [loading, setLoading] = useState2(true);
  useEffect2(() => {
    if (jwt && accessToken) {
      try {
        (async () => {
          await getData(jwt, accessToken);
        })();
      } catch (error) {
        notify(`${error.message}`, "error");
      }
    }
  }, [jwt, accessToken]);
  const getData = useCallback2(async (jwt2, accessToken2) => {
    setLoading(true);
    let _preregistration = {};
    let aesirxData2 = {};
    if (jwt2) {
      try {
        const member = await getMember(accessToken2);
        aesirxData2 = { ...member };
        const preregistrationData = (await getPreregistration(jwt2)).data?.objForm;
        if (preregistrationData?.aesirXAccount) {
          const response = await axios.post("/api/member/checkadmin", {
            username: preregistrationData?.aesirXAccount
          });
          response?.data && setIsAdmin(true);
        }
        _preregistration = {
          ...preregistrationData,
          ..._preregistration
        };
        secureLocalStorage2.setItem("auth", true);
        secureLocalStorage2.setItem("access_token", accessToken2);
        secureLocalStorage2.setItem("member_id", aesirxData2?.member_id);
        secureLocalStorage2.setItem("member_email", aesirxData2?.email);
      } catch (error) {
        if (error?.response?.status === 403 || error?.response?.status === 401 && error?.response?.data?.error !== "Account preregistration doesn't exist") {
          onLogout();
        }
      }
    }
    setAesirxData(aesirxData2);
    setPreregistration(_preregistration);
    setLoading(false);
  }, []);
  return /* @__PURE__ */ React3.createElement(
    userContext.Provider,
    {
      value: {
        preregistration,
        aesirxData,
        isAdmin,
        userLoading: loading,
        getData
      }
    },
    children
  );
};
var useUserContext = () => useContext2(userContext);

// src/components/Image.tsx
import React4 from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
var Image = (props) => /* @__PURE__ */ React4.createElement(
  LazyLoadImage,
  {
    placeholderSrc: props?.placeholderSrc ? props?.placeholderSrc : "/assets/images/default_channel_image.png",
    ...props,
    effect: "blur"
  }
);

export {
  warning_icon_default,
  notify,
  GlobalContextProvider,
  useGlobalContext,
  UserContextProvider,
  useUserContext,
  Image
};
/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */
