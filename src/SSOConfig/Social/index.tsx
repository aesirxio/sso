import React from 'react';
import { Image } from '../../components/Image';
import { Button, Form, Spinner } from 'react-bootstrap';
import ButtonCopy from '../../components/ButtonCopy';
import { useState } from 'react';
import axios from 'axios';
import Toast from '../../components/Toast';
import { toast } from 'react-toastify';
import logo_google from '../../SSOButton/images/logo_google.svg';
import logo_twitter from '../../SSOButton/images/logo_twitter.svg';
import logo_facebook from '../../SSOButton/images/logo_facebook.svg';
import { useUserContext } from '../../SSOButton/Providers/user';
import { useGlobalContext } from '../../SSOButton/Providers/global';
import { updateMember } from '../../utils/index';
import { MEMBER_GET_FIELD_KEY, AesirxMemberApiService } from 'aesirx-lib';
const Social = ({ typeSocial, keySocial }: any) => {
  const [loading, setLoading] = useState(false);
  const member = new AesirxMemberApiService();
  const { aesirxData, getData } = useUserContext();
  const { accessToken, jwt } = useGlobalContext();

  const connectSocial = async () => {
    try {
      setLoading(true);
      const response: any = await axios.get(
        `${process.env.REACT_APP_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getSocialConnectUrl&api=hal&socialType=${typeSocial}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
        }
      );

      const popupSocial =
        response?.data.result[0] &&
        window.open(response?.data.result[0], 'SSO', 'status=1,height=750,width=650');
      const timer = setInterval(function () {
        if (popupSocial?.closed) {
          clearInterval(timer);
          setLoading(false);
        }
      }, 1000);

      window.addEventListener(
        'message',
        (e: any) => {
          if (e.origin !== process.env.REACT_APP_ENDPOINT_URL) return;
          if (e.data && e.data.socialType) {
            setLoading(false);
            getData(jwt, accessToken);
          } else if (e.data.error) {
            toast.error(<Toast status={false} message={e.data.error} />);
          }
        },
        false
      );
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const disconnectSocial = async () => {
    let updateSuccess = true;
    setLoading(true);
    try {
      const response: any = await updateMember(
        { id: aesirxData[MEMBER_GET_FIELD_KEY.ID], [keySocial]: '' },
        accessToken
      );

      if (response?.result?.success) {
        toast.success(<Toast status={true} message={'Disconnect sucessfully!'} />);
      } else {
        updateSuccess = false;
        toast.error(
          <Toast
            status={false}
            message={response?._messages?.[0]?.message || 'Something when wrong!'}
          />
        );
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('Error', error);
      updateSuccess = false;
      toast.error(
        <Toast
          status={false}
          message={error?.response?.data?._messages?.[0]?.message || error?.message}
        />
      );
    }
    setLoading(false);
    if (updateSuccess) {
      getData(jwt, accessToken);
    }
  };

  let logoSocial = logo_google;
  switch (typeSocial) {
    case 'facebook':
      logoSocial = logo_facebook;
      break;
    case 'twitter':
      logoSocial = logo_twitter;
      break;
  }
  let value = '';
  switch (typeSocial) {
    case 'facebook':
      value = aesirxData?.social_facebook;
      break;
    case 'twitter':
      value = aesirxData?.social_twitter;
      break;
    case 'google':
      value = aesirxData?.social_google;
      break;
  }
  console.log(value, 'value');
  return (
    <div className="py-4 px-4 border rounded">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Image
          quality={100}
          className="me-2"
          src={logoSocial}
          width={40}
          height={40}
          alt="logo social"
        />
        <p className="fw-semibold fs-18  text-capitalize ms-2 mb-0">{typeSocial}</p>
      </div>
      {value && (
        <Form.Group>
          <Form.Label className="fw-medium mb-1">ID</Form.Label>
          <div className="position-relative fs-7 mb-1">
            <Form.Control
              type="email"
              name="email"
              value={value}
              className={`py-13px fs-7`}
              readOnly={true}
            />
            <ButtonCopy
              content={value}
              className="border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
            />
          </div>
        </Form.Group>
      )}
      <Button
        type="button"
        variant={`${value ? 'danger' : 'success'}`}
        className={`fw-semibold py-12px py-12px w-100 ${value ? '' : 'mt-3'}`}
        onClick={() => {
          if (value) {
            disconnectSocial();
          } else {
            connectSocial();
          }
        }}
        disabled={loading}
      >
        {loading && <Spinner size={'sm'} className="me-1" />}
        {value ? (
          'Disconnect'
        ) : (
          <>
            Connect to <span className="text-capitalize">{typeSocial}</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default Social;
