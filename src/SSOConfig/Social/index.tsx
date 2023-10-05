import React from 'react';
import {Image} from '../../components/Image';
import { useUserContext } from '../../SSOButton/Providers/user';
import { Button, Form, Spinner } from 'react-bootstrap';
import ButtonCopy from '../../components/ButtonCopy';
import { useState } from 'react';
import { updateMember } from '../../utils/index';
import { useGlobalContext } from '../../SSOButton/Providers/global';
import Toast from '../../components/Toast';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo_google from '../../SSOButton/images/logo_google.svg';
import logo_twitter from '../../SSOButton/images/logo_twitter.svg';
import logo_facebook from '../../SSOButton/images/logo_facebook.svg';
const Social = ({ typeSocial, keySocial }: any) => {
  const { aesirxData, getData } = useUserContext();
  const [loading, setLoading] = useState(false);
  const { accessToken, jwt } = useGlobalContext();
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const connectSocial = async () => {
    try {
      setLoading(true);
      const response: any = await axios.get(
        `${process.env.NEXT_PUBLIC_ENDPOINT_URL}/index.php?webserviceClient=site&webserviceVersion=1.0.0&option=member&task=getSocialConnectUrl&api=hal&socialType=${typeSocial}`,
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
      let timer = setInterval(function () {
        if (popupSocial?.closed) {
          clearInterval(timer);
          setLoading(false);
        }
      }, 1000);

      window.addEventListener(
        'message',
        (e: any) => {
          if (e.origin !== process.env.NEXT_PUBLIC_ENDPOINT_URL) return;
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
      console.error(error);
    }
  };

  const disconnectSocial = async () => {
    let updateSuccess = true;
    setLoading(true);
    try {
      const response: any = await updateMember(
        { id: aesirxData?.member_id, [keySocial]: '' },
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
      await getData(jwt, accessToken);
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
  return (
    <div className="py-2rem px-4 border rounded">
      <h3 className="fw-semibold fs-18 mb-12px text-capitalize">
        <Image
          quality={100}
          className="me-14px"
          src={logoSocial}
          width={40}
          height={40}
          alt="logo social"
        />
        {typeSocial}
      </h3>
      {aesirxData[keySocial] && (
        <Form.Group>
          <Form.Label className="fw-medium mb-12px">ID</Form.Label>
          <div className="position-relative fs-7 mb-12px">
            <Form.Control
              type="email"
              name="email"
              value={aesirxData[keySocial]}
              className={`py-13px fs-7`}
              readOnly={true}
            />
            <ButtonCopy
              content={aesirxData[keySocial]}
              isBlack={true}
              className="border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
            />
          </div>
        </Form.Group>
      )}
      <Button
        type="button"
        variant={`${aesirxData[keySocial] ? 'danger' : 'success'}`}
        className={`fw-semibold py-12px py-12px w-100 ${aesirxData[keySocial] ? '' : 'mt-3'}`}
        onClick={() => {
          if (aesirxData[keySocial]) {
            disconnectSocial();
          } else {
            connectSocial();
          }
        }}
        disabled={loading}
      >
        {loading && <Spinner size={'sm'} className="me-1" />}
        {aesirxData[keySocial] ? (
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
