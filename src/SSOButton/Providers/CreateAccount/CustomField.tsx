import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef } from 'react';
import { Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { getClientApp } from '../../../utils';
import circle_info from '../../images/circle_info.svg';
const CustomField = ({
  formik,
  field,
  isShowEmail,
  isProduct = false,
  defaultProduct,
  hideDefaultProduct,
  productOptions,
}: any) => {
  const { registerForm } = getClientApp();
  const fieldName =
    field.fieldtype == 'email' ? `field${field.fieldId}_1_email` : `field${field.fieldId}_1`;
  if (field.fieldtype === 'hidden') {
    return null;
  }
  if (field.name == 'Order ID' || field.name === 'Message') {
    return null;
  }
  if (
    (field.fieldId?.toString() === registerForm?.product?.toString() && !isProduct) ||
    field.fieldId?.toString() === registerForm?.first_name?.toString() ||
    field.fieldId?.toString() === registerForm?.last_name?.toString() ||
    field.fieldId?.toString() === registerForm?.organization?.toString() ||
    (!isShowEmail && field.fieldId?.toString() === registerForm?.email?.toString())
  ) {
    return null;
  }

  let listOptions = field?.fieldOptions;
  if (productOptions?.length !== 0 && field.fieldtype === 'select') {
    listOptions = field?.fieldOptions.filter((product: any) =>
      productOptions.includes(product.value)
    );
  }
  const ref = useRef(null);
  return (
    <Form.Group
      className={`mb-3 w-100 ${hideDefaultProduct && field.fieldtype === 'select' ? 'd-none' : ''}`}
    >
      <div
        className="d-flex align-items-center justify-content-between mb-2 popover-dark"
        ref={ref}
      >
        <Form.Label className="mb-0">
          {field.name}
          {field.required == '1' && <span className="text-danger">*</span>}
        </Form.Label>
        {field.fieldId == registerForm.username && (
          <OverlayTrigger
            trigger="hover"
            key={'top'}
            placement={'top'}
            container={ref}
            overlay={
              <Popover id={`popover-positioned-top`}>
                <Popover.Body className="text-white">
                  <p className="mb-0">
                    <strong>About SoP ID</strong>
                  </p>
                  <p className="mb-0">
                    With a SoP ID, gain access to ID-authenticated digital experiences. Experience
                    unmatched data privacy with our decentralized approach, & simplify your online
                    experience with our secure Single Sign On solution.
                  </p>
                </Popover.Body>
              </Popover>
            }
          >
            <img src={circle_info} alt="circle_info Icon" width="16px" height="16px" />
          </OverlayTrigger>
        )}
      </div>

      <div className="position-relative">
        {field.fieldId == registerForm.username && (
          <div
            className={`position-absolute top-50 translate-middle-y bg-gray-stroke-2 d-flex justify-content-center align-items-center text-primary username_left`}
          >
            @
          </div>
        )}
        {field.fieldtype === 'textarea' ? (
          <Form.Control
            as={field.fieldtype}
            rows={3}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            className={`py-13px lh-sm ${
              formik.touched[fieldName] && formik.errors[fieldName] ? 'border-danger' : ''
            }`}
          />
        ) : field.fieldtype === 'select' ? (
          <Form.Select
            name={fieldName}
            disabled={defaultProduct}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`py-13px lh-sm ${
              formik.touched[fieldName] && formik.errors[fieldName] ? 'border-danger' : ''
            }`}
            defaultValue={defaultProduct ? defaultProduct : 'default'}
          >
            <option disabled={true} value="default">
              --Choose your product--
            </option>
            {listOptions?.map((item: any) => {
              return (
                <option id={item.id} key={item?.id} value={item?.value}>
                  {item?.label}{' '}
                  {item?.price
                    ? !parseInt(item?.price)
                      ? 'Free'
                      : `$${parseInt(item?.price)}`
                    : null}
                </option>
              );
            })}
          </Form.Select>
        ) : (
          <Form.Control
            type={field.fieldtype}
            name={fieldName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[fieldName]}
            className={`py-13px lh-sm ${
              formik.touched[fieldName] && formik.errors[fieldName] ? 'border-danger' : ''
            }  ${field.fieldId == registerForm.username ? 'ps-5' : ''}`}
          />
        )}
      </div>
      {formik.touched[fieldName] && formik.errors[fieldName] ? (
        <p className="mt-2 mb-0 p-0 border-0 text-danger d-flex align-items-center">
          <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
          <span className="fs-7 fw-semibold ms-2 lh-1">{formik.errors[fieldName]}</span>
        </p>
      ) : null}
    </Form.Group>
  );
};

export default CustomField;
