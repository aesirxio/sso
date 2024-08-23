export {};
declare global {
  interface Window {
    sso_response: any;
    aesirxEndpoint: string;
    web3Endpoint: string;
    dappEndpoint: string;
    partnerEndpoint: string;
    socketEndpoint: string;
    registerUsername: string;
    registerFirstname: string;
    registerLastname: string;
    registerProduct: string;
    registerEmail: string;
    registerOrganization: string;
    registerMessage: string;
    registerOrderid: string;
    registerCode: string;
    aesirxClientID: string;
    aesirxAllowedLogins: any;
    demoUser: string;
    demoPassword: string;
    aesirxSSOState: any;
    aesirxClientSecret: string;
    aesirxSSO: any;
    msCrypto: any;
    referer: any;
    handleSSO: (onGetData: any) => void;
  }
}
declare module '*.png';
declare module '*.svg';
