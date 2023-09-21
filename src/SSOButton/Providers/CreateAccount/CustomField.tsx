import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Form } from 'react-bootstrap';
import { getClientApp } from '../../../utils';
const CustomField = ({ formik, field, isWallet }: any) => {
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
    field.fieldId?.toString() === registerForm?.product?.toString() ||
    field.fieldId?.toString() === registerForm?.first_name?.toString() ||
    field.fieldId?.toString() === registerForm?.last_name?.toString() ||
    field.fieldId?.toString() === registerForm?.organization?.toString() ||
    (isWallet && field.fieldId?.toString() === registerForm?.email?.toString())
  ) {
    return null;
  }
  return (
    <Form.Group className="mb-4 w-100">
      <Form.Label className="text-primary mb-2">
        {field.name}
        {field.required == '1' && <span className="text-danger">*</span>}
      </Form.Label>
      <div className="position-relative">
        {field.fieldId == registerForm.username && (
          <div
            className={`position-absolute w-40px h-40px top-50 ms-1 translate-middle-y bg-gray-stroke-2 rounded d-flex justify-content-center align-items-center`}
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
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`py-13px lh-sm ${
              formik.touched[fieldName] && formik.errors[fieldName] ? 'border-danger' : ''
            }`}
            defaultValue={'default'}
          >
            <option disabled={true} value="default">
              --Choose your product--
            </option>
            {field?.fieldOptions.map((item: any) => {
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
        <p className="mt-2 mb-0 p-0 bg-white border-0 text-danger d-flex align-items-center">
          <FontAwesomeIcon icon={faCircleExclamation} width={14} height={14} />
          <span className="fs-7 fw-semibold ms-2 lh-1">{formik.errors[fieldName]}</span>
        </p>
      ) : null}
    </Form.Group>
  );
};

export default CustomField;
