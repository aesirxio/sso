import React, { useCallback, useContext, useState } from 'react';
import { getClientApp, updateMember, validateEmail } from '../../../utils';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SSOModalContext } from '../../modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { debounce } from 'lodash';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
interface Fields {
  defaultValue: any;
  fieldId: number;
  fieldOptions: Array<any>;
  fieldtype: string;
  name: string;
  required: string;
}
const SSOUpdateEmailProvider = ({ accountInfo }: any) => {
  const [loading, setLoading] = useState(false);
  const { handleOnData } = useContext(SSOModalContext);
  const debouncedCheckEmail: any = useCallback(debounce(validateEmail, 200), []);
  const generateValidationSchema = () => {
    const validationSchema: any = {};
    validationSchema['email'] = Yup.string()
      .email(`Please enter valid email`)
      .required(`Please enter your email`)
      .test(
        'unique',
        'This Email is already taken',
        async (value) => await debouncedCheckEmail(value)
      );
    return validationSchema;
  };
  const formik = useFormik({
    initialValues: { email: '' },
    validationSchema: Yup.object(generateValidationSchema()),
    onSubmit: async (values) => {
      setLoading(true);
      console.log('values', values);
      console.log('accountInfo', accountInfo);
      try {
        const response: any = await updateMember(
          { id: accountInfo?.memberId, ...values },
          accountInfo?.data?.access_token
        );
        console.log('response', response);
        if (response?.result?.success) {
          handleOnData(accountInfo?.data);
        } else {
          toast(response?.result?.message, { closeOnClick: false });
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
        <p>
          Your account is missing an email address.
          <br />
          Please update it to continue.
        </p>
        <Form.Group className="mb-3 w-100">
          <Form.Label className="mb-2">
            Email address <span className="text-danger">*</span>
          </Form.Label>
          <div className="position-relative">
            <Form.Control
              type={'email'}
              name={'email'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values['email']}
              className={`py-13px lh-sm ${
                formik.touched['email'] && formik.errors['email'] ? 'border-danger' : ''
              }`}
            />
          </div>
          {formik.touched['email'] && formik.errors['email'] ? (
            <p className="mt-2 mb-0 p-0 border-0 text-danger d-flex align-items-center">
              <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
              <span className="fs-7 fw-semibold ms-2 lh-1">{formik.errors['email']}</span>
            </p>
          ) : null}
        </Form.Group>
      </div>
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
          'Update'
        )}
      </button>
    </Form>
  );
};

export default SSOUpdateEmailProvider;
