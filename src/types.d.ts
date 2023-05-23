export {};
declare global {
  interface Window {
    sso_response: any;
    aesirxEndpoint: string;
    aesirxClientID: string;
    aesirxAllowedLogins: any;
    demoUser: string;
    demoPassword: string;
    aesirxSSOState: any;
    aesirxClientSecret: string;
    aesirxSSO: any;
    handleSSO: (onGetData: any) => void;
  }
}
