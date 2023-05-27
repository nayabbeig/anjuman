import React from "react";
import { Col, Row } from "react-bootstrap";

const VotersTableRow = ({ index, id, name, father, age, panchayat }) => {
  return (
    <Row>
      <Col className="border py-1 tableRow" md={1}>
        {index + 1}
      </Col>
      <Col className="border py-1 tableRow" md={2}>
        {id}
      </Col>
      <Col className="border py-1 tableRow" md={3}>
        {name}
      </Col>
      <Col className="border py-1 tableRow" md={3}>
        {father}
      </Col>
      <Col className="border py-1 tableRow" md={1}>
        {age}
      </Col>
      <Col className="border py-1 tableRow" md={2}>
        {panchayat}
      </Col>
    </Row>
  );
};

const VotersTable = ({ voters }) => {
  return (
    <div className="p-3">
      <Row>
        <Col className="border py-1 tableHeader" md={1}>
          Sn
        </Col>
        <Col className="border py-1 tableHeader" md={2}>
          Id
        </Col>
        <Col className="border py-1 tableHeader" md={3}>
          Name
        </Col>
        <Col className="border py-1 tableHeader" md={3}>
          Father's Name
        </Col>
        <Col className="border py-1 tableHeader" md={1}>
          Age
        </Col>
        <Col className="border py-1 tableHeader" md={2}>
          Panchayat
        </Col>
      </Row>
      {voters.map((voter, index) => (
        <VotersTableRow {...voter} index={index} />
      ))}
    </div>
  );
};

export default VotersTable;
