import React from 'react';
const SSOHandle = ({ className, text }) => {
  const endPoint = process.env.REACT_APP_ENDPOINT_SSO_URL;
  const clientID = process.env.REACT_APP_SSO_CLIENT_ID;
  const popupLink = `${endPoint}/index.php?option=authorize&api=oauth2&response_type=code&client_id=${clientID}&state=sso`;
  const handleSSO = () => {
    window.open(popupLink, 'SSO', 'height=650,width=650');
  };
  return (
    <>
      <button type="button" className={`btn ${className}`} onClick={handleSSO}>
        {text}
      </button>
    </>
  );
};
export default SSOHandle;
