import {
  __commonJS,
  __toESM
} from "./chunk-L4YLJHLJ.js";

// node_modules/murmurhash-js/murmurhash3_gc.js
var require_murmurhash3_gc = __commonJS({
  "node_modules/murmurhash-js/murmurhash3_gc.js"(exports, module) {
    function murmurhash3_32_gc2(key, seed) {
      var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;
      remainder = key.length & 3;
      bytes = key.length - remainder;
      h1 = seed;
      c1 = 3432918353;
      c2 = 461845907;
      i = 0;
      while (i < bytes) {
        k1 = key.charCodeAt(i) & 255 | (key.charCodeAt(++i) & 255) << 8 | (key.charCodeAt(++i) & 255) << 16 | (key.charCodeAt(++i) & 255) << 24;
        ++i;
        k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
        k1 = k1 << 15 | k1 >>> 17;
        k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
        h1 ^= k1;
        h1 = h1 << 13 | h1 >>> 19;
        h1b = (h1 & 65535) * 5 + (((h1 >>> 16) * 5 & 65535) << 16) & 4294967295;
        h1 = (h1b & 65535) + 27492 + (((h1b >>> 16) + 58964 & 65535) << 16);
      }
      k1 = 0;
      switch (remainder) {
        case 3:
          k1 ^= (key.charCodeAt(i + 2) & 255) << 16;
        case 2:
          k1 ^= (key.charCodeAt(i + 1) & 255) << 8;
        case 1:
          k1 ^= key.charCodeAt(i) & 255;
          k1 = (k1 & 65535) * c1 + (((k1 >>> 16) * c1 & 65535) << 16) & 4294967295;
          k1 = k1 << 15 | k1 >>> 17;
          k1 = (k1 & 65535) * c2 + (((k1 >>> 16) * c2 & 65535) << 16) & 4294967295;
          h1 ^= k1;
      }
      h1 ^= key.length;
      h1 ^= h1 >>> 16;
      h1 = (h1 & 65535) * 2246822507 + (((h1 >>> 16) * 2246822507 & 65535) << 16) & 4294967295;
      h1 ^= h1 >>> 13;
      h1 = (h1 & 65535) * 3266489909 + (((h1 >>> 16) * 3266489909 & 65535) << 16) & 4294967295;
      h1 ^= h1 >>> 16;
      return h1 >>> 0;
    }
    if (typeof module !== "undefined") {
      module.exports = murmurhash3_32_gc2;
    }
  }
});

// src/utils/index.tsx
import axios from "axios";
import Bowser from "bowser";

// src/lib/envHelper.ts
var getHashKey = () => {
  let value = null;
  try {
    if (typeof process.env != "undefined") {
      value = process.env.SECURE_LOCAL_STORAGE_HASH_KEY || process.env.REACT_APP_SECURE_LOCAL_STORAGE_HASH_KEY || process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_HASH_KEY || process.env.VITE_SECURE_LOCAL_STORAGE_HASH_KEY;
    } else {
      console.warn(`react-secure-storage : process is not defined! Just a warning!`);
    }
  } catch (ex) {
    return null;
  }
  return value;
};
var getStoragePrefix = () => {
  let value = null;
  try {
    if (typeof process.env != "undefined") {
      value = process.env.SECURE_LOCAL_STORAGE_PREFIX || process.env.REACT_APP_SECURE_LOCAL_STORAGE_PREFIX || process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_PREFIX || process.env.VITE_SECURE_LOCAL_STORAGE_PREFIX;
    } else {
      console.warn(`react-secure-storage : process is not defined! Just a warning!`);
    }
  } catch (ex) {
    return null;
  }
  return value;
};
var getDisabledKeys = () => {
  let value = null;
  try {
    if (typeof process.env != "undefined") {
      value = process.env.SECURE_LOCAL_STORAGE_DISABLED_KEYS || process.env.REACT_APP_SECURE_LOCAL_STORAGE_DISABLED_KEYS || process.env.NEXT_PUBLIC_SECURE_LOCAL_STORAGE_DISABLED_KEYS || process.env.VITE_SECURE_LOCAL_STORAGE_DISABLED_KEYS;
    } else {
      console.warn(`react-secure-storage : process is not defined! Just a warning!`);
    }
  } catch (ex) {
    return null;
  }
  return value;
};
var envHelper = {
  getHashKey,
  getStoragePrefix,
  getDisabledKeys
};
var envHelper_default = envHelper;

