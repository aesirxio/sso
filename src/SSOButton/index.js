import React from 'react';

const SSOButton = ({ className, text, onGetData }) => {
  const endPoint = process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const clientID = process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID;
  const popupLink = `${endPoint}/index.php?option=authorize&api=oauth2&response_type=code&client_id=${clientID}&state=sso`;
  const handleSSO = async () => {
    let popup = window.open(popupLink, 'SSO', 'status=1,height=650,width=650');

    var timer = setInterval(async () => {
      if (popup.closed) {
        clearInterval(timer);
        if (window.sso_response) {
          onGetData(window.sso_response);
        }
      }
    }, 1000);
  };
  return (
    <button type="button" className={`btn ${className}`} onClick={handleSSO}>
      {text}
    </button>
  );
};
export default SSOButton;
