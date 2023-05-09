import React, { useState } from 'react';
import { handleWalletResponse } from '../utils/index';
import Spinner from '../Spinner/index';

const SSOButton = ({ className, text, onGetData, options, demoUser, demoPassword }) => {
  const [loading, setLoading] = useState(false);

  const handleSSO = async () => {
    setLoading(true);
    handleWalletResponse(
      process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL,
      process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
      onGetData,
      options,
      demoUser,
      demoPassword
    );
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <button type="button" className={`btn ${className}`} onClick={handleSSO}>
      {text}
    </button>
  );
};
export default SSOButton;
