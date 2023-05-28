import React, { useState, memo, useEffect } from "react";
import { Alert, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useGetPanchayatNamesQuery } from "../api/panchayatsApi";
import { Form as FinalForm, Field } from "react-final-form";
import { QrReader } from "react-qr-reader";
import {
  useCreateVoterMutation,
  useUpdateVoterMutation,
} from "../api/votersApi";
import QRGenerator from "./QRGenerator";
import electionInchargeSignature from "../assets/images/signature.png";
import moment from "moment";
import { getIdNumber } from "../utils/utls";

export const Test = (props) => {
  const [data, setData] = useState("No result");

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
            alert(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: "100%", border: "5px solid black" }}
      />
      <p>{data}</p>
    </>
  );
};

const VotersForm = ({ closeForm, initialValues, deleteForm }) => {
  const { data, isLoading } = useGetPanchayatNamesQuery();
  const panchayats = data?.data;
  const [createVoter, createResults] = useCreateVoterMutation();
  const [updateVoter, updateResults] = useUpdateVoterMutation();
  const [showForm, setShowForm] = useState(true);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);
  console.log("createResults", createResults);
  useEffect(() => {
    if (createResults.isSuccess || updateResults.isSuccess) setShowForm(false);
  }, [createResults.isSuccess, updateResults.isSuccess]);
  //   console.log(panchayats);
  const handleClose = () => closeForm();

  const modalTitle = "Add New Voter";

  const getFormattedDate = (dateString) =>
    moment(new Date(dateString)).format("DD-MMM-YYYY hh:mm A");

  //   console.log(panchayat);

  const onSubmit = async (values) => {
    const res = initialValues
      ? await updateVoter({ data: { ...values }, id: initialValues.id })
      : await createVoter({ data: values });
    console.log("result after submit", res);
    console.log("voter data", {
      ...res.data.data,
      attributes: {
        ...res.data.data.attributes,
        panchayat: values.panchayat,
      },
    });
    if (res.data.data)
      setLastSubmittedData({
        panchayat: values.panchayat,
        pid: panchayats.find((p) => String(p.id) === String(values.panchayat))
          ?.pid,
        id: res.data.data.id,
        ...res.data.data.attributes,
      });
  };
  const validate = (values) => {
    const errors = {};
    if (!values.name) {
      errors.name = "Required";
    }
    if (!values.father) {
      errors.father = "Required";
    }
    if (!values.age) {
      errors.age = "Required";
    } else if (values.age < 18) {
      errors.age = "Age must be 18 or above";
    }

    if (!values.panchayat) {
      errors.panchayat = "Required";
    }

    if (!values.address) {
      errors.address = "Required";
    }
    return errors;
  };

  console.log("last submitted data", lastSubmittedData);
  return (
    <>
      <Modal show={true} onHide={handleClose} backdrop="static" size="xl">
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
          {createResults.isSuccess && (
            <Alert className="m-0 mx-2 p-1 px-2" variant="success">
              Voter has been created!
            </Alert>
          )}
        </Modal.Header>
        {showForm && (
          <FinalForm
            onSubmit={onSubmit}
            validate={validate}
            initialValues={initialValues}
            render={({
              handleSubmit,
              reset,
              form,
              submitting,
              pristine,
              dirty,
              values,
              errors,
              submitFailed,
              ...others
            }) => {
              if (createResults.isSuccess) form.reset();
              return (
                <>
                  <Modal.Body>
                    {/* {console.log("others", others)} */}
                    <Row>
                      <Col md={8}>
                        <Form onSubmit={handleSubmit}>
                          <Field
                            name="name"
                            validate={(value) => !value && "Required"}
                          >
                            {({ input, meta }) => (
                              <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                  {...input}
                                  type="text"
                                  placeholder="Enter name"
                                  isInvalid={
                                    (meta.dirty || submitFailed) && meta.error
                                  }
                                  isValid={meta.dirty && !meta.error}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {meta.error}
                                </Form.Control.Feedback>
                              </Form.Group>
                            )}
                          </Field>

                          <Field name="father">
                            {({ input, meta }) => (
                              <Form.Group className="mb-3" controlId="father">
                                <Form.Label>Father's Name</Form.Label>
                                <Form.Control
                                  {...input}
                                  type="text"
                                  placeholder="Enter Father's Name"
                                  isInvalid={
                                    (meta.dirty || submitFailed) && meta.error
                                  }
                                  isValid={meta.dirty && !meta.error}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {meta.error}
                                </Form.Control.Feedback>
                              </Form.Group>
                            )}
                          </Field>

                          <Field name="age">
                            {({ input, meta }) => (
                              <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Age</Form.Label>
                                <Form.Control
                                  {...input}
                                  type="number"
                                  placeholder="Enter Age"
                                  isInvalid={
                                    (meta.dirty || submitFailed) && meta.error
                                  }
                                  isValid={meta.dirty && !meta.error}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {meta.error}
                                </Form.Control.Feedback>
                              </Form.Group>
                            )}
                          </Field>

                          <Field name="panchayat">
                            {({ input, meta }) => (
                              <Form.Group
                                className="mb-3"
                                controlId="panchayat"
                              >
                                <Form.Label>Panchayat</Form.Label>
                                <div key="inline-radio" className="mb-3">
                                  {panchayats?.map?.(({ name, id }) => (
                                    <Form.Check
                                      {...input}
                                      type="radio"
                                      label={name}
                                      id={id}
                                      value={id}
                                      name="panchayat"
                                      isInvalid={
                                        (meta.dirty || submitFailed) &&
                                        meta.error
                                      }
                                      isValid={
                                        meta.dirty &&
                                        !meta.error &&
                                        input.value === String(id)
                                      }
                                      checked={
                                        String(input.value) === String(id)
                                      }
                                    />
                                  ))}
                                  {isLoading && <Spinner variant="primary" />}
                                </div>
                                <Form.Control.Feedback type="invalid">
                                  {meta.error}
                                </Form.Control.Feedback>
                              </Form.Group>
                            )}
                          </Field>
                          <Field name="address">
                            {({ input, meta }) => (
                              <Form.Group className="mb-3" controlId="address">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                  {...input}
                                  type="text"
                                  placeholder="Enter Address"
                                  isInvalid={
                                    (meta.dirty || submitFailed) && meta.error
                                  }
                                  isValid={meta.dirty && !meta.error}
                                />
                                <Form.Control.Feedback type="invalid">
                                  {meta.error}
                                </Form.Control.Feedback>
                              </Form.Group>
                            )}
                          </Field>
                        </Form>
                      </Col>
                      <Col className="border rounded-2 py-2">
                        <Row>
                          <Col>
                            <h6>Preview</h6>
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5}>Name: </Col>
                          <Col>{values.name}</Col>
                        </Row>
                        <Row>
                          <Col md={5}>Father's Name: </Col>
                          <Col>{values.father}</Col>
                        </Row>
                        <Row>
                          <Col md={5}>Age: </Col>
                          <Col>{values.age}</Col>
                        </Row>
                        <Row>
                          <Col md={5}>Panchayat: </Col>
                          <Col>
                            {values.panchayat ? `[${values.panchayat}]` : ""}{" "}
                            {
                              panchayats?.find((p) => p.id === values.panchayat)
                                ?.name
                            }
                          </Col>
                        </Row>
                        <Row>
                          <Col md={5}>Address: </Col>
                          <Col>{values.address}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Modal.Body>
                  {
                    <Modal.Footer>
                      <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={isLoading || submitting}
                      >
                        Cancel
                      </Button>
                      <Button
                        variant="primary"
                        onClick={() => form.submit()}
                        disabled={isLoading || submitting}
                      >
                        Save
                      </Button>
                      {/* {createResults.isSuccess && (
                    <Button variant="success" onClick={() => reset()}>
                      Add One More
                    </Button>
                  )} */}
                    </Modal.Footer>
                  }
                </>
              );
            }}
          />
        )}

        {!showForm && (
          <>
            <Modal.Body>
              <Container>
                <Row>
                  <Col>
                    <h6>Preview</h6>
                  </Col>
                </Row>
                <Row>
                  <Col md={4} className="border rounded-2 py-2">
                    <Row className="m-3">
                      <Col className="text-center">
                        <h6>Anjuman Islamia Election Committee</h6>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col>
                        <div
                          style={{ width: "100px", height: "120px" }}
                          className="border d-flex justify-content-center align-items-center"
                        >
                          Photo
                        </div>
                      </Col>
                      <Col>
                        <QRGenerator
                          value={JSON.stringify({
                            ...lastSubmittedData,
                            IDN: getIdNumber(lastSubmittedData),
                          })}
                        />
                        <h6 className="my-2">
                          {getIdNumber(lastSubmittedData)}
                        </h6>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={5}>Name: </Col>
                      <Col>{lastSubmittedData.name}</Col>
                    </Row>
                    <Row>
                      <Col md={5}>Father's Name: </Col>
                      <Col>{lastSubmittedData.father}</Col>
                    </Row>
                    <Row>
                      <Col md={5}>Age: </Col>
                      <Col>{lastSubmittedData.age}</Col>
                    </Row>
                    <Row>
                      <Col md={5}>Panchayat: </Col>
                      <Col>
                        {lastSubmittedData.panchayat
                          ? `[${lastSubmittedData.panchayat}]`
                          : ""}{" "}
                        {
                          panchayats?.find(
                            (p) =>
                              String(p.id) ===
                              String(lastSubmittedData.panchayat)
                          )?.name
                        }
                      </Col>
                    </Row>
                    <Row>
                      <Col md={5}>Address: </Col>
                      <Col>{lastSubmittedData.address || "N/A"}</Col>
                    </Row>

                    <Row>
                      <Col md={5}>Issued On: </Col>
                      <Col>
                        {lastSubmittedData?.updatedAt &&
                          getFormattedDate(lastSubmittedData.updatedAt)}
                      </Col>
                    </Row>

                    <Row className="my-3">
                      <Col className="">Election Incharge:</Col>
                      <Col>
                        <img
                          src={electionInchargeSignature}
                          width="100px"
                          alt="sign"
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {}}>
                Print
              </Button>
              <Button variant="primary" onClick={() => setShowForm(true)}>
                Add New
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </>
  );
};

export default VotersForm;