// src/lib/fingerpint.lib.ts
var import_murmurhash3_gc = __toESM(require_murmurhash3_gc());

// src/lib/utils.ts
var FINGERPRINT_KEYS = {
  USERAGENT: "UserAgent",
  SCREEN_PRINT: "ScreenPrint",
  PLUGINS: "Plugins",
  FONTS: "Fonts",
  LOCAL_STORAGE: "LocalStorage",
  SESSION_STORAGE: "SessionStorage",
  TIMEZONE: "TimeZone",
  LANGUAGE: "Language",
  SYSTEM_LANGUAGE: "SystemLanguage",
  COOKIE: "Cookie",
  CANVAS: "Canvas",
  HOSTNAME: "Hostname"
};
var getDisabledKeys2 = () => {
  const DISABLED_KEYS = envHelper_default.getDisabledKeys() || "";
  if (DISABLED_KEYS === "")
    return [];
  const allOptions = [
    FINGERPRINT_KEYS.USERAGENT,
    FINGERPRINT_KEYS.SCREEN_PRINT,
    FINGERPRINT_KEYS.PLUGINS,
    FINGERPRINT_KEYS.FONTS,
    FINGERPRINT_KEYS.LOCAL_STORAGE,
    FINGERPRINT_KEYS.SESSION_STORAGE,
    FINGERPRINT_KEYS.TIMEZONE,
    FINGERPRINT_KEYS.LANGUAGE,
    FINGERPRINT_KEYS.SYSTEM_LANGUAGE,
    FINGERPRINT_KEYS.COOKIE,
    FINGERPRINT_KEYS.CANVAS,
    FINGERPRINT_KEYS.HOSTNAME
  ];
  const response = [];
  DISABLED_KEYS.split("|").forEach((key) => {
    if (key === "") {
      console.log("test");
    } else if (allOptions.includes(key))
      response.push(key);
    else
      console.warn(
        `react-secure-storage : ${key} is not present in the available disabled keys options! Please go through the documentation`
      );
  });
  return response;
};

