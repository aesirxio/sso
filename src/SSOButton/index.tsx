import React, { useState } from 'react';
import { handleWalletResponse } from '../utils/index';
import Spinner from '../Spinner/index';

interface SSOButtonProps {
  className: string;
  text: string;
  options: any;
  demoUser: string;
  demoPassword: string;
  ssoState: string;
  onGetData: () => void;
}

const SSOButton: React.FC<SSOButtonProps> = ({
  className,
  text,
  onGetData,
  options,
  demoUser,
  demoPassword,
  ssoState,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSSO = async () => {
    setLoading(true);
    handleWalletResponse(
      process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL,
      process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID,
      onGetData,
      options,
      demoUser,
      demoPassword,
      ssoState
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
