import {
  autoRegisterWeb3id,
  createMember,
  getChallenge,
  getClientApp,
  getStatement,
  linkAesirXAccount,
  login,
  mintWeb3ID,
  paymentStripeSubscription,
  trackEvent,
  validateEmail,
  validateWeb3Id,
  verifyProof
} from "./chunk-5VDMOXEK.js";

// src/SSOButton/Providers/CreateAccount/index.tsx
import React3, { Suspense, useCallback, useEffect as useEffect2, useState } from "react";
import { toast as toast2 } from "react-toastify";
import { Button, Col, Form as Form2, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { debounce } from "lodash";
import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

// src/SSOButton/Providers/CreateAccount/CustomField.tsx
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";
import { Form, OverlayTrigger, Popover } from "react-bootstrap";

// src/SSOButton/images/circle_info.svg
var circle_info_default = 'data:image/svg+xml,<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">%0A<path d="M9.00008 17.3337C4.39758 17.3337 0.666748 13.6028 0.666748 9.00033C0.666748 4.39783 4.39758 0.666992 9.00008 0.666992C13.6026 0.666992 17.3334 4.39783 17.3334 9.00033C17.3334 13.6028 13.6026 17.3337 9.00008 17.3337ZM9.00008 15.667C10.7682 15.667 12.4639 14.9646 13.7141 13.7144C14.9644 12.4641 15.6667 10.7684 15.6667 9.00033C15.6667 7.23222 14.9644 5.53652 13.7141 4.28628C12.4639 3.03604 10.7682 2.33366 9.00008 2.33366C7.23197 2.33366 5.53628 3.03604 4.28604 4.28628C3.03579 5.53652 2.33341 7.23222 2.33341 9.00033C2.33341 10.7684 3.03579 12.4641 4.28604 13.7144C5.53628 14.9646 7.23197 15.667 9.00008 15.667ZM8.16675 4.83366H9.83342V6.50033H8.16675V4.83366ZM8.16675 8.16699H9.83342V13.167H8.16675V8.16699Z" fill="%23222328"/>%0A</svg>%0A';

// src/SSOButton/Providers/CreateAccount/CustomField.tsx
var CustomField = ({
  formik,
  field,
  isShowEmail,
  isProduct = false,
  defaultProduct,
  hideDefaultProduct,
  productOptions
}) => {
  const { registerForm } = getClientApp();
  const fieldName = field.fieldtype == "email" ? `field${field.fieldId}_1_email` : `field${field.fieldId}_1`;
  if (field.fieldtype === "hidden") {
    return null;
  }
  if (field.name == "Order ID" || field.name === "Message") {
    return null;
  }
  if (field.fieldId?.toString() === registerForm?.product?.toString() && !isProduct || field.fieldId?.toString() === registerForm?.first_name?.toString() || field.fieldId?.toString() === registerForm?.last_name?.toString() || field.fieldId?.toString() === registerForm?.organization?.toString() || !isShowEmail && field.fieldId?.toString() === registerForm?.email?.toString()) {
    return null;
  }
  let listOptions = field?.fieldOptions;
  if (productOptions?.length !== 0 && field.fieldtype === "select") {
    listOptions = field?.fieldOptions.filter(
      (product) => productOptions.includes(product.value)
    );
  }
  const ref = useRef(null);
  return /* @__PURE__ */ React.createElement(
    Form.Group,
    {
      className: `mb-3 w-100 ${hideDefaultProduct && field.fieldtype === "select" ? "d-none" : ""}`
    },
    /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "d-flex align-items-center justify-content-between mb-2 popover-dark",
        ref
      },
      /* @__PURE__ */ React.createElement(Form.Label, { className: "mb-0" }, field.name, field.required == "1" && /* @__PURE__ */ React.createElement("span", { className: "text-danger" }, "*")),
      field.fieldId == registerForm.username && /* @__PURE__ */ React.createElement(
        OverlayTrigger,
        {
          trigger: "hover",
          key: "top",
          placement: "auto-end",
          container: ref,
          overlay: /* @__PURE__ */ React.createElement(Popover, { id: `popover-positioned-top` }, /* @__PURE__ */ React.createElement(Popover.Body, null, /* @__PURE__ */ React.createElement("p", { className: "mb-0" }, "Your Username is your Shield of Privacy ID (SoP ID) that you use across all AesirX services. It helps to anonymize and pseudonymize data to protect your privacy. Note: it cannot be changed later and the @handle is public.")))
        },
        /* @__PURE__ */ React.createElement("img", { src: circle_info_default, alt: "circle_info Icon", width: "16px", height: "16px" })
      )
    ),
    /* @__PURE__ */ React.createElement("div", { className: "position-relative" }, field.fieldId == registerForm.username && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: `position-absolute top-50 translate-middle-y bg-gray-stroke-2 d-flex justify-content-center align-items-center text-primary username_left`
      },
      "@"
    ), field.fieldtype === "textarea" ? /* @__PURE__ */ React.createElement(
      Form.Control,
      {
        as: field.fieldtype,
        rows: 3,
        name: fieldName,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values[fieldName],
        className: `py-13px lh-sm ${formik.touched[fieldName] && formik.errors[fieldName] ? "border-danger" : ""}`
      }
    ) : field.fieldtype === "select" ? /* @__PURE__ */ React.createElement(
      Form.Select,
      {
        name: fieldName,
        disabled: defaultProduct,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        className: `py-13px lh-sm ${formik.touched[fieldName] && formik.errors[fieldName] ? "border-danger" : ""}`,
        defaultValue: defaultProduct ? defaultProduct : "default"
      },
      /* @__PURE__ */ React.createElement("option", { disabled: true, value: "default" }, "--Choose your product--"),
      listOptions?.map((item) => {
        return /* @__PURE__ */ React.createElement("option", { id: item.id, key: item?.id, value: item?.value }, item?.label, " ", item?.price ? !parseInt(item?.price) ? "Free" : `$${parseInt(item?.price)}` : null);
      })
    ) : /* @__PURE__ */ React.createElement(
      Form.Control,
      {
        type: field.fieldtype,
        name: fieldName,
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        value: formik.values[fieldName],
        className: `py-13px lh-sm ${formik.touched[fieldName] && formik.errors[fieldName] ? "border-danger" : ""}  ${field.fieldId == registerForm.username ? "ps-5" : ""}`
      }
    )),
    formik.touched[fieldName] && formik.errors[fieldName] ? /* @__PURE__ */ React.createElement("p", { className: "mt-2 mb-0 p-0 border-0 text-danger d-flex align-items-center" }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faCircleExclamation, width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", { className: "fs-7 fw-semibold ms-2 lh-1" }, formik.errors[fieldName])) : null
  );
};
var CustomField_default = CustomField;

