import React, { useContext, useState } from 'react';
import { getClientApp } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SSOModalContext } from '../../modal';

const SSOEmailProvider = () => {
  const [loading, setLoading] = useState(false);
  const { handleOnData, demoUser, demoPassword } = useContext(SSOModalContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { endpoint, client_id, client_secret } = getClientApp();

      const form = event.target;

      const formData = new FormData(form);

      const reqAuthFormData = {
        username: formData.get('ssoemail'),
        password: formData.get('ssoepassword'),
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'password',
      };

      const config = {
        method: 'post',
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=token&api=oauth2`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: reqAuthFormData,
      };

      const { data: result } = await axios(config);

      handleOnData(result);
    } catch (error) {
      toast('Wrong authentication', { closeOnClick: false });
      return false;
    }
    setLoading(false);
  };
  return (
    <form className="px-3" onSubmit={handleSubmit}>
      <div className="line mb-4 text-center">
        <span className="bg-white px-2 position-relative">or</span>
      </div>
      {demoUser && demoUser && (
        <>
          <h5 className="text-primary">Demo email: {demoUser} </h5>
          <h5 className="mb-3 text-primary">Demo password: {demoPassword} </h5>
        </>
      )}
      <div className="mb-4">
        <label htmlFor="ssoemail" className="form-label text-primary mb-2">
          Email address
        </label>
        <input
          type="email"
          className="form-control lh-sm"
          name="ssoemail"
          defaultValue={demoUser}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="ssoepassword" className="form-label text-primary mb-2">
          Password
        </label>
        <input
          type="password"
          className="form-control lh-sm"
          name="ssoepassword"
          defaultValue={demoPassword}
          required
        />
      </div>
      <p className="text-end mb-4">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://dapp.shield.aesirx.io/auth/forgot-password"
          className="text-decoration-none"
        >
          Forgot password ?
        </a>
      </p>
      <button type="submit" className="btn btn-success w-100 lh-sm text-white fw-semibold">
        {loading ? (
          <>
            <span
              className="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            Waiting...
          </>
        ) : (
          'Log in'
        )}
      </button>
    </form>
  );
};

export default SSOEmailProvider;
