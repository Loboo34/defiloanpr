import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Modal, Form, FloatingLabel } from "react-bootstrap";

const AddLoan = ({ save }) => {
  const [title, setTitle] = useState("");
  const [dueDate, setdueDate] = useState("");
  const [description, setDescription] = useState("");
  const [terms, setTerms] = useState("");
  const [category, setCategory] = useState("");
  const isFormFilled = () =>
    title && dueDate && terms && category && description;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        onClick={handleShow}
        className="btn btn-outline-success text-white"
      >
        <i className="bi bi-plus"></i> Add Loan
      </Button>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>New Loan</Modal.Title>
        </Modal.Header>
        <Form>
          <Modal.Body>
            <FloatingLabel
              controlId="inputTitle"
              label="Loan title"
              className="mb-3"
            >
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                placeholder="Enter title of loan"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputCategory"
              label="category"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="category"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputdueDate"
              label="dueDate"
              className="mb-3"
            >
              <Form.Control
                type="date"
                onChange={(e) => {
                  setdueDate(e.target.value);
                }}
                placeholder="Enter dueDate url"
              />
            </FloatingLabel>
            <FloatingLabel controlId="terms" label="Terms" className="mb-3">
              <Form.Control
                type="text"
                onChange={(e) => {
                  setTerms(e.target.value);
                }}
                placeholder="Enter dueDate url"
              />
            </FloatingLabel>
            <FloatingLabel
              controlId="inputDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                as="textarea"
                placeholder="description"
                style={{ height: "80px" }}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </FloatingLabel>
          </Modal.Body>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="dark"
            disabled={!isFormFilled()}
            onClick={() => {
              save({
                title,
                dueDate,
                description,
                terms,
                category,
              });
              handleClose();
            }}
          >
            Save loan
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

AddLoan.propTypes = {
  save: PropTypes.func.isRequired,
};

export default AddLoan;
