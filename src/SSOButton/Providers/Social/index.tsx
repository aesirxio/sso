import React, { useContext, useState } from 'react';
import { getClientApp } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SSOModalContext } from '../../modal';

const SSOSocialProvider = ({ typeSocial }: any) => {
  const [loading, setLoading] = useState(false);
  const [isAccountExist, setIsAccountExist] = useState(true);
  const { handleOnData, demoUser, demoPassword } = useContext(SSOModalContext);
  const { endpoint } = getClientApp();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response: any = await axios.get(
        `${endpoint}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=${
          isAccountExist ? 'getSocialLoginUrl' : 'getSocialCreateUrl'
        }&api=hal&socialType=${typeSocial}`
      );
      response?.data.result[0] &&
        window.open(response?.data.result[0], 'SSO', 'status=1,height=750,width=650');
      window.addEventListener(
        'message',
        (e) => {
          if (e.origin !== endpoint) return;
          if (e.data && e.data.socialLogin) {
            const dataLogin = JSON.parse(e.data.socialLogin);
            handleOnData(dataLogin);
          } else if (e.data.error) {
            setIsAccountExist(false);
          }
        },
        false
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  return (
    <form className="mt-3" onSubmit={handleSubmit}>
      {!isAccountExist && (
        <div className="text-danger text-center">Your account not link to {typeSocial} yet</div>
      )}
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
          <>
            {isAccountExist ? 'Login' : 'Create account'} with{' '}
            <span className="text-capitalize">{typeSocial}</span>
          </>
        )}
      </button>
    </form>
  );
};

export default SSOSocialProvider;
