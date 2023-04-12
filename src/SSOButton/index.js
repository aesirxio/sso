import React from 'react';
import { handleWalletResponse } from '../utils/index';

const SSOButton = ({ className, text, onGetData, options }) => {
  const handleSSO = async () => {
    handleWalletResponse(
      process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL,
      process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
      onGetData,
      options
    );
  };

  return (
    <button type="button" className={`btn ${className}`} onClick={handleSSO}>
      {text}
    </button>
  );
};
export default SSOButton;
