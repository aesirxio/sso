import React, { useContext, useState } from 'react';
import { getClientApp } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SSOModalContext } from '../../modal';
import { env } from 'aesirx-lib';

const SSOEmailProvider = ({
  btnClass = '',
  spacingClass = '',
  noLabel = false,
  forgotPasswordLink = '',
}: any) => {
  const [loading, setLoading] = useState(false);
  const { handleOnData, demoUser, demoPassword } = useContext(SSOModalContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const { endpoint, client_id, client_secret } = getClientApp();

      const form = event.target;

      const formData = new FormData(form);
      const queryString = typeof window !== 'undefined' && window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const organisationParams = urlParams.get('organisationId');
      const returnParams = urlParams.get('return');
      const channelTypeParams = urlParams.get('channel_type');

      const reqAuthFormData = {
        username: formData.get('ssoemail'),
        password: formData.get('ssoepassword'),
        client_id: client_id,
        client_secret: client_secret,
        grant_type: 'password',
        ...(channelTypeParams && { channel_type: channelTypeParams }),
        ...(returnParams && { return: returnParams }),
        ...(organisationParams && { organisationId: organisationParams }),
      };
      const ssoState = env.REACT_APP_HEADER_JWT === 'true' ? 'noscopes' : '';
      const config = {
        method: 'post',
        url: `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=token&api=oauth2${
          ssoState === 'noscopes' ? '&state=noscopes' : ''
        }`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: reqAuthFormData,
      };

      const { data: result } = await axios(config);

      handleOnData(result);
      setLoading(false);
    } catch (error) {
      console.log('errorerrorerror', error);
      toast('Wrong authentication', { closeOnClick: false });
      setLoading(false);
      return false;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {demoUser && demoUser && (
        <>
          <h5 className="text-primary">Demo email: {demoUser} </h5>
          <h5 className="mb-3 text-primary">Demo password: {demoPassword} </h5>
        </>
      )}
      <div className={`${spacingClass ? spacingClass : 'mb-4'}`}>
        {!noLabel && (
          <label htmlFor="ssoemail" className="form-label text-primary mb-2">
            Email address
          </label>
        )}
        <input
          type="email"
          className="form-control lh-sm border"
          name="ssoemail"
          defaultValue={demoUser}
        />
      </div>
      <div className={`${spacingClass ? spacingClass : 'mb-4'}`}>
        {!noLabel && (
          <label htmlFor="ssoepassword" className="form-label text-primary mb-2">
            Password
          </label>
        )}
        <input
          type="password"
          className="form-control lh-sm border"
          name="ssoepassword"
          defaultValue={demoPassword}
          required
        />
      </div>
      <p className={`text-end ${spacingClass ? spacingClass : 'mb-4'}`}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${
            forgotPasswordLink
              ? forgotPasswordLink
              : 'https://dapp.shield.aesirx.io/auth/forgot-password'
          }`}
          className="text-decoration-none"
        >
          Forgot password ?
        </a>
      </p>
      <button
        type="submit"
        className={`${btnClass ? btnClass : 'btn btn-success w-100 lh-sm text-white fw-semibold'}`}
      >
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
          'Login'
        )}
      </button>
    </form>
  );
};

export default SSOEmailProvider;
