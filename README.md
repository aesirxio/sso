# Integration SSO

## Installation

`npm i aesirx-sso`

#### Usage in SSR site

1. Download sso.js from [https://github.com/aesirxio/sso/releases/latest](https://github.com/aesirxio/sso/releases/latest)
1. copy `sso.js` to your project
1. Add script to `<head>`:

```
<script>
  window.aesirxEndpoint="https://example.com"
  window.aesirxClientSecret="[Replace this with the provided SSO CLIENT ID]"
  window.aesirxClientID="[Replace this with the provided SSO CLIENT SECRET]"
  window.aesirxAllowedLogins=['concordium', 'metamask', 'regular']
</script>
<script async defer src="YOUR_PROJECT_PATH/sso.js"></script>
```

1. `SSO CLIENT ID` replace this with the provided `SSO CLIENT ID` from https://dapp.shield.aesirx.io/licenses
2. `SSO CLIENT SECRET` replace this with the provided `SSO CLIENT SECRET` from https://dapp.shield.aesirx.io/licenses
3. `aesirxAllowedLogins` are for which logins do you want to use and you have wallets set up

- `concordium` - Concordium wallet login
- `metamask` - Metamask wallet login
- `regular` - Regular login to your site

##### Create button with window.handleSSO()

```
<script>
  const onGetData = async (response) => {
    //response is a Object that return from SSO, you can use it to handle Authentication in your Site
  };
  const onClickSSO = async () => {
    await window.handleSSO(onGetData);
  };
</script>
<button onclick="onClickSSO()"> SSO Login </button>

```

#### Usage in ReactJS

##### Add the environment variable file (`.env`)

```
REACT_APP_SSO_CLIENT_ID=[Replace this with the provided SSO CLIENT ID from https://dapp.shield.aesirx.io/licenses]
REACT_APP_SSO_CLIENT_SECRET=[Replace this the provided SSO CLIENT SECRECT from https://dapp.shield.aesirx.io/licenses]
```


##### Using `<SSOButton />` to create Login Button

you can pass `className`, `text`, `options` props and `onGetData` function to control it

`options` are for which logins do you want to use and you have wallets set up:

- `concordium` - Concordium wallet login
- `metamask` - Metamask wallet login
- `regular` - Regular login to your site

```
import { SSOButton } from 'aesirx-sso';

  const onGetData = async (response) => {
    //response is a Object that return from SSO, you can use it to handle Authentication in your App
    /*
    Example:
      const authService = new AesirxAuthenticationApiService();
      await authService.setTokenUser(response, false);
      Storage.setItem('auth', true);
    */
  };

 <SSOButton
    className="btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center mt-3"
    text={"SSO Login"}
    onGetData={onGetData}
    options={['concordium', 'metamask', 'regular']}
/>
```

#### Usage in NextJS

##### Add the environment variable file (`.env`)

```
NEXT_PUBLIC_SSO_CLIENT_ID=[Replace this with the provided SSO CLIENT ID from https://dapp.shield.aesirx.io/licenses]
NEXT_PUBLIC_SSO_CLIENT_SECRET=[Replace this the provided SSO CLIENT SECRECT from https://dapp.shield.aesirx.io/licenses]
```

##### Using `<SSOButton />` to create Login Button

you can pass `className`, `text` props and `onGetData` function to control it

`options` are for which logins do you want to use and you have wallets set up:

- `concordium` - Concordium wallet login
- `metamask` - Metamask wallet login
- `regular` - Regular login to your site

```
import { SSOButton } from 'aesirx-sso';

  const onGetData = async (response) => {
    //response is a Object that return from SSO, you can use it to handle Authentication in your App
    /*
    Example:
       await updateUserData(response.access_token);
      redirectProfile(response.access_token);
    */
  };

 <SSOButton
    className="btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center mt-3"
    text={"SSO Login"}
    onGetData={onGetData}
    options={['concordium', 'metamask', 'regular']}
/>
```
