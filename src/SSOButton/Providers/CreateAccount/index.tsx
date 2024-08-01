import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {
  autoRegisterWeb3id,
  createMember,
  getChallenge,
  getClientApp,
  getStatement,
  linkAesirXAccount,
  login,
  mintWeb3ID,
  trackEvent,
  validateEmail,
  validateWeb3Id,
  verifyProof,
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
import { detectConcordiumProvider } from '@concordium/browser-wallet-api-helpers';
import io from 'socket.io-client';
import { SSOModalContext } from '../../modal';
import { AccountAddress, ConcordiumGRPCClient } from '@concordium/web-sdk';

let socket: any;
interface Fields {
  defaultValue: any;
  fieldId: number;
  fieldOptions: Array<any>;
  fieldtype: string;
  name: string;
  required: string;
}
const listCol = [12, 12, 12, 12, 12, 12, 12, 12, 12];
const SSOConcordiumProvider = React.lazy(() => import('../Concordium'));

const CreateAccount = ({
  formID = 10,
  setShow,
  setIsExist,
  setIsAccountExist,
  accountAddress,
  connection,
  wallet,
  noLogin,
  isNoWallet = false,
  packagesData = {},
  productOptions = [],
  productName,
  socialType = {},
  isRequireEmail,
  hideDefaultProduct = false,
  isRequireConcordium = false,
  alertButton = {
    isShow: false,
    handleClick: undefined,
    alertWarning: undefined,
  },
}: any) => {
  const [sending, setSending] = useState(false);
  const [captcha, setCaptcha] = useState<any>();
  const [loading, setLoading] = useState('');
  const { registerForm, endpoint, web3Endpoint, partnerEndpoint } = getClientApp();
  const debouncedCheckWeb3Id: any = useCallback(debounce(validateWeb3Id, 200), []);
  const debouncedCheckEmail: any = useCallback(debounce(validateEmail, 200), []);
  const [data, setData] = useState<any>([]);
  const [fetch, setFetch] = useState(true);

  const [walletState, setWalletState] = useState({
    wallet: wallet,
    accountAddress: accountAddress,
    connection: connection,
  });
  const [showCreateButton, setShowCreateButton] = useState(isRequireConcordium ? false : true);
  const [signatureLinkAccount, setSignatureLinkAccount] = useState('');

  const getNonce = async (accountAddress: any, connection: any, text: string) => {
    if (walletState?.wallet === 'concordium') {
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

  const [isSellix, setIsSellix] = useState(false);
  const [product, setProduct] = useState<any>();
  const [shareLink, setShareLink] = useState('');
  const [affiliateLink, setAffiliateLink] = useState('');
  const [staffId, setStaffId] = useState('');

  const defaultProduct = packagesData?.default_web3_product
    ? packagesData?.default_web3_product?.toLowerCase()
    : '';

  // License of AESIRX
  const license = {
    product: packagesData?.license_package ? packagesData?.license_package?.toLowerCase() : '',
    sellix_id: packagesData?.sellix_id,
    product_name: productName,
    period: packagesData?.license_period ?? 'monthly',
    scan_type: packagesData?.scan_type,
    number_domains: packagesData?.number_domains,
  };

  const generateInitialValue = (data: any) => {
    const initialValue: { [key: string]: string } = {};
    data?.forEach((item: Fields) => {
      if (item.fieldtype == 'email') {
        initialValue[`field${item.fieldId}_1_email`] = '';
      } else if (item.fieldtype == 'select') {
        initialValue[`field${item.fieldId}_1`] =
          Object.keys(packagesData).length || productOptions.length ? defaultProduct : '';
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
            if (!walletState?.accountAddress && !Object.keys(socialType).length) {
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
            }
            break;
          case 'username':
            validationSchema[`field${item.fieldId}_1`] = Yup.string()
              .min(3, `Your ${item.name} is too short`)
              .max(30, `Your ${item.name} is too long`)
              .matches(/^[a-zA-Z0-9_]{3,20}$/, 'Your username is not in the correct format')
              .required(`Please enter your ${item.name}`);
            break;

          case 'select':
            if (Object.keys(packagesData).length || productOptions.length) {
              validationSchema[`field${item.fieldId}_1`] = Yup.string().required(
                `Please select ${item.name}`
              );
            }
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
                .matches(/^[a-zA-Z0-9_]{3,20}$/, 'Your username is not in the correct format')
                .required(`Please enter your username`);
              break;
            }
            validationSchema[`field${item.fieldId}_1`] = Yup.string().test(
              'isUrl',
              'URL is not allowed',
              (value) => {
                const urlRegex =
                  /^(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.))[^\s()<>]+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()[\]{};:'".,<>?«»“”‘’])*$/gi;
                const isUrl = urlRegex.test(value);
                return !isUrl;
              }
            );
            break;
        }
      }
    });
    return validationSchema;
  };
  const formik = useFormik({
    initialValues: generateInitialValue(data),
    enableReinitialize: true,
    validateOnMount: true,
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

        const signedNonce = await getNonce(
          walletState?.accountAddress,
          walletState?.connection,
          'Create AesirX Account: {}'
        );

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
          product: data[`field${registerForm.product}_1`],
          organization: data[`field${registerForm.organization}_1`]
            ? data[`field${registerForm.organization}_1`]
            : data[`field${registerForm.email}_1_email`],
          ...(data[`field${registerForm.email}_1_email`] && {
            email: data[`field${registerForm.email}_1_email`],
            organization: data[`field${registerForm.email}_1_email`],
          }),
          message: data[`field${registerForm.message}_1`] ?? '',
          visitorId: result.visitorId,
          ...(shareLink && {
            refShare2Earn: shareLink,
          }),
          ...(affiliateLink && {
            refAffiliate2Earn: affiliateLink,
          }),
        };
        console.log('apiData', apiData);

        const crypto = window['crypto'] || window['msCrypto'];
        const array = new Uint32Array(1);
        crypto.getRandomValues(array); // Compliant for security-sensitive use cases
        const passwordGenerate = array[0];

        const member = {
          username: data[`field${registerForm.email}_1_email`]
            ? data[`field${registerForm.email}_1_email`]
            : Object.keys(socialType)?.length
            ? `${socialType?.id}`
            : `${walletState?.accountAddress}`,
          password: passwordGenerate,
          email: data[`field${registerForm.email}_1_email`]
            ? data[`field${registerForm.email}_1_email`]
            : Object.keys(socialType)?.length
            ? `${socialType?.id}@aesirx.io`
            : `${walletState?.accountAddress}@aesirx.io`,
          organisation: data[`field${registerForm.email}_1_email`]
            ? data[`field${registerForm.email}_1_email`]
            : Object.keys(socialType)?.length
            ? `${socialType?.id}`
            : `${walletState?.accountAddress}`,
          block: 0,
          ...(walletState?.wallet === 'concordium'
            ? { wallet_concordium: walletState?.accountAddress }
            : { wallet_metamask: walletState?.accountAddress }),
          ...(Object.keys(socialType)?.length
            ? { [`social_${socialType?.type}`]: socialType?.id }
            : {}),
          web3id: data[`field${registerForm.username}_1`],
        };

        try {
          setLoading('saving');
          const response = await autoRegisterWeb3id(
            apiData,
            '',
            signedNonce,
            walletState?.accountAddress,
            walletState?.wallet === 'concordium' ? true : false
          );
          if (response) {
            await createMember(member);
            const { jwt } = await login(member?.email, member?.password);
            await linkAesirXAccount(apiData.id, jwt);
            const redFormData = {
              form_id: formID,
              [`field${registerForm.username}_1`]: data[`field${registerForm.username}_1`],
              [`field${registerForm.first_name}_1`]: data[`field${registerForm.first_name}_1`],
              [`field${registerForm.last_name}_1`]: data[`field${registerForm.last_name}_1`],
              [`field${registerForm.product}_1`]: data[`field${registerForm.product}_1`],
              [`field${registerForm.email}_1[email]`]: data[`field${registerForm.email}_1_email`]
                ? data[`field${registerForm.email}_1_email`]
                : Object.keys(socialType).length
                ? `${socialType?.id}@aesirx.io`
                : `${walletState?.accountAddress}@aesirx.io`,
              [`field${registerForm.organization}_1`]: data[`field${registerForm.organization}_1`],
              [`field${registerForm.message}_1`]: data[`field${registerForm.message}_1`],
              [`field${registerForm.order_id}_1`]: data[`field${registerForm.order_id}_1`] ?? '',
            };
            const formData = new FormData();
            for (const key in redFormData) {
              formData.append(key, redFormData[key] ?? '');
            }
            await axios.post(
              `${endpoint}/index.php?option=com_redform&task=redform.save&format=json`,
              formData
            );
            if (walletState?.wallet === 'concordium') {
              toast.success(
                `Thank you for signing up, ${
                  data[`field${registerForm.username}_1`]
                }! You can now log in to access all of our features and benefits.`
              );
              setIsExist && setIsExist(true);
              setIsAccountExist && setIsAccountExist({ status: true, type: 'metamask' });
            } else {
              const responseMintWeb3ID = await mintWeb3ID(jwt);
              if (responseMintWeb3ID?.data?.success) {
                if (walletState?.wallet || Object.keys(socialType).length) {
                  toast.success(
                    `Thank you for signing up, ${
                      data[`field${registerForm.username}_1`]
                    }! You can now log in to access all of our features and benefits.`
                  );
                } else {
                  toast.success(
                    'Please check your email (also check your SPAM folder) to finalize your AesirX Single Sign On account and continue your registration for AesirX Shield of Privacy'
                  );
                }
                try {
                  await trackEvent(
                    process.env.REACT_APP_ENDPOINT_ANALYTICS_URL ||
                      process.env.NEXT_PUBLIC_ENDPOINT_ANALYTICS_URL ||
                      'https://api.analytics.aesirx.io',
                    location.pathname,
                    {
                      event_name: 'Sign Up',
                      event_type: 'conversion',
                      attributes: [
                        { name: 'sop_id', value: data[`field${registerForm.username}_1`] },
                        ...(walletState?.wallet === 'concordium'
                          ? [{ name: 'type', value: walletState?.wallet }]
                          : [{ name: 'type', value: 'email' }]),
                      ],
                    }
                  );
                } catch (error: any) {
                  console.error('error', error);
                }
                setIsExist && setIsExist(true);
                setIsAccountExist && setIsAccountExist({ status: true, type: 'metamask' });
              }
            }
          }
        } catch (error) {
          console.log(error);
          toast.error(error?.response?.data?.error || error?.message);
        }
      } catch (error: any) {
        isSuccess = false;
        console.log('Submit Error', error);
        toast.error(error?.response?.data?.error || error?._messages[0]?.message || error?.message);
      }
      setLoading('');
      setShow && setShow(!isSuccess);
      setSending(false);
    },
  });
  const reorderArr = (i: any, arr: any) => {
    return [...arr.slice(i), ...arr.slice(0, i)];
  };

  const reorderedArr = reorderArr(4, data);

  const [proof, setProof] = useState(false);
  const handleProof = async () => {
    try {
      const challenge = await getChallenge(walletState?.accountAddress ?? '');
      const statement = await getStatement();
      const provider: any = await detectConcordiumProvider();
      const client = new ConcordiumGRPCClient(provider.grpcTransport);
      const accountAddr = AccountAddress.fromBase58(walletState?.accountAddress);
      const accountInfo: any = await client.getAccountInfo(accountAddr);
      const nationality: string =
        accountInfo?.accountCredentials[0]?.value?.contents?.commitments?.cmmAttributes
          ?.nationality;
      const countryOfResidence: string =
        accountInfo?.accountCredentials[0]?.value?.contents?.commitments?.cmmAttributes
          ?.countryOfResidence;
      if (!nationality) {
        if (countryOfResidence) {
          statement[0].attributeTag = 'countryOfResidence';
        } else {
          statement[0].attributeTag = 'idDocIssuer';
        }
      }
      const proof = await provider.requestIdProof(
        walletState?.accountAddress ?? '',
        statement,
        challenge
      );
      const re = await verifyProof(challenge, proof);
      if (re) {
        setProof(true);
      }
      return true;
    } catch (error) {
      setProof(false);
      return false;
    }
  };

  useEffect(() => {
    if (
      formik.values[`field${registerForm.product}_1`] &&
      formik.values[`field${registerForm.product}_1`] !== 'community'
    ) {
      setIsSellix(true);
      setProduct(
        data
          .filter((item: any) => item.fieldtype === 'select')?.[0]
          .fieldOptions?.find(
            (product: any) => product.value == formik.values[`field${registerForm.product}_1`]
          )
      );
    } else {
      setIsSellix(false);
    }
  }, [formik.values]);

  useEffect(() => {
    if (window) {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const refShare2EarnUrl = params.get('ref') || sessionStorage.getItem('share2earnRef');
      const refAffiliate2EarnUrl =
        params.get('refaffiliate') || sessionStorage.getItem('affiliateRef');
      const refStaffId = params.get('refstaff') || sessionStorage.getItem('staffRef');
      setStaffId(refStaffId);
      setShareLink(refShare2EarnUrl);
      setAffiliateLink(refAffiliate2EarnUrl);
    }
  }, []);

  useEffect(() => {
    if (
      formik.values[`field${registerForm.username}_1`] &&
      formik.values[`field${registerForm.email}_1_email`]
    ) {
      const createSocketServer = async () => {
        await axios.get(`${partnerEndpoint}/api/socket`);
      };

      createSocketServer();

      if (!socket && partnerEndpoint) {
        socket = io(partnerEndpoint, {
          reconnection: true,
          secure: true,
          rejectUnauthorized: false,
          transports: ['polling'],
        });
      }

      socket.on('connect', () => {
        socket.on('web3id-update', async (msg: any) => {
          const web3id = formik.values[`field${registerForm.username}_1`]
            ? `@${formik.values[`field${registerForm.username}_1`].trim()}`
            : `@${formik.values[`field${registerForm.username}_1`]}`;

          if (msg?.id === web3id) {
            const list: any = document.getElementById('sellix-container');
            list && list?.removeChild(list.lastChild);
            toast.success(
              'Please check your email (also check your SPAM folder) to finalize your AesirX Single Sign On account and continue your registration for AesirX Shield of Privacy'
            );
            try {
              await trackEvent(
                process.env.REACT_APP_ENDPOINT_ANALYTICS_URL ||
                  process.env.NEXT_PUBLIC_ENDPOINT_ANALYTICS_URL ||
                  'https://api.analytics.aesirx.io',
                location.pathname,
                {
                  event_name: msg?.trackEventName,
                  event_type: 'conversion',
                  attributes: msg?.trackAttributes ?? [],
                }
              );
            } catch (error) {
              console.error('error', error);
            }

            setShow && setShow(false);
          }
        });
      });
    }
  }, [
    formik.values[`field${registerForm.username}_1`],
    formik.values[`field${registerForm.email}_1_email`],
  ]);
  return (
    <>
      {!walletState?.accountAddress && !isNoWallet && (
        <>
          <div className="line text-center">
            <span className="bg-white px-2 position-relative text-dark">or</span>
          </div>
        </>
      )}
      {noLogin && !proof && walletState?.wallet === 'concordium' && !isRequireConcordium && (
        <div className="d-flex mb-3">
          <Button
            variant="dark"
            className="fw-medium py-2 px-4 fs-18 lh-sm text-white"
            onClick={() => {
              handleProof();
            }}
          >
            Authorize
          </Button>
          <span className="text-danger">*</span>
        </div>
      )}
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
              {reorderedArr.map((field: Fields, index: number) => {
                return (
                  <Col key={index} md={listCol[index]}>
                    <CustomField
                      field={field}
                      formik={formik}
                      defaultProduct={defaultProduct}
                      hideDefaultProduct={hideDefaultProduct}
                      productOptions={productOptions}
                      isShowEmail={
                        (walletState?.accountAddress || Object.keys(socialType).length) &&
                        !isRequireEmail
                          ? false
                          : true
                      }
                      isProduct={
                        Object.keys(packagesData).length || productOptions?.length ? true : false
                      }
                    />
                  </Col>
                );
              })}
            </Row>
            <p className="fst-italic mb-3 fs-7">
              Disclaimer: The ID @Username is public and helps anonymize and pseudonymize data to
              protect your privacy.
            </p>
            <Form.Check className="mb-10px fs-7" type="checkbox" id="check-subsribe">
              <Form.Check.Input type="checkbox" required />
              <Form.Check.Label>
                Accept{' '}
                <a
                  className="fw-semibold text-inherit"
                  target={'_blank'}
                  href="https://aesirx.io/terms-conditions"
                  rel="noreferrer"
                >
                  Terms
                </a>{' '}
                &{' '}
                <a
                  className="fw-semibold text-inherit"
                  target={'_blank'}
                  href="https://aesirx.io/privacy-policy"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>{' '}
              </Form.Check.Label>
            </Form.Check>
            {isRequireConcordium ? (
              <></>
            ) : (
              <>
                <Form.Check type="checkbox" className="mb-4 fs-7" id="check-newletter">
                  <Form.Check.Input type="checkbox" />
                  <Form.Check.Label>Sign up for Newsletter</Form.Check.Label>
                </Form.Check>
              </>
            )}
            <div className="d-flex align-items-start flex-wrap">
              <div className={`me-4 mb-2 ${isRequireConcordium ? 'w-100' : ''}`}>
                <FriendlyCaptcha setCaptcha={setCaptcha} />
              </div>
              {isRequireConcordium && !showCreateButton && (
                <div className="w-auto">
                  <Suspense fallback={<>Loading...</>}>
                    <SSOConcordiumProvider
                      noSignUpForm={true}
                      setWalletState={setWalletState}
                      setIsAccountExist={() => {}}
                      disabled={!formik.isValid}
                      setExpand={async () => {
                        const signedNonce = await getNonce(
                          walletState?.accountAddress,
                          walletState?.connection,
                          'Create AesirX Account: {}'
                        );
                        if (signedNonce) {
                          setSignatureLinkAccount(signedNonce);
                          signedNonce && setShowCreateButton(true);
                        }
                      }}
                    />
                  </Suspense>
                </div>
              )}
              {showCreateButton && (
                <>
                  {!isSellix && !license?.sellix_id ? (
                    <Button
                      disabled={
                        sending ||
                        !captcha ||
                        !formik.isValid ||
                        (noLogin && !proof && walletState?.wallet === 'concordium')
                      }
                      type="submit"
                      variant="success"
                      className="fw-semibold text-white px-4 py-13px lh-sm w-100"
                    >
                      {sending ? 'Creating...' : 'Create account'}
                    </Button>
                  ) : !captcha || !formik.isValid ? (
                    <Button
                      disabled={
                        sending ||
                        !captcha ||
                        !formik.isValid ||
                        (noLogin && !proof && walletState?.wallet === 'concordium')
                      }
                      type="submit"
                      variant="success"
                      className="fw-semibold text-white px-4 py-13px lh-sm w-100"
                    >
                      {sending ? 'Sending' : 'Send inquiry'}
                    </Button>
                  ) : alertButton?.isShow && alertButton?.handleClick ? (
                    <Button
                      onClick={alertButton?.handleClick}
                      variant="success"
                      className="fw-semibold text-white px-4 py-13px lh-sm w-100"
                    >
                      Send inquiry
                    </Button>
                  ) : (
                    <div key={product?.sku}>
                      <Button
                        disabled={sending || !captcha || !formik.isValid}
                        data-sellix-product={license?.sellix_id ? license?.sellix_id : product?.sku}
                        data-sellix-custom-package={formik.values[`field${registerForm.product}_1`]}
                        data-sellix-custom-form_id={formID}
                        data-sellix-custom-requested_username={
                          formik.values[`field${registerForm.username}_1`]
                            ? `@${formik.values[`field${registerForm.username}_1`].trim()}`
                            : `@${formik.values[`field${registerForm.username}_1`]}`
                        }
                        data-sellix-custom-firstname={
                          formik.values[`field${registerForm.first_name}_1`]
                        }
                        data-sellix-custom-surname={
                          formik.values[`field${registerForm.last_name}_1`]
                        }
                        data-sellix-custom-product={formik.values[`field${registerForm.product}_1`]}
                        data-sellix-custom-email={
                          formik.values[`field${registerForm.email}_1_email`]
                        }
                        data-sellix-custom-organization={
                          formik.values[`field${registerForm.organization}_1`]
                        }
                        data-sellix-custom-message={formik.values[`field${registerForm.message}_1`]}
                        data-sellix-custom-share_link={shareLink}
                        data-sellix-custom-affiliate_link={affiliateLink}
                        data-sellix-custom-staff_id={staffId}
                        data-sellix-custom-license_period={license?.period}
                        data-sellix-custom-license_package={license?.product}
                        data-sellix-custom-license_package_name={license?.product_name}
                        data-sellix-custom-scan_type={license?.scan_type}
                        data-sellix-custom-number_domains={license?.number_domains}
                        data-sellix-custom-signature={signatureLinkAccount}
                        data-sellix-custom-account_address={walletState?.accountAddress}
                        variant="success"
                        className="fw-semibold text-white px-4 py-13px lh-sm w-100"
                      >
                        {sending ? 'Sending' : 'Send inquiry'}
                      </Button>
                    </div>
                  )}
                  {alertButton?.alertWarning && alertButton?.alertWarning}
                </>
              )}
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
