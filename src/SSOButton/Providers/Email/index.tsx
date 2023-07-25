import React, { useContext, useState } from 'react';
import { getClientApp } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SSOModalContext } from '../../modal';

const SSOEmailProvider = () => {
  const [loading, setLoading] = useState(false);
  const { handleOnData } = useContext(SSOModalContext);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      setLoading(true);
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
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="ssoemail" className="form-label">
          Email address
        </label>
        <input type="email" className="form-control" name="ssoemail" />
      </div>
      <div className="mb-3">
        <label htmlFor="ssoepassword" className="form-label">
          Password
        </label>
        <input type="password" className="form-control" name="ssoepassword" required />
      </div>

      <button type="submit" className="btn btn-secondary">
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
