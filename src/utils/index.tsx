const handleWalletResponse = (
  _endPoint: string,
  clientID: string,
  onGetData: (_: string) => void,
  aesirxAllowedLogins = ['concordium', 'metamask', 'regular'],
  demoUser?: string,
  demoPassword?: string
) => {
  const endPoint = _endPoint ? new URL(_endPoint)?.origin : 'https://api.aesirx.io/';
  const optionList = aesirxAllowedLogins?.length
    ? aesirxAllowedLogins?.map((item) => `&login[]=${item}`).join('')
    : '';
  const ssoState = 'sso';
  const demoAccount =
    demoUser && demoPassword ? '&demo_user=' + demoUser + '&demo_password=' + demoPassword : '';
  const popupLink = `${endPoint}/index.php?option=authorize&api=oauth2&response_type=code&client_id=${clientID}&state=${ssoState}${optionList}${demoAccount}`;
  const popup = window.open(popupLink, 'SSO', 'status=1,height=750,width=650');
  const timer = setInterval(async () => {
    if (popup.closed) {
      clearInterval(timer);
      if (window['sso_response']) {
        onGetData(window['sso_response']);
      }
    }
  }, 1000);
  window.addEventListener(
    'message',
    (e) => {
      if (e.origin !== endPoint) return;
      if (e.data && e.data.walletResponse) {
        const walletReponse = new URLSearchParams(e.data.walletResponse);
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
        if (data && typeof window !== 'undefined') {
          window.sso_response = data;
          popup.close();
        }
      }
    },
    false
  );
};

const handleRegularReponse = async (
  _endPoint: string,
  ssoState: string,
  clientID: string,
  clientSecret: string
) => {
  const endPoint = _endPoint ? new URL(_endPoint)?.origin : 'https://api.aesirx.io/';
  let cache;
  const queryString = typeof window !== 'undefined' && window.location.search;
  const urlParams = new URLSearchParams(queryString);
  if (ssoState && urlParams.get('state') === ssoState) {
    if (urlParams.get('code')) {
      const fetchData = await fetch(endPoint + '/index.php?option=token&api=oauth2', {
        method: 'POST',
        body: JSON.stringify({
          grant_type: 'authorization_code',
          code: urlParams.get('code'),
          client_id: clientID,
          client_secret: clientSecret,
        }),
        headers: assign({ 'Content-Type': 'application/json' }, { ['x-tracker-cache']: cache }),
      });
      const res = await fetchData.json();
      if (res && typeof window !== 'undefined') {
        window.opener.sso_response = res;
        window.close();
      }
    } else if (urlParams.get('error')) {
      typeof window !== 'undefined' && window.close();
    }
  }
};

const assign = (a: any, b: any) => {
  Object.keys(b).forEach((key) => {
    if (b[key] !== undefined) a[key] = b[key];
  });
  return a;
};

export { handleWalletResponse, handleRegularReponse };
