import { handleRegularReponse, handleWalletResponse } from './utils/index';

const aesirxSSO = async () => {
  window.handleSSO = async (onGetData) => {
    handleWalletResponse(
      window.aesirxEndpoint,
      window.aesirxClientID,
      onGetData,
      window.aesirxAllowedLogins
    );
  };
  handleRegularReponse(
    window.aesirxEndpoint,
    window.aesirxSSOState ? window.aesirxSSOState : 'sso',
    window.aesirxClientID,
    window.aesirxClientSecret
  );
};
if (typeof window !== 'undefined') {
  window.aesirxSSO = aesirxSSO();
}

export default aesirxSSO;
