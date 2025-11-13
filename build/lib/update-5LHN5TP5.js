import {
  SSOModalContext
} from "./chunk-C2QB5TE4.js";
import {
  updateMember,
  validateEmail
} from "./chunk-5VDMOXEK.js";
import "./chunk-L4YLJHLJ.js";

// src/SSOButton/Providers/Email/update.tsx
import React, { useCallback, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { debounce } from "lodash";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
var SSOUpdateEmailProvider = ({ accountInfo }) => {
  const [loading, setLoading] = useState(false);
  const { handleOnData } = useContext(SSOModalContext);
  const debouncedCheckEmail = useCallback(debounce(validateEmail, 200), []);
  const generateValidationSchema = () => {
    const validationSchema = {};
    validationSchema["email"] = Yup.string().email(`Please enter valid email`).required(`Please enter your email`).test(
      "unique",
      "This Email is already taken",
      async (value) => await debouncedCheckEmail(value)
    );
    return validationSchema;
  };
  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: Yup.object(generateValidationSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        console.log("accountInfo", accountInfo);
        const response = await updateMember(
          { id: accountInfo?.memberId, sendmail: 1, ...values },
          accountInfo?.data?.access_token
        );
        if (response?.result?.success) {
          handleOnData(accountInfo?.data);
        } else {
          toast(response?.result?.message, { closeOnClick: false });
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  });
  return /* @__PURE__ */ React.createElement(Form, { onSubmit: formik.handleSubmit }, /* @__PURE__ */ React.createElement("div", { className: "mb-4" }, /* @__PURE__ */ React.createElement("p", null, "Your account is missing an email address.", /* @__PURE__ */ React.createElement("br", null), "Please update it to continue."), /* @__PURE__ */ React.createElement(Form.Group, { className: "mb-3 w-100" }, /* @__PURE__ */ React.createElement(Form.Label, { className: "mb-2" }, "Email address ", /* @__PURE__ */ React.createElement("span", { className: "text-danger" }, "*")), /* @__PURE__ */ React.createElement("div", { className: "position-relative" }, /* @__PURE__ */ React.createElement(
    Form.Control,
    {
      type: "email",
      name: "email",
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
      value: formik.values["email"],
      className: `py-13px lh-sm ${formik.touched["email"] && formik.errors["email"] ? "border-danger" : ""}`
    }
  )), formik.touched["email"] && formik.errors["email"] ? /* @__PURE__ */ React.createElement("p", { className: "mt-2 mb-0 p-0 border-0 text-danger d-flex align-items-center" }, /* @__PURE__ */ React.createElement(FontAwesomeIcon, { icon: faCircleExclamation, width: 14, height: 14 }), /* @__PURE__ */ React.createElement("span", { className: "fs-7 fw-semibold ms-2 lh-1" }, formik.errors["email"])) : null)), /* @__PURE__ */ React.createElement("button", { type: "submit", className: "btn btn-success w-100 lh-sm text-white fw-semibold" }, loading ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(
    "span",
    {
      className: "spinner-border spinner-border-sm me-1",
      role: "status",
      "aria-hidden": "true"
    }
  ), "Waiting...") : "Update"));
};
var update_default = SSOUpdateEmailProvider;
export {
  update_default as default
};
