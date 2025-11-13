// src/components/ButtonCopy.tsx
import React2 from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons/faCopy";

// src/SSOButton/images/copy_icon.png
var copy_icon_default = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADTSURBVHgB7ZOxDcIwFEQv3/SwAYYg4ZINYANWgAlgA8QEwAQwStjANCgRJMoGDIDsTygSSGQKEkqu8j/53smSP9BQXtWQUkkhsPoUYGadJNEun1vVC0S85IxrgSPcjQs5UKf0GgYlwLOZCDNmdMhDkMbhwQXo9dREMGRRmB+EsCPPQxdfqgAYUAc1RGioP6AOgLhtDN3y8fUTyWi2tGHiuWXa9H21d+UZCAB7yufSLvT94Tazppm5doUNkU4vZ/3ulXYhiaOl9JXO3jV2AXC3AX6tB0nbPJJGhFMrAAAAAElFTkSuQmCC";

// src/components/ButtonCopy.tsx
import { useState } from "react";

// src/components/ImageIcon.tsx
import React from "react";
var ImageIcon = ({ width, height, src, className }) => {
  return /* @__PURE__ */ React.createElement(
    "span",
    {
      className: `icon-image d-inline-block align-text-bottom ${className}`,
      style: {
        width: `${width ?? 24}px`,
        height: `${height ?? 24}px`,
        WebkitMaskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain"
      }
    }
  );
};
var ImageIcon_default = ImageIcon;

// src/components/ButtonCopy.tsx
function ButtonCopy({ content, className, text, isBlack = false, isReplaceClass, iconClass }) {
  const [copy, setCopy] = useState(false);
  const handleCopy = (content2) => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1500);
    navigator.clipboard.writeText(content2);
  };
  const customClass = isReplaceClass ? className : `fs-8 lh-base font-opensans fw-bold btn btn-success text-body cursor-copy ${className}`;
  return /* @__PURE__ */ React2.createElement("button", { onClick: () => handleCopy(content), disabled: copy, className: customClass }, !copy ? /* @__PURE__ */ React2.createElement(React2.Fragment, null, text, " ", isBlack ? /* @__PURE__ */ React2.createElement("div", { className: "d-flex align-items-center" }, /* @__PURE__ */ React2.createElement(
    ImageIcon_default,
    {
      className: iconClass || "icon-primary",
      src: copy_icon_default,
      width: 16,
      height: 16
    }
  )) : /* @__PURE__ */ React2.createElement(FontAwesomeIcon, { icon: faCopy, width: 16, height: 16, className: "text-body" })) : "COPIED!");
}
var ButtonCopy_default = ButtonCopy;

export {
  ButtonCopy_default
};
