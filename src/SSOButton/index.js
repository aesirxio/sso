import React from 'react';

const SSOButton = ({ className, text, onGetData, options }) => {
  const endPoint = process.env.REACT_APP_ENDPOINT_URL ?? process.env.NEXT_PUBLIC_ENDPOINT_URL;
  const clientID = process.env.REACT_APP_SSO_CLIENT_ID ?? process.env.NEXT_PUBLIC_SSO_CLIENT_ID;
  const optionList = options?.length
    ? options
        ?.map((item) => {
          return `&login[]=${item}`;
        })
        .join('')
    : '';
  const popupLink = `${endPoint}/index.php?option=authorize&api=oauth2&response_type=code&client_id=${clientID}&state=sso${optionList}`;
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
    window.addEventListener(
      'message',
      (e) => {
        if (e.origin !== endPoint) return;
        if (e.data && e.data.walletResponse) {
          let walletReponse = new URLSearchParams(e.data.walletResponse);
          const data = { profile: { lastVisitDate: '' } };
          walletReponse.get('access_token') &&
            Object.assign(data, { access_token: walletReponse.get('access_token') });
          walletReponse.get('expires_in') &&
            Object.assign(data, { expires_in: walletReponse.get('expires_in') });
          walletReponse.get('refresh_token') &&
            Object.assign(data, { refresh_token: walletReponse.get('refresh_token') });
          walletReponse.get('scope') && Object.assign(data, { scope: walletReponse.get('scope') });
          walletReponse.get('token_type') &&
            Object.assign(data, { scope: walletReponse.get('token_type') });
          walletReponse.get('jwt') && Object.assign(data, { jwt: walletReponse.get('jwt') });
          onGetData(data);
          popup.close();
        }
      },
      false
    );
  };

  return (
    <button type="button" className={`btn ${className}`} onClick={handleSSO}>
      {text}
    </button>
  );
};
export default SSOButton;
