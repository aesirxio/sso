# Intergration SSO

## Setup instructions
#### Required install aesirx-dma-lib package
`npm i aesirx-dma-lib`

#### Usage in ReactJS

`npm i aesirx-sso`

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

##### Using `<SSOButtonReact />` to create Login Button
you can pass `className` and `text` props to control it
```
import { SSOButtonReact } from 'aesirx-sso';

 <SSOButtonReact
    className="btn w-100 fw-medium btn-success position-relative d-flex align-item-center justify-content-center mt-3"
    text={"SSOLogin"}
/>
```