// src/lib/fingerpint.lib.ts
var ClientJS = class {
  //
  // MAIN METHODS
  //
  // Get Fingerprint.  Return a 32-bit integer representing the browsers fingerprint.
  getFingerprint() {
    const bar = "|";
    const disabledKeys = getDisabledKeys2();
    let key = "";
    if (!disabledKeys.includes(FINGERPRINT_KEYS.USERAGENT)) {
      key += navigator.userAgent + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.HOSTNAME)) {
      key += window.location.hostname + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.SCREEN_PRINT)) {
      key += this.getScreenPrint() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.PLUGINS)) {
      key += this.getPlugins() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.FONTS)) {
      key += this.getFonts() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.LOCAL_STORAGE)) {
      key += this.isLocalStorage() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.SESSION_STORAGE)) {
      key += this.isSessionStorage() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.TIMEZONE)) {
      key += this.getTimeZone() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.LANGUAGE)) {
      key += this.getLanguage() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.SYSTEM_LANGUAGE)) {
      key += this.getSystemLanguage() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.COOKIE)) {
      key += this.isCookie() + bar;
    }
    if (!disabledKeys.includes(FINGERPRINT_KEYS.CANVAS)) {
      key += this.getCanvasPrint();
    }
    if (key.endsWith(bar))
      key = key.substring(0, key.length - 1);
    const seed = 256;
    return (0, import_murmurhash3_gc.default)(key, seed);
  }
  //
  // SCREEN METHODS
  //
  // Get Screen Print.  Return a string containing screen information.
  getScreenPrint() {
    return "Color Depth: " + this.getColorDepth() + ", Device XDPI: " + this.getDeviceXDPI() + ", Device YDPI: " + this.getDeviceYDPI();
  }
  // Get Color Depth.  Return a string containing the color depth.
  getColorDepth() {
    return window.screen.colorDepth;
  }
  // Get Current Resolution.  Return a string containing the current resolution.
  getCurrentResolution() {
    return window.screen.width + "x" + window.screen.height;
  }
  // Get Available Resolution.  Return a string containing the available resolution.
  getAvailableResolution() {
    return window.screen.availWidth + "x" + window.screen.availHeight;
  }
  // Get Device XPDI.  Return a string containing the device XPDI.
  getDeviceXDPI() {
    return "";
  }
  // Get Device YDPI.  Return a string containing the device YDPI.
  getDeviceYDPI() {
    return "";
  }
  //
  // PLUGIN METHODS
  //
  // Get Plugins.  Return a string containing a list of installed plugins.
  getPlugins() {
    let pluginsList = "";
    for (let i = 0; i < navigator.plugins.length; i++) {
      if (i === navigator.plugins.length - 1) {
        pluginsList += navigator.plugins[i].name;
      } else {
        pluginsList += navigator.plugins[i].name + ", ";
      }
    }
    return pluginsList;
  }
  //
  // FONT METHODS
  //
  // Get Fonts.  Return a string containing a list of installed fonts.
  getFonts() {
    const fontString = "";
    return fontString;
  }
  //
  // STORAGE METHODS
  //
  // Is Local Storage.  Check if local storage is enabled.
  isLocalStorage() {
    try {
      return !!localStorage;
    } catch (e) {
      return true;
    }
  }
  // Is Session Storage.  Check if session storage is enabled.
  isSessionStorage() {
    try {
      return !!sessionStorage;
    } catch (e) {
      return true;
    }
  }
  // Is Cookie.  Check if cookies are enabled.
  isCookie() {
    return navigator.cookieEnabled;
  }
  //
  // TIME METHODS
  //
  // Get Time Zone.  Return a string containing the time zone.
  getTimeZone() {
    const rightNow = /* @__PURE__ */ new Date();
    let myNumber, formattedNumber, result;
    myNumber = String(-(rightNow.getTimezoneOffset() / 60));
    if (myNumber < 0) {
      myNumber = myNumber * -1;
      formattedNumber = ("0" + myNumber).slice(-2);
      result = "-" + formattedNumber;
    } else {
      formattedNumber = ("0" + myNumber).slice(-2);
      result = "+" + formattedNumber;
    }
    return result;
  }
  //
  // LANGUAGE METHODS
  //
  // Get Language.  Return a string containing the user language.
  getLanguage() {
    return navigator.language;
  }
  // Get System Language.  Return a string containing the system language.
  getSystemLanguage() {
    return navigator.language || window.navigator.language;
  }
  // Get Canvas Print.  Return a string containing the canvas URI data.
  getCanvasPrint() {
    const canvas = document.createElement("canvas");
    let ctx;
    try {
      ctx = canvas.getContext("2d");
    } catch (e) {
      return "";
    }
    const txt = "ClientJS,org <canvas> 1.0";
    ctx.textBaseline = "top";
    ctx.font = "14px 'Arial'";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#f60";
    ctx.fillRect(125, 1, 62, 20);
    ctx.fillStyle = "#069";
    ctx.fillText(txt, 2, 15);
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
    ctx.fillText(txt, 4, 17);
    return canvas.toDataURL();
  }
};
var clientJS = new ClientJS();
var fingerpint_lib_default = clientJS;

