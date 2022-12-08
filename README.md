# Intergration SSO

## Installation
`npm i aesirx-sso`

#### Usage in ReactJS
##### Add the environment variable file (`.env`)

```
REACT_APP_ENDPOINT_URL=https://example.com
REACT_APP_SSO_CLIENT_ID=[REPLACE THIS WITH THE PROVIDED CLIENT_ID]
REACT_APP_SSO_CLIENT_SECRET=[REPLACE THIS WITH THE PROVIDED CLIENT_SECRET]
```

##### Wrap your App in `<SSOContextProvider>`:

```
import { SSOContextProvider } from 'aesirx-sso';

const onGetData = async (data) => {
    const authService = new AesirxAuthenticationApiService();
    await authService.setTokenUser(data, false);
    Storage.setItem('auth', true);
    window.opener.location.reload(false);
};
<SSOContextProvider onGetData={onGetData}>
  <App />
</SSOContextProvider>
```

##### Using `<SSOButton />` to create Login Button
you can pass `className` and `text` props to control it
```
import { SSOButton } from 'aesirx-sso';

 <SSOButton
    className="btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center mt-3"
    text={"SSO Login"}
/>
```