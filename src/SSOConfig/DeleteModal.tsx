import { Image } from '../components/Image';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import warning_icon from '../SSOButton/images/warning_icon.png';
const DeleteModal = ({ show, action, setShow, data }: any) => {
  const [loading, setLoading] = useState(false);
  const handleDelete = async () => {
    setLoading(true);
    await action(data?.address, data?.wallet);
    setLoading(false);
    setShow({ show: false });
  };

  return (
    <Modal show={show} onHide={() => setShow({ show: false })} centered>
      <Modal.Body className="py-4 px-2rem text-center">
        <Image src={warning_icon} alt="warning icon" className="mb-3" />
        <h3 className="text-center mb-2 fs-18 fw-semibold">
          Are you sure you want to disconnect your wallet?
        </h3>
        <p className="mb-4">This action is irreversible, are you sure you want to disconnect?</p>
        <div className="d-flex justify-content-between">
          <Button
            onClick={() => setShow({ show: false })}
            variant="outline-light"
            className="border text-primary fw-semibold fs-7 px-4 py-12px"
          >
            Cancel
          </Button>

          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="danger"
            className="fw-semibold fs-7 px-4 py-12px"
          >
            Yes, disconnect!
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteModal;
