import React from 'react';

const SSOButtonReact = ({ className, text }) => {
  const endPoint = process.env.REACT_APP_ENDPOINT_URL;
  const clientID = process.env.REACT_APP_SSO_CLIENT_ID;
  const popupLink = `${endPoint}/index.php?option=authorize&api=oauth2&response_type=code&client_id=${clientID}&state=sso`;
  const handleSSO = () => {
    window.open(popupLink, 'SSO', 'status=1,height=650,width=650');
  };
  return (
    <>
      <button type="button" className={`btn ${className}`} onClick={handleSSO}>
        {text}
      </button>
    </>
  );
};
export default SSOButtonReact;
