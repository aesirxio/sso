import axios from 'axios';
const aesirxSSO = async () => {
  const endPoint = window.aesirxEndpoint ? window.aesirxEndpoint.replace(/\/+$/, '') : '';
  const clientID = window.aesirxClientID ? window.aesirxClientID : '';
  const clientSecret = window.aesirxClientSecret ? window.aesirxClientSecret : '';
  const ssoState = window.aesirxSSOState ? window.aesirxSSOState : 'sso';
  let aesirxSSOLink = `${endPoint}/index.php?option=authorize&api=oauth2&response_type=code&client_id=${clientID}&state=${ssoState}`;
  const queryString = typeof window !== 'undefined' && window.location.search;
  const urlParams = new URLSearchParams(queryString);
  window.handleSSO = async (onGetData) => {
    let popup = window.open(aesirxSSOLink, 'SSO', 'status=1,height=650,width=650');
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
          if (data && typeof window !== 'undefined') {
            window.sso_response = data;
            popup.close();
          }
        }
      },
      false
    );
  };
  if (ssoState && urlParams.get('state') === ssoState) {
    if (urlParams.get('code')) {
      const res = await axios.post(endPoint + '/index.php?option=token&api=oauth2', {
        grant_type: 'authorization_code',
        code: urlParams.get('code'),
        client_id: clientID,
        client_secret: clientSecret,
      });
      if (res.data && typeof window !== 'undefined') {
        window.opener.sso_response = res.data;
        window.close();
      }
    } else if (urlParams.get('error')) {
      typeof window !== 'undefined' && window.close();
    }
  }
};
if (typeof window !== 'undefined') {
  window.aesirxSSO = aesirxSSO();
}
export default aesirxSSO;