// src/SSOButton/Providers/CreateAccount/FriendlyCaptcha.tsx
import React2, { useEffect, useRef as useRef2 } from "react";
import { WidgetInstance } from "friendly-challenge";
import { toast } from "react-toastify";
var FriendlyCaptcha = ({ setCaptcha }) => {
  const captchaRef = useRef2(null);
  const widget = useRef2();
  useEffect(() => {
    if (!widget.current && captchaRef.current) {
      widget.current = new WidgetInstance(captchaRef.current, {
        doneCallback: (solution) => {
          setCaptcha(solution);
        },
        errorCallback: (err) => {
          console.log(err);
          toast.error("There was an error when trying to solve the Captcha.");
        },
        startMode: "none"
      });
    }
    return () => {
      if (widget.current != void 0)
        widget.current.reset();
    };
  }, [captchaRef]);
  return /* @__PURE__ */ React2.createElement(
    "div",
    {
      ref: captchaRef,
      className: "frc-captcha",
      "data-sitekey": process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA
    }
  );
};
var FriendlyCaptcha_default = FriendlyCaptcha;

// src/SSOButton/Providers/CreateAccount/index.tsx
import { stringMessage } from "@concordium/react-components";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import io from "socket.io-client";
import { AccountAddress, ConcordiumGRPCClient } from "@concordium/web-sdk";
import { env } from "aesirx-lib";
var socket;
var listCol = [12, 12, 12, 12, 12, 12, 12, 12, 12];
var SSOConcordiumProvider = React3.lazy(() => import("./Concordium-35IXYCHK.js"));
var CreateAccount = ({
  formID = 10,
  setShow,
  setIsExist,
  setIsAccountExist,
  accountAddress,
  connection,
  wallet,
  noLogin,
  isNoWallet = false,
  packagesData = {},
  productOptions = [],
  productName,
  socialType = {},
  isRequireEmail,
  hideDefaultProduct = false,
  isRequireConcordium = false,
  defaultValues = [],
  alertButton = {
    isShow: false,
    handleClick: void 0,
    alertWarning: void 0
  }
}) => {
  const [sending, setSending] = useState(false);
  const [captcha, setCaptcha] = useState();
  const [loading, setLoading] = useState("");
  const { registerForm, endpoint, web3Endpoint, partnerEndpoint, socketEndpoint } = getClientApp();
  const debouncedCheckWeb3Id = useCallback(debounce(validateWeb3Id, 200), []);
  const debouncedCheckEmail = useCallback(debounce(validateEmail, 200), []);
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [walletState, setWalletState] = useState({
    wallet,
    accountAddress,
    connection
  });
  const [showCreateButton, setShowCreateButton] = useState(isRequireConcordium ? false : true);
  const [signatureLinkAccount, setSignatureLinkAccount] = useState("");
  const getNonce = async (accountAddress2, connection2, text) => {
    if (walletState?.wallet === "concordium") {
      const nonce = (await axios.get(`${web3Endpoint}/account/${accountAddress2}/nonce?text=${text}`)).data.nonce;
      const signature = await connection2.signMessage(accountAddress2, stringMessage(`${nonce}`));
      const signedNonce = Buffer.from(
        typeof signature === "object" && signature !== null ? JSON.stringify(signature) : signature,
        "utf-8"
      ).toString("base64");
      return signedNonce;
    } else {
      return "";
    }
  };
  useEffect2(() => {
    (async () => {
      if (fetch) {
        try {
          const response = await axios.get(
            `${endpoint}/index.php?option=com_redform&webserviceVersion=1.0.0&webserviceClient=site&id=${formID}&api=hal`
          );
          if (response?.status === 200) {
            setData(response.data?.fields);
            setFetch(false);
          }
        } catch (error) {
          console.log("GetForm Error", error);
          setFetch(false);
        }
      }
    })();
  }, []);
  const [isSellix, setIsSellix] = useState(false);
  const [product, setProduct] = useState();
  const [shareLink, setShareLink] = useState("");
  const [affiliateLink, setAffiliateLink] = useState("");
  const [staffId, setStaffId] = useState("");
  const defaultProduct = packagesData?.default_web3_product ? packagesData?.default_web3_product?.toLowerCase() : "";
  const license = {
    product: packagesData?.license_package ? packagesData?.license_package?.toLowerCase() : "",
    sellix_id: packagesData?.sellix_id,
    product_name: productName,
    period: packagesData?.license_period ?? "monthly",
    scan_type: packagesData?.scan_type,
    number_domains: packagesData?.number_domains
  };
  const generateInitialValue = (data2) => {
    const initialValue = {};
    data2?.forEach((item) => {
      let defaultValue = "";
      if (defaultValues?.length) {
        defaultValue = defaultValues.find((field) => field.id == item.fieldId)?.value ?? "";
      }
      if (item.fieldtype == "email") {
        initialValue[`field${item.fieldId}_1_email`] = "";
      } else if (item.fieldtype == "select") {
        initialValue[`field${item.fieldId}_1`] = Object.keys(packagesData).length || productOptions.length ? defaultProduct : "";
      } else {
        initialValue[`field${item.fieldId}_1`] = defaultValue;
      }
    });
    return initialValue;
  };
  const generateValidationSchema = (data2) => {
    const validationSchema = {};
    data2?.forEach((item) => {
      if (item.required == "1" && item?.fieldId?.toString() !== registerForm.product?.toString()) {
        switch (item.fieldtype) {
          case "email":
            if (!walletState?.accountAddress && !Object.keys(socialType).length) {
              if (item?.fieldId?.toString() == registerForm.email?.toString()) {
                validationSchema[`field${item.fieldId}_1_email`] = Yup.string().email(`Please enter valid email`).required(`Please enter your ${item.name}`).test(
                  "unique",
                  "This Email is already taken",
                  async (value) => await debouncedCheckEmail(value)
                );
              } else {
                validationSchema[`field${item.fieldId}_1_email`] = Yup.string().email(`Please enter valid email`).required(`Please enter your ${item.name}`);
              }
            }
            break;
          case "username":
            validationSchema[`field${item.fieldId}_1`] = Yup.string().min(3, `Your ${item.name} is too short`).max(30, `Your ${item.name} is too long`).matches(/^[a-zA-Z0-9_]{3,20}$/, "Your username is not in the correct format").required(`Please enter your ${item.name}`);
            break;
          case "select":
            if (Object.keys(packagesData).length || productOptions.length) {
              validationSchema[`field${item.fieldId}_1`] = Yup.string().required(
                `Please select ${item.name}`
              );
            }
            break;
          default:
            if (item.fieldId == registerForm.username) {
              validationSchema[`field${item.fieldId}_1`] = Yup.string().min(3, `Your ${item.name} is too short`).max(30, `Your ${item.name} is too long`).test(
                "is_@",
                "Will automatically add @ before your Username. Please delete it.",
                (value) => value?.charAt(0) ? value?.charAt(0) !== "@" : true
              ).test(
                "unique",
                "This Username is already taken",
                async (value) => await debouncedCheckWeb3Id(`@${value}`)
              ).matches(/^[a-zA-Z0-9_]{3,20}$/, "Your Username is not in the correct format").required(`Please enter your Username`);
              break;
            }
            validationSchema[`field${item.fieldId}_1`] = Yup.string().test(
              "isUrl",
              "URL is not allowed",
              (value) => {
                const urlRegex = /^(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))[^\s()<>]+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’])*$/gi;
                const isUrl = urlRegex.test(value);
                return !isUrl;
              }
            );
            break;
        }
      }
    });
    return validationSchema;
  };
  const formik = useFormik({
    initialValues: generateInitialValue(data),
    enableReinitialize: true,
    validateOnMount: true,
    validationSchema: Yup.object(generateValidationSchema(data)),
    onSubmit: async (values) => {
      let isSuccess = true;
      setSending(true);
      try {
        const verify = await axios.post(`${partnerEndpoint}/api/verifyform`, {
          solution: captcha
        });
        if (!verify?.data?.success) {
          const message = verify?.data?.errors?.[0] ? verify?.data?.errors?.[0].replaceAll("_", " ") : "Something went wrong please try again or contact us!";
          toast2.error(message);
          return;
        }
        setLoading("sign");
        const signedNonce = await getNonce(
          walletState?.accountAddress,
          walletState?.connection,
          "Create AesirX Account: {}"
        );
        const data2 = { ...values };
        data2.form_id = formID;
        data2[`field${registerForm.username}_1`] = "@" + data2[`field${registerForm.username}_1`];
        data2[`field${registerForm.product}_1`] = "community";
        const fpPromise = FingerprintJS.load({ monitoring: false });
        const fp = await fpPromise;
        const result = await fp.get();
        data2.visitorId = result.visitorId;
        const apiData = {
          id: data2[`field${registerForm.username}_1`],
          orderId: data2[`field${registerForm.order_id}_1`] ?? "",
          product: data2[`field${registerForm.product}_1`],
          organization: data2[`field${registerForm.organization}_1`] ? data2[`field${registerForm.organization}_1`] : data2[`field${registerForm.email}_1_email`],
          ...data2[`field${registerForm.email}_1_email`] && {
            email: data2[`field${registerForm.email}_1_email`],
            organization: data2[`field${registerForm.email}_1_email`]
          },
          message: data2[`field${registerForm.message}_1`] ?? "",
          visitorId: result.visitorId,
          ...shareLink && {
            refShare2Earn: shareLink
          },
          ...affiliateLink && {
            refAffiliate2Earn: affiliateLink
          }
        };
        console.log("apiData", apiData);
        const crypto = window["crypto"] || window["msCrypto"];
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        const passwordGenerate = array[0];
        const member = {
          username: data2[`field${registerForm.email}_1_email`] ? data2[`field${registerForm.email}_1_email`] : Object.keys(socialType)?.length ? `${socialType?.id}` : `${walletState?.accountAddress}`,
          password: passwordGenerate,
          email: data2[`field${registerForm.email}_1_email`] ? data2[`field${registerForm.email}_1_email`] : Object.keys(socialType)?.length ? `${socialType?.id}@aesirx.io` : `${walletState?.accountAddress}@aesirx.io`,
          organisation: data2[`field${registerForm.email}_1_email`] ? data2[`field${registerForm.email}_1_email`] : Object.keys(socialType)?.length ? `${socialType?.id}` : `${walletState?.accountAddress}`,
          block: 0,
          ...walletState?.wallet === "concordium" ? { wallet_concordium: walletState?.accountAddress } : { wallet_metamask: walletState?.accountAddress },
          ...Object.keys(socialType)?.length ? { [`social_${socialType?.type}`]: socialType?.id } : {},
          web3id: data2[`field${registerForm.username}_1`]
        };
        try {
          setLoading("saving");
          const response = await autoRegisterWeb3id(
            apiData,
            "",
            signedNonce,
            walletState?.accountAddress,
            walletState?.wallet === "concordium" ? true : false
          );
          if (response) {
            const createResponse = await createMember(member);
            const { jwt, access_token } = await login(member?.email, member?.password);
            await linkAesirXAccount(apiData.id, jwt);
            const redFormData = {
              form_id: formID,
              [`field${registerForm.username}_1`]: data2[`field${registerForm.username}_1`],
              [`field${registerForm.first_name}_1`]: data2[`field${registerForm.first_name}_1`],
              [`field${registerForm.last_name}_1`]: data2[`field${registerForm.last_name}_1`],
              [`field${registerForm.product}_1`]: data2[`field${registerForm.product}_1`],
              [`field${registerForm.email}_1[email]`]: data2[`field${registerForm.email}_1_email`] ? data2[`field${registerForm.email}_1_email`] : Object.keys(socialType).length ? `${socialType?.id}@aesirx.io` : `${walletState?.accountAddress}@aesirx.io`,
              [`field${registerForm.organization}_1`]: data2[`field${registerForm.organization}_1`],
              [`field${registerForm.message}_1`]: data2[`field${registerForm.message}_1`],
              [`field${registerForm.order_id}_1`]: data2[`field${registerForm.order_id}_1`] ?? ""
            };
            const formData = new FormData();
            for (const key in redFormData) {
              formData.append(key, redFormData[key] ?? "");
            }
            try {
              await axios.post(`${partnerEndpoint}/api/registersso`, {
                username: member.username,
                buyer_id: createResponse?.result?.user_id,
                userToken: access_token,
                member_id: createResponse?.result?.id,
                web3id: data2[`field${registerForm.username}_1`]
              });
            } catch (error) {
              console.log("register sso error", error);
            }
            await axios.post(
              `${endpoint}/index.php?option=com_redform&task=redform.save&format=json`,
              formData
            );
            if (walletState?.wallet === "concordium") {
              toast2.success(
                `Thank you for signing up, ${data2[`field${registerForm.username}_1`]}! You can now log in to access all of our features and benefits.`
              );
              setIsExist && setIsExist(true);
              setIsAccountExist && setIsAccountExist({ status: true, type: "metamask" });
            } else {
              try {
                await mintWeb3ID(jwt);
              } catch (error) {
                console.log("mint web3 error", error);
              }
              if (walletState?.wallet || Object.keys(socialType).length) {
                toast2.success(
                  `Thank you for signing up, ${data2[`field${registerForm.username}_1`]}! You can now log in to access all of our features and benefits.`
                );
              } else {
                toast2.success(
                  "Please check your email (also check your SPAM folder) to finalize your AesirX Single Sign On account and continue your registration for AesirX Shield of Privacy"
                );
              }
              try {
                await trackEvent(
                  env.REACT_APP_ENDPOINT_ANALYTICS_URL || env.NEXT_PUBLIC_ENDPOINT_ANALYTICS_URL || "https://api.analytics.aesirx.io",
                  location.pathname,
                  {
                    event_name: "Sign Up",
                    event_type: "conversion",
                    attributes: [
                      { name: "sop_id", value: data2[`field${registerForm.username}_1`] },
                      ...walletState?.wallet === "concordium" ? [{ name: "type", value: walletState?.wallet }] : [{ name: "type", value: "email" }]
                    ]
                  }
                );
              } catch (error) {
                console.error("error", error);
              }
              setIsExist && setIsExist(true);
              setIsAccountExist && setIsAccountExist({ status: true, type: "metamask" });
            }
          }
        } catch (error) {
          console.log(error);
          toast2.error(error?.response?.data?.error || error?.message);
        }
      } catch (error) {
        isSuccess = false;
        console.log("Submit Error", error);
        toast2.error(error?.response?.data?.error || error?._messages[0]?.message || error?.message);
      }
      setLoading("");
      setShow && setShow(!isSuccess);
      setSending(false);
    }
  });
  const reorderArr = (i, arr) => {
    return [...arr.slice(i), ...arr.slice(0, i)];
  };
  const reorderedArr = reorderArr(4, data);
  const [proof, setProof] = useState(false);
  const handleProof = async () => {
    try {
      const challenge = await getChallenge(walletState?.accountAddress ?? "");
      const statement = await getStatement();
      const provider = await detectConcordiumProvider();
      const client = new ConcordiumGRPCClient(provider.grpcTransport);
      const accountAddr = AccountAddress.fromBase58(walletState?.accountAddress);
      const accountInfo = await client.getAccountInfo(accountAddr);
      const nationality = accountInfo?.accountCredentials[0]?.value?.contents?.commitments?.cmmAttributes?.nationality;
      const countryOfResidence = accountInfo?.accountCredentials[0]?.value?.contents?.commitments?.cmmAttributes?.countryOfResidence;
      if (!nationality) {
        if (countryOfResidence) {
          statement[0].attributeTag = "countryOfResidence";
        } else {
          statement[0].attributeTag = "idDocIssuer";
        }
      }
      const proof2 = await provider.requestIdProof(
        walletState?.accountAddress ?? "",
        statement,
        challenge
      );
      const re = await verifyProof(challenge, proof2);
      if (re) {
        setProof(true);
      }
      return true;
    } catch (error) {
      setProof(false);
      return false;
    }
  };
  useEffect2(() => {
    if (formik.values[`field${registerForm.product}_1`] && formik.values[`field${registerForm.product}_1`] !== "community") {
      setIsSellix(true);
      setProduct(
        data.filter((item) => item.fieldtype === "select")?.[0].fieldOptions?.find(
          (product2) => product2.value == formik.values[`field${registerForm.product}_1`]
        )
      );
    } else {
      setIsSellix(false);
    }
  }, [formik.values]);
  useEffect2(() => {
    if (window) {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const refShare2EarnUrl = params.get("ref") || sessionStorage.getItem("share2earnRef");
      const refAffiliate2EarnUrl = params.get("refaffiliate") || sessionStorage.getItem("affiliateRef");
      const refStaffId = params.get("refstaff") || sessionStorage.getItem("staffRef");
      setStaffId(refStaffId);
      setShareLink(refShare2EarnUrl);
      setAffiliateLink(refAffiliate2EarnUrl);
    }
  }, []);
  useEffect2(() => {
    if (formik.values[`field${registerForm.username}_1`] && formik.values[`field${registerForm.email}_1_email`]) {
      const createSocketServer = async () => {
        await axios.get(`${socketEndpoint}/api/socket`);
      };
      createSocketServer();
      if (!socket && socketEndpoint) {
        socket = io(socketEndpoint, {
          reconnection: true,
          secure: true,
          rejectUnauthorized: false,
          transports: ["polling"]
        });
      }
      socket.on("connect", () => {
        socket.on("web3id-update", async (msg) => {
          const web3id = formik.values[`field${registerForm.username}_1`] ? `@${formik.values[`field${registerForm.username}_1`].trim()}` : `@${formik.values[`field${registerForm.username}_1`]}`;
          if (msg?.id === web3id) {
            const list = document.getElementById("sellix-container");
            list && list?.removeChild(list.lastChild);
            toast2.success(
              "Please check your email (also check your SPAM folder) to finalize your AesirX Single Sign On account and continue your registration for AesirX Shield of Privacy"
            );
            try {
              await trackEvent(
                env.REACT_APP_ENDPOINT_ANALYTICS_URL || env.NEXT_PUBLIC_ENDPOINT_ANALYTICS_URL || "https://api.analytics.aesirx.io",
                location.pathname,
                {
                  event_name: msg?.trackEventName,
                  event_type: "conversion",
                  attributes: msg?.trackAttributes ?? []
                }
              );
            } catch (error) {
              console.error("error", error);
            }
            setShow && setShow(false);
          }
        });
      });
    }
  }, [
    formik.values[`field${registerForm.username}_1`],
    formik.values[`field${registerForm.email}_1_email`]
  ]);
  const handleStripe = async () => {
    try {
      const metadata = {
        package: formik.values[`field${registerForm.product}_1`],
        form_id: formID,
        requested_username: formik.values[`field${registerForm.username}_1`] ? `@${formik.values[`field${registerForm.username}_1`].trim()}` : `@${formik.values[`field${registerForm.username}_1`]}`,
        firstname: formik.values[`field${registerForm.first_name}_1`],
        surname: formik.values[`field${registerForm.last_name}_1`],
        product: formik.values[`field${registerForm.product}_1`],
        email: formik.values[`field${registerForm.email}_1_email`],
        organization: formik.values[`field${registerForm.organization}_1`],
        message: formik.values[`field${registerForm.message}_1`],
        share_link: shareLink,
        affiliate_link: affiliateLink,
        staff_id: staffId,
        license_period: license?.period,
        license_package: license?.product,
        license_package_name: license?.product_name,
        scan_type: license?.scan_type,
        number_domains: license?.number_domains,
        signature: signatureLinkAccount,
        account_address: walletState?.accountAddress
      };
      const productId = license?.sellix_id ? license?.sellix_id : product?.sku;
      const result = await paymentStripeSubscription(productId, metadata);
      window.open(result?.data?.url, "_blank");
    } catch (error) {
      toast2.error("Something is wrong. Please try again or contact us");
    }
  };
  return /* @__PURE__ */ React3.createElement(React3.Fragment, null, !walletState?.accountAddress && !isNoWallet && /* @__PURE__ */ React3.createElement(React3.Fragment, null, /* @__PURE__ */ React3.createElement("div", { className: "line text-center" }, /* @__PURE__ */ React3.createElement("span", { className: "bg-white px-2 position-relative text-dark" }, "or"))), noLogin && !proof && walletState?.wallet === "concordium" && !isRequireConcordium && /* @__PURE__ */ React3.createElement("div", { className: "d-flex mb-3" }, /* @__PURE__ */ React3.createElement(
    Button,
    {
      variant: "dark",
      className: "fw-medium py-2 px-4 fs-18 lh-sm text-white",
      onClick: () => {
        handleProof();
      }
    },
    "Authorize"
  ), /* @__PURE__ */ React3.createElement("span", { className: "text-danger" }, "*")), !fetch ? data ? /* @__PURE__ */ React3.createElement(Form2, { onSubmit: formik.handleSubmit }, loading && /* @__PURE__ */ React3.createElement("div", { className: "custom-loading position-absolute top-50 start-50 translate-middle z-1 w-100 h-100 d-flex align-items-center justify-content-center" }, /* @__PURE__ */ React3.createElement(
    "span",
    {
      className: "spinner-border spinner-border-lg me-1",
      role: "status",
      "aria-hidden": "true"
    }
  )), /* @__PURE__ */ React3.createElement(Row, null, reorderedArr.map((field, index) => {
    return /* @__PURE__ */ React3.createElement(Col, { key: index, md: listCol[index] }, /* @__PURE__ */ React3.createElement(
      CustomField_default,
      {
        field,
        formik,
        defaultProduct,
        hideDefaultProduct,
        productOptions,
        isShowEmail: (walletState?.accountAddress || Object.keys(socialType).length) && !isRequireEmail ? false : true,
        isProduct: Object.keys(packagesData).length || productOptions?.length ? true : false
      }
    ));
  })), /* @__PURE__ */ React3.createElement(Form2.Check, { className: "mb-10px fs-7", type: "checkbox", id: "check-subsribe" }, /* @__PURE__ */ React3.createElement(Form2.Check.Input, { type: "checkbox", required: true }), /* @__PURE__ */ React3.createElement(Form2.Check.Label, null, "Accept", " ", /* @__PURE__ */ React3.createElement(
    "a",
    {
      className: "fw-semibold text-inherit",
      target: "_blank",
      href: "https://aesirx.io/terms-conditions",
      rel: "noreferrer"
    },
    "Terms"
  ), " ", "&", " ", /* @__PURE__ */ React3.createElement(
    "a",
    {
      className: "fw-semibold text-inherit",
      target: "_blank",
      href: "https://aesirx.io/privacy-policy",
      rel: "noreferrer"
    },
    "Privacy Policy"
  ), " ")), /* @__PURE__ */ React3.createElement("div", { className: "d-flex align-items-start flex-wrap" }, /* @__PURE__ */ React3.createElement("div", { className: `me-4 mb-2 ${isRequireConcordium ? "w-100" : ""}` }, /* @__PURE__ */ React3.createElement(FriendlyCaptcha_default, { setCaptcha })), isRequireConcordium && !showCreateButton && /* @__PURE__ */ React3.createElement("div", { className: "w-auto" }, /* @__PURE__ */ React3.createElement(Suspense, { fallback: /* @__PURE__ */ React3.createElement(React3.Fragment, null, "Loading...") }, /* @__PURE__ */ React3.createElement(
    SSOConcordiumProvider,
    {
      noSignUpForm: true,
      setWalletState,
      setIsAccountExist: () => {
      },
      disabled: !formik.isValid,
      setExpand: async () => {
        const signedNonce = await getNonce(
          walletState?.accountAddress,
          walletState?.connection,
          "Create AesirX Account: {}"
        );
        if (signedNonce) {
          setSignatureLinkAccount(signedNonce);
          signedNonce && setShowCreateButton(true);
        }
      }
    }
  ))), showCreateButton && /* @__PURE__ */ React3.createElement(React3.Fragment, null, !isSellix && !license?.sellix_id ? /* @__PURE__ */ React3.createElement(
    Button,
    {
      disabled: sending || !captcha || !formik.isValid || noLogin && !proof && walletState?.wallet === "concordium",
      type: "submit",
      variant: "success",
      className: "fw-semibold text-white px-4 py-13px lh-sm w-100"
    },
    sending ? "Creating..." : "Create account"
  ) : !captcha || !formik.isValid ? /* @__PURE__ */ React3.createElement(
    Button,
    {
      disabled: sending || !captcha || !formik.isValid || noLogin && !proof && walletState?.wallet === "concordium",
      type: "submit",
      variant: "success",
      className: "fw-semibold text-white px-4 py-13px lh-sm w-100"
    },
    sending ? "Sending" : "Proceed to Purchase"
  ) : alertButton?.isShow && alertButton?.handleClick ? /* @__PURE__ */ React3.createElement(
    Button,
    {
      onClick: alertButton?.handleClick,
      variant: "success",
      className: "fw-semibold text-white px-4 py-13px lh-sm w-100"
    },
    "Proceed to Purchase"
  ) : /* @__PURE__ */ React3.createElement("div", { key: product?.sku }, /* @__PURE__ */ React3.createElement(
    Button,
    {
      disabled: sending || !captcha || !formik.isValid,
      onClick: handleStripe,
      variant: "success",
      className: "fw-semibold text-white px-4 py-13px lh-sm w-100"
    },
    sending ? "Sending" : "Proceed to Purchase"
  )), alertButton?.alertWarning && alertButton?.alertWarning))) : /* @__PURE__ */ React3.createElement("p", { className: "mb-0 text-danger fw-medium" }, "Apologies, an error occurred while retrieving the data.") : "Get data...");
};
var CreateAccount_default = CreateAccount;

export {
  CreateAccount_default
};
