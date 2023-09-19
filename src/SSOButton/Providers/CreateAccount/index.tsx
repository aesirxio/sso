import React, { useCallback, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {
  autoRegisterWeb3id,
  createMember,
  getClientApp,
  login,
  validateEmail,
  validateWeb3Id,
} from '../../../utils';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { debounce } from 'lodash';
import axios from 'axios';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import CustomField from './CustomField';
import FriendlyCaptcha from './FriendlyCaptcha';
import { stringMessage } from '@concordium/react-components';

interface Fields {
  defaultValue: any;
  fieldId: number;
  fieldOptions: Array<any>;
  fieldtype: string;
  name: string;
  required: string;
}
const listCol = [12, 6, 6, 12, 12, 12];
const CreateAccount = ({
  formID = 10,
  setShow,
  setIsExist,
  setIsAccountExist,
  accountAddress,
  connection,
  wallet,
}: any) => {
  const [sending, setSending] = useState(false);
  const [captcha, setCaptcha] = useState<any>();
  const [loading, setLoading] = useState('');
  const { registerForm, endpoint, web3Endpoint, partnerEndpoint } = getClientApp();
  const debouncedCheckWeb3Id: any = useCallback(debounce(validateWeb3Id, 200), []);
  const debouncedCheckEmail: any = useCallback(debounce(validateEmail, 200), []);

  const [data, setData] = useState<any>([]);
  const [fetch, setFetch] = useState(true);

  const getNonce = async (accountAddress: any, connection: any, text: string) => {
    if (wallet === 'concordium') {
      const nonce = (
        await axios.get(`${web3Endpoint}/account/${accountAddress}/nonce?text=${text}`)
      ).data.nonce;

      const signature = await connection.signMessage(accountAddress, stringMessage(`${nonce}`));

      const signedNonce = Buffer.from(
        typeof signature === 'object' && signature !== null ? JSON.stringify(signature) : signature,
        'utf-8'
      ).toString('base64');

      return signedNonce;
    } else {
      return '';
    }
  };

  useEffect(() => {
    (async () => {
      if (fetch) {
        try {
          const response = await axios.get(
            `${endpoint}/index.php?option=com_redform&webserviceVersion=1.0.0&webserviceClient=site&id=${formID}&api=hal`
          );
          if (response?.status === 200) {
            setData(response.data?.fields);
            setFetch(false);
          }
        } catch (error) {
          console.log('GetForm Error', error);
          setFetch(false);
        }
      }
    })();
  }, []);

  const generateInitialValue = (data: any) => {
    const initialValue: { [key: string]: string } = {};
    data?.forEach((item: Fields) => {
      if (item.fieldtype == 'email') {
        initialValue[`field${item.fieldId}_1_email`] = '';
      } else if (item.fieldtype == 'select') {
        initialValue[`field${item.fieldId}_1`] = '';
      } else {
        initialValue[`field${item.fieldId}_1`] = '';
      }
    });
    return initialValue;
  };
  const generateValidationSchema = (data: any) => {
    const validationSchema: any = {};
    data?.forEach((item: Fields) => {
      if (item.required == '1' && item?.fieldId?.toString() !== registerForm.product?.toString()) {
        switch (item.fieldtype) {
          case 'email':
            if (item?.fieldId?.toString() == registerForm.email?.toString()) {
              validationSchema[`field${item.fieldId}_1_email`] = Yup.string()
                .email(`Please enter valid email`)
                .required(`Please enter your ${item.name}`)
                .test(
                  'unique',
                  'This Email is already taken',
                  async (value) => await debouncedCheckEmail(value)
                );
            } else {
              validationSchema[`field${item.fieldId}_1_email`] = Yup.string()
                .email(`Please enter valid email`)
                .required(`Please enter your ${item.name}`);
            }
            break;
          case 'username':
            validationSchema[`field${item.fieldId}_1`] = Yup.string()
              .min(3, `Your ${item.name} is too short`)
              .max(30, `Your ${item.name} is too long`)
              .required(`Please enter your ${item.name}`);
            break;

          case 'select':
            break;

          default:
            if (item.fieldId == registerForm.username) {
              validationSchema[`field${item.fieldId}_1`] = Yup.string()
                .min(3, `Your ${item.name} is too short`)
                .max(30, `Your ${item.name} is too long`)
                .test(
                  'is_@',
                  'Will automatically add @ before your web3id. Please delete it.',
                  (value) => (value?.charAt(0) ? value?.charAt(0) !== '@' : true)
                )
                .test(
                  'unique',
                  'This ID is already taken',
                  async (value) => await debouncedCheckWeb3Id(`@${value}`)
                )
                .required(`Please enter your ${item.name}`);
              break;
            }
            validationSchema[`field${item.fieldId}_1`] = Yup.string()
              .required(`Please enter your ${item.name}`)
              .test('isUrl', 'URL is not allowed', (value) => {
                const urlRegex =
                  /^(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))[^\s()<>]+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’])*$/gi;
                const isUrl = urlRegex.test(value);
                return !isUrl;
              });
            break;
        }
      }
    });
    return validationSchema;
  };
  const formik = useFormik({
    initialValues: generateInitialValue(data),
    validationSchema: Yup.object(generateValidationSchema(data)),
    onSubmit: async (values) => {
      let isSuccess = true;
      setSending(true);
      try {
        const verify = await axios.post(`${partnerEndpoint}/api/verifyform`, {
          solution: captcha,
        });

        if (!verify?.data?.success) {
          const message = verify?.data?.errors?.[0]
            ? verify?.data?.errors?.[0].replaceAll('_', ' ')
            : 'Something went wrong please try again or contact us!';
          toast.error(message);
          return;
        }
        setLoading('sign');

        const signedNonce = await getNonce(accountAddress, connection, 'Create AesirX Account: {}');

        const data: any = { ...values };
        data.form_id = formID;
        data[`field${registerForm.username}_1`] = '@' + data[`field${registerForm.username}_1`];
        data[`field${registerForm.product}_1`] = 'community';

        const fpPromise = FingerprintJS.load({ monitoring: false });
        const fp = await fpPromise;
        const result = await fp.get();
        data.visitorId = result.visitorId;
        const apiData = {
          id: data[`field${registerForm.username}_1`],
          orderId: data[`field${registerForm.order_id}_1`] ?? '',
          first_name: data[`field${registerForm.first_name}_1`],
          sur_name: data[`field${registerForm.last_name}_1`],
          product: data[`field${registerForm.product}_1`],
          organization:
            data[`field${registerForm.organization}_1`] ??
            data[`field${registerForm.email}_1_email`],
          email: data[`field${registerForm.email}_1_email`],
          message: data[`field${registerForm.message}_1`] ?? '',
          visitorId: result.visitorId,
        };

        const crypto = window['crypto'] || window['msCrypto'];
        const array = new Uint32Array(1);
        crypto.getRandomValues(array); // Compliant for security-sensitive use cases
        const passwordGenerate = array[0];

        const member = {
          username: data[`field${registerForm.email}_1_email`],
          password: passwordGenerate,
          organisation: data[`field${registerForm.organization}_1`]
            ? data[`field${registerForm.organization}_1`]
            : data[`field${registerForm.email}_1_email`],
          email: data[`field${registerForm.email}_1_email`],
          block: 0,
          ...(wallet === 'concordium'
            ? { wallet_concordium: accountAddress }
            : { wallet_metamask: accountAddress }),
        };
        const createResponse = await createMember(member);
        if (createResponse?.result?.success) {
          const { jwt } = await login(member?.username, member?.password);
          setLoading('saving');
          try {
            const response = await autoRegisterWeb3id(
              apiData,
              jwt,
              signedNonce,
              accountAddress,
              wallet === 'concordium' ? true : false
            );
            if (response) {
              toast.success('Successfully.');
              setIsExist(true);
              setIsAccountExist({ status: true, type: 'concordium' });
            }
          } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.error || error?.message);
          }
        }
      } catch (error: any) {
        isSuccess = false;
        console.log('Submit Error', error);
        toast.error(error?.response?.data?.error || error?._messages[0]?.message || error?.message);
      }
      setLoading('');
      setShow(!isSuccess);
      setSending(false);
    },
  });
  return (
    <>
      {!fetch ? (
        data ? (
          <Form onSubmit={formik.handleSubmit}>
            {loading && (
              <div className="custom-loading position-absolute top-50 start-50 translate-middle z-1 w-100 h-100 d-flex align-items-center justify-content-center">
                <span
                  className="spinner-border spinner-border-lg me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
              </div>
            )}
            <Row>
              {data?.map((field: Fields, index: number) => {
                return (
                  <Col key={index} md={listCol[index]}>
                    <CustomField field={field} formik={formik} />
                  </Col>
                );
              })}
            </Row>
            <p className="fst-italic mb-3 fs-7 text-primary">
              Disclaimer : The ID @Username is public
            </p>
            <Form.Check className="mb-10px fs-7 text-primary" type="checkbox" id="check-subsribe">
              <Form.Check.Input type="checkbox" required />
              <Form.Check.Label>
                Accept our{' '}
                <a
                  className="fw-semibold"
                  target={'_blank'}
                  href="https://aesirx.io/terms-conditions"
                  rel="noreferrer"
                >
                  Terms and conditions
                </a>{' '}
                and{' '}
                <a
                  className="fw-semibold"
                  target={'_blank'}
                  href="https://aesirx.io/privacy-policy"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>{' '}
              </Form.Check.Label>
            </Form.Check>
            <Form.Check type="checkbox" className="mb-4 fs-7 text-primary" id="check-newletter">
              <Form.Check.Input type="checkbox" />
              <Form.Check.Label>Sign up for our newsletter</Form.Check.Label>
            </Form.Check>
            <div className="d-flex align-items-start">
              {!captcha || !formik.isValid ? (
                <Button
                  disabled={sending || !captcha || !formik.isValid}
                  type="submit"
                  variant="success"
                  className="fw-semibold text-white px-4 py-13px lh-sm me-4"
                >
                  {sending ? 'Sending' : 'Send inquiry'}
                </Button>
              ) : (
                <Button
                  disabled={sending || !captcha || !formik.isValid}
                  type="submit"
                  variant="success"
                  className="fw-semibold text-white px-4 py-13px lh-sm me-4"
                >
                  {sending ? 'Sending' : 'Send inquiry'}
                </Button>
              )}
              <FriendlyCaptcha setCaptcha={setCaptcha} />
            </div>
          </Form>
        ) : (
          <p className="mb-0 text-danger fw-medium">
            Apologies, an error occurred while retrieving the data.
          </p>
        )
      ) : (
        'Get data...'
      )}
    </>
  );
};

export default CreateAccount;