// src/lib/fingerprint.ts
var HASH_KEY = "E86E2612010258B35137";
var getFingerprint = () => {
  const HASH_KEY_CUSTOM = envHelper_default.getHashKey() || HASH_KEY;
  if (typeof window === "undefined")
    return HASH_KEY_CUSTOM;
  return fingerpint_lib_default.getFingerprint() + HASH_KEY_CUSTOM;
};
var fingerprint_default = getFingerprint;

// src/utils/index.tsx
import { env } from "aesirx-lib";
var shortenString = (str, first = 6, last = 4) => {
  return str?.substring(0, first) + "..." + str?.substring(str.length - last);
};
var getClientApp = () => {
  console.log("env", env);
  const endpoint = window["aesirxEndpoint"] ? window["aesirxEndpoint"] : env.REACT_APP_ENDPOINT_URL || env.NEXT_PUBLIC_ENDPOINT_URL || "https://api.aesirx.io";
  const client_id = window["aesirxClientID"] ? window["aesirxClientID"] : env.REACT_APP_SSO_CLIENT_ID || env.NEXT_PUBLIC_SSO_CLIENT_ID || "";
  const client_secret = window["aesirxClientSecret"] ? window["aesirxClientSecret"] : env.REACT_APP_SSO_CLIENT_SECRET || env.NEXT_PUBLIC_SSO_CLIENT_SECRET || "";
  const network = env.REACT_APP_SSO_CONCORDIUM_NETWORK || env.NEXT_PUBLIC_CONCORDIUM_NETWORK || "mainnet";
  const web3Endpoint = window["web3Endpoint"] ? window["web3Endpoint"] : env.REACT_APP_WEB3_API_ENDPOINT || env.NEXT_PUBLIC_WEB3_API_ENDPOINT || "https://web3id.backend.aesirx.io:8001";
  const dappEndpoint = window["dappEndpoint"] ? window["dappEndpoint"] : env.REACT_APP_WEB3_DAPP_URL || env.NEXT_PUBLIC_DAPP_URL || "https://dapp.shield.aesirx.io";
  const partnerEndpoint = window["partnerEndpoint"] ? window["partnerEndpoint"] : env.REACT_APP_PARTNERS_URL || env.NEXT_PUBLIC_PARTNERS_URL || "https://partners.aesirx.io";
  const socketEndpoint = window["socketEndpoint"] ? window["socketEndpoint"] : process.env.REACT_APP_SOCKET_URL || process.env.NEXT_PUBLIC_SOCKET_URL || "https://socket.aesirx.io";
  const registerForm = {
    username: window["registerUsername"] ? window["registerUsername"] : env.REACT_APP_USERNAME || env.NEXT_PUBLIC_USERNAME || 55,
    first_name: window["registerFirstname"] ? window["registerFirstname"] : env.REACT_APP_FIRSTNAME || env.NEXT_PUBLIC_FIRSTNAME || 53,
    last_name: window["registerLastname"] ? window["registerLastname"] : env.REACT_APP_LASTNAME || env.NEXT_PUBLIC_LASTNAME || 66,
    product: window["registerProduct"] ? window["registerProduct"] : env.REACT_APP_PRODUCT || env.NEXT_PUBLIC_PRODUCT || 54,
    email: window["registerEmail"] ? window["registerEmail"] : env.REACT_APP_EMAIL || env.NEXT_PUBLIC_EMAIL || 56,
    organization: window["registerOrganization"] ? window["registerOrganization"] : env.REACT_APP_ORGANIZATION || env.NEXT_PUBLIC_ORGANIZATION || 57,
    message: window["registerMessage"] ? window["registerMessage"] : env.REACT_APP_MESSAGE || env.NEXT_PUBLIC_MESSAGE || 58,
    order_id: window["registerOrderid"] ? window["registerOrderid"] : env.REACT_APP_ORDER_ID || env.NEXT_PUBLIC_ORDER_ID || 64,
    code: window["registerCode"] ? window["registerCode"] : env.REACT_APP_CODE || env.NEXT_PUBLIC_CODE || 65
  };
  return {
    endpoint,
    client_id,
    client_secret,
    network,
    web3Endpoint,
    dappEndpoint,
    registerForm,
    partnerEndpoint,
    socketEndpoint
  };
};
var getChallenge = async (walletAccount) => {
  const { web3Endpoint } = getClientApp();
  try {
    return (await axios.get(`${web3Endpoint}/challenge?account=${walletAccount}`)).data?.challenge;
  } catch (error) {
    console.log("getChallenge", error);
    throw error;
  }
};
var getStatement = async () => {
  const { web3Endpoint } = getClientApp();
  try {
    return (await axios.get(`${web3Endpoint}/statement`)).data;
  } catch (error) {
    console.log("getChallenge", error);
    throw error;
  }
};
var verifyProof = async (challenge, proof) => {
  const { web3Endpoint } = getClientApp();
  try {
    return (await axios.post(
      `${web3Endpoint}/prove`,
      {
        challenge,
        proof
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )).data?.result;
  } catch (error) {
    console.log("getChallenge", error);
    throw error;
  }
};
var validateWeb3Id = async (id) => {
  const { web3Endpoint } = getClientApp();
  try {
    return !(await axios.get(`${web3Endpoint}/preregistration/checkid/${id}`)).data.result;
  } catch (error) {
    return false;
  }
};
var validateEmail = async (email) => {
  const { endpoint, web3Endpoint } = getClientApp();
  try {
    const [validateOnWeb3id, validateOnAesirx] = await Promise.all([
      !(await axios.get(`${web3Endpoint}/preregistration/checkemail/${email}`)).data.result,
      !(await axios.post(
        `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=checkEmailIsUsed&api=hal`,
        {
          email
        }
      )).data.result
    ]);
    return validateOnWeb3id && validateOnAesirx;
  } catch (error) {
    return false;
  }
};
var createMember = async (bodyData) => {
  const { endpoint } = getClientApp();
  try {
    const url = `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal`;
    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });
    console.log("createMember", bodyData);
    if (rs?.ok === false) {
      throw await rs.json();
    }
    return await rs.json();
  } catch (error) {
    console.log("createMember", error);
    throw error;
  }
};
var login = async (username, password) => {
  const { partnerEndpoint } = getClientApp();
  try {
    const url = `${partnerEndpoint}/api/auth/login`;
    const rs = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin",
      body: JSON.stringify({ username, password })
    });
    const data = await rs.json();
    return data;
  } catch (error) {
    console.log("login error", error);
    throw error;
  }
};
var autoRegisterWeb3id = async (data, clientJwt, signedNonce, walletAccount, isLinkWallet) => {
  const { dappEndpoint } = getClientApp();
  try {
    return await axios.post(`${dappEndpoint}/api/autocreate`, {
      data,
      clientJwt,
      signedNonce,
      walletAccount,
      isLinkWallet
    });
  } catch (error) {
    console.log("autoRegisterWeb3id", error);
    throw error;
  }
};
var mintWeb3ID = async (jwt) => {
  const { web3Endpoint } = getClientApp();
  try {
    return await axios.post(
      `${web3Endpoint}/aesirx/account/mint`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt
        }
      }
    );
  } catch (error) {
    console.log("mintWeb3ID", error);
    throw error;
  }
};
var linkAesirXAccount = async (web3id, jwt) => {
  const { web3Endpoint } = getClientApp();
  await axios.put(
    `${web3Endpoint}/preregistration/aesirx/${web3id}`,
    {},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + jwt
      }
    }
  );
};
var checkWalletAccount = async (account, wallet) => {
  const { web3Endpoint } = getClientApp();
  try {
    return await axios.get(
      `${web3Endpoint}/preregistration/checkaccount/${account}?wallet=${wallet}`
    );
  } catch (error) {
    console.log("checkWalletAccount", error);
    throw error;
  }
};
var getPreregistration = async (jwt) => {
  const { web3Endpoint } = getClientApp();
  return await axios.get(`${web3Endpoint}/preregistration/aesirx`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwt
    }
  });
};
var getMember = async (accessToken) => {
  const { endpoint } = getClientApp();
  try {
    const member = await axios.get(
      `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=persona&api=hal&task=getTokenByUser`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken
        }
      }
    );
    if (member?.data?.result?.member_id) {
      const data = await axios.get(
        `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal&id=${member?.data?.result?.member_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken
          }
        }
      );
      return data?.data;
    }
  } catch (error) {
    console.log("getMember", error);
    throw error;
  }
};
var updateMember = async (bodyData, accessToken) => {
  const { endpoint } = getClientApp();
  try {
    const response = await axios.put(
      `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&api=hal`,
      bodyData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`
        }
      }
    );
    return response?.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
