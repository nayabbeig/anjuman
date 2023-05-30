import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import VotersForm from "./VotersForm";
import DeleteVoterForm from "./deleteVoterModal";
import { getIdNumber } from "../utils/utls";
import ScanAdhar from "./ScanAdhar";

const VotersTableRow = ({
  index,
  id,
  name,
  father,
  age,
  panchayatName,
  panchayatId,
  address,
  updatedAt,
  setVoterToBeUpdated,
  setVoterToBeDeleted,
  currentPage,
  pageSize,
}) => {
  return (
    <Row>
      <Col className="border py-1 tableRow" md={1}>
        {(currentPage - 1) * pageSize + index + 1}
      </Col>
      <Col className="border py-1 tableRow" md={1}>
        {getIdNumber({ updatedAt, pid: panchayatId, id })}
      </Col>
      <Col className="border py-1 tableRow" md={2}>
        {name}
      </Col>
      <Col className="border py-1 tableRow" md={2}>
        {father}
      </Col>
      <Col className="border py-1 tableRow" md={1}>
        {age}
      </Col>
      <Col className="border py-1 tableRow" md={2}>
        {panchayatName}
      </Col>
      <Col className="border py-1 tableRow" md={2}>
        {address}
      </Col>

      <Col className="border py-1 tableRow" md={1}>
        <span
          className="p-1"
          onClick={() =>
            setVoterToBeUpdated({
              id,
              name,
              father,
              age,
              panchayat: panchayatId,
              address,
            })
          }
        >
          Edit
        </span>
        <span
          className="p-1"
          onClick={() =>
            setVoterToBeDeleted({
              id,
              name,
              father,
              age,
              panchayat: panchayatId,
            })
          }
        >
          Delete
        </span>
      </Col>
    </Row>
  );
};

const VotersTable = ({
  voters,
  currentPage,
  pageSize,
  refetch,
  isFetching,
}) => {
  const [voterToBeUpdated, setVoterToBeUpdated] = useState(null);
  const [voterToBeDeleted, setVoterToBeDeleted] = useState(null);

  return (
    <div className="p-3">
      <Row>
        <Col className="border py-1 tableHeader" md={1}>
          Sn
        </Col>
        <Col className="border py-1 tableHeader" md={1}>
          Id
        </Col>
        <Col className="border py-1 tableHeader" md={2}>
          Name
        </Col>
        <Col className="border py-1 tableHeader" md={2}>
          Father's Name
        </Col>
        <Col className="border py-1 tableHeader" md={1}>
          Age
        </Col>
        <Col className="border py-1 tableHeader" md={2}>
          Panchayat
        </Col>
        <Col className="border py-1 tableHeader" md={2}>
          Address
        </Col>
        <Col className="border py-1 tableHeader" md={1}></Col>
      </Row>
      {voters.map((voter, index) => (
        <VotersTableRow
          {...voter}
          index={index}
          setVoterToBeUpdated={setVoterToBeUpdated}
          setVoterToBeDeleted={setVoterToBeDeleted}
          currentPage={currentPage}
          pageSize={pageSize}
        />
      ))}

      {voterToBeUpdated && (
        <VotersForm
          initialValues={voterToBeUpdated}
          refetch={refetch}
          isFetching={isFetching}
          closeForm={() => setVoterToBeUpdated(null)}
        />
      )}

      {voterToBeDeleted && (
        <DeleteVoterForm
          voter={voterToBeDeleted}
          closeForm={() => setVoterToBeDeleted(null)}
        />
      )}
    </div>
  );
};

export default VotersTable;
