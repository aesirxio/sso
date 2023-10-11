import React, { useCallback, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import ButtonCopy from '../../components/ButtonCopy';
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Image } from '../../components/Image';
import mail_logo from '../../SSOButton/images/mail_logo.png';
import * as Yup from 'yup';
import { useUserContext } from '../../SSOButton/Providers/user';
import { useGlobalContext } from '../../SSOButton/Providers/global';
import { debounce } from 'lodash';
import { validateEmail } from '../../utils/index';
import { notify } from '../../components/Toast';
import { updateMember } from '../../utils/index';

const Email = () => {
  const [updating, setUpdating] = useState(false);
  const { aesirxData, getData } = useUserContext();
  const { jwt, accessToken } = useGlobalContext();
  // eslint-disable-next-line
  const debouncedCheckEmail: any = useCallback(debounce(validateEmail, 200), []);
  console.log(aesirxData, 'aesirxData');

  const formik = useFormik({
    initialValues: {
      email: aesirxData?.email,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Please enter your email')
        .test('unique', 'This Email is already taken', async (value) => {
          if (value != aesirxData?.email) {
            return await debouncedCheckEmail(value);
          } else {
            return true;
          }
        }),
    }),
    onSubmit: async (values: any) => {
      let updateSuccess = true;
      setUpdating(true);
      try {
        const response: any = await updateMember(
          { id: aesirxData?.member_id, ...values },
          accessToken
        );
        if (response?.result?.success) {
          notify('Update email sucessfully!', 'success');
        } else {
          updateSuccess = false;
          notify(`${response?._messages?.[0]?.message || 'Something when wrong!'}`, 'error');
        }
      } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log('Error', error);
        updateSuccess = false;
        notify(`${error?.response?.data?._messages?.[0]?.message || error?.message}`, 'error');
      }
      setUpdating(false);
      if (updateSuccess) {
        await getData(jwt, accessToken);
      }
    },
    validateOnMount: true,
  });
  useEffect(() => {
    formik.setFieldValue('email', aesirxData?.email);
  }, [aesirxData?.email]);

  return (
    <div className="py-4 px-4 border rounded">
      <div className="d-flex justify-content-start align-items-center mb-3">
        <Image
          quality={100}
          className="me-2"
          src={mail_logo}
          width={40}
          height={40}
          alt="logo ethereum"
        />
        <p className="fw-semibold fs-18 mb-0 ms-2"> Email</p>
      </div>

      <Form onSubmit={formik.handleSubmit} className="text-start">
        <Form.Group>
          <Form.Label className="fw-medium mb-2">
            Email address<span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative fs-7 mb-2">
            <Form.Control
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values['email']}
              className={`py-2 fs-7 ${
                formik.touched['email'] && formik.errors['email'] ? 'border-danger' : ''
              }`}
            />
            <ButtonCopy
              content={formik.values['email']}
              className="border-0 top-0 bottom-0 p-0 px-2 m-1 bg-gray-100 position-absolute end-0"
            />
          </div>
          {formik.touched['email'] && formik.errors['email'] ? (
            <p className="mt-2 fs-7 mb-12px p-0 bg-white border-0 text-danger d-flex align-items-center">
              <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
              <span className="fs-7 fw-semibold ms-2 lh-1">
                {formik.errors['email'].toString()}
              </span>
            </p>
          ) : null}
        </Form.Group>
        <Button
          type="submit"
          disabled={!formik.isValid || formik.values['email'] == aesirxData?.email || updating}
          variant="success"
          className="fw-semibold py-12px py-12px w-100"
        >
          {formik.values['email'] != aesirxData?.email ? 'Update Email' : 'Connected'}
        </Button>
      </Form>
    </div>
  );
};

export default Email;