var connectWallet = async (address, walletType, accessToken, userName) => {
  try {
    const { endpoint } = getClientApp();
    const response = await axios.post(
      `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=setWallet&api=hal`,
      {
        wallet: walletType,
        publicAddress: address,
        username: userName
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken
        }
      }
    );
    return response?.data;
  } catch (error) {
    console.log("connectWalletError", error);
    throw error;
  }
};
var removeWallet = async (address, walletType, accessToken, userName) => {
  try {
    const { endpoint } = getClientApp();
    const response = await axios.post(
      `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=deleteWallet&api=hal`,
      {
        wallet: walletType,
        publicAddress: address,
        username: userName
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + accessToken
        }
      }
    );
    return response?.data;
  } catch (error) {
    console.log("removeWalletError", error);
    throw error;
  }
};
var createRequestV2 = (endpoint, task) => {
  return `${endpoint}/visitor/v2/${task}`;
};
var trackEvent = async (endpoint, referer, data) => {
  const allow = sessionStorage.getItem("aesirx-analytics-allow");
  if (allow === "0") {
    return null;
  }
  const { location, document: document2 } = window;
  referer = referer ? location.protocol + "//" + location.host + referer : document2.referrer.split("?")[0];
  const url = location.protocol + "//" + location.host + location.pathname;
  const user_agent = window.navigator.userAgent;
  const browser = Bowser.parse(window.navigator.userAgent);
  const browser_name = browser?.browser?.name;
  const browser_version = browser?.browser?.version ?? "0";
  const lang = window.navigator["userLanguage"] || window.navigator.language;
  const device = browser?.platform?.model ?? browser?.platform?.type;
  const ip = "";
  const fingerprint = fingerprint_default();
  const headers = { type: "application/json" };
  const blobData = new Blob(
    [
      JSON.stringify({
        fingerprint,
        url,
        ...referer !== "/" && referer && {
          referer
        },
        user_agent,
        ip,
        browser_name,
        browser_version,
        lang,
        device,
        ...data
      })
    ],
    headers
  );
  const responseStart = navigator.sendBeacon(createRequestV2(endpoint, "start"), blobData);
  return responseStart;
};
var paymentStripeSubscription = async (product_id, metadata) => {
  try {
    const { partnerEndpoint } = getClientApp();
    return await axios.post(`${partnerEndpoint}/api/stripe/checkout`, {
      product_id,
      metadata
    });
  } catch (error) {
    console.log("checkout link error", error);
    throw error;
  }
};

export {
  shortenString,
  getClientApp,
  getChallenge,
  getStatement,
  verifyProof,
  validateWeb3Id,
  validateEmail,
  createMember,
  login,
  autoRegisterWeb3id,
  mintWeb3ID,
  linkAesirXAccount,
  checkWalletAccount,
  getPreregistration,
  getMember,
  updateMember,
  connectWallet,
  removeWallet,
  trackEvent,
  paymentStripeSubscription
};
