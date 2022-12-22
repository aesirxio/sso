# Integration SSO

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

<SSOContextProvider>
  <App />
</SSOContextProvider>
```

##### Using `<SSOButton />` to create Login Button
you can pass `className`, `text` props and `onGetData` function to control it
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
/>
```

#### Usage in NextJS
##### Add the environment variable file (`.env`)

```
NEXT_PUBLIC_ENDPOINT_URL=https://example.com
NEXT_PUBLIC_SSO_CLIENT_ID=[REPLACE THIS WITH THE PROVIDED CLIENT_ID]
NEXT_PUBLIC_SSO_CLIENT_SECRET=[REPLACE THIS WITH THE PROVIDED CLIENT_SECRET]
```

##### Wrap your App in `<SSOContextProvider>`:

```
import { SSOContextProvider } from 'aesirx-sso';

<SSOContextProvider>
  <App />
</SSOContextProvider>
```

##### Using `<SSOButton />` to create Login Button
you can pass `className`, `text` props and `onGetData` function to control it
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
/>
```
