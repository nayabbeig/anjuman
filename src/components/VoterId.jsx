import { Col, Row } from "react-bootstrap";
import QRGenerator from "./QRGenerator";
import { getIdNumber } from "../utils/utls";
import moment from "moment";
import { useGetPanchayatNamesQuery } from "../api/panchayatsApi";

import electionInchargeSignature from "../assets/images/signature.png";

const VoterId = ({ voter }) => {
  const { data, isLoading } = useGetPanchayatNamesQuery();
  const panchayats = data?.data;
  const getFormattedDate = (dateString) =>
    moment(new Date(dateString)).format("DD-MMM-YYYY hh:mm A");
  return (
    <Col
      xs={4}
      className="border rounded-2 p-2 d-flex justify-content-center m-2 voterId"
      style={{ width: "350px" }}
    >
      <div>
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
                ...voter,
                IDN: getIdNumber(voter),
              })}
            />
            <h6 className="my-2">{getIdNumber(voter)}</h6>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>Name: </Col>
          <Col>{voter.name}</Col>
        </Row>
        <Row>
          <Col xs={5}>uid: </Col>
          <Col>{voter.uid}</Col>
        </Row>
        <Row>
          <Col xs={5}>Father's Name: </Col>
          <Col>{voter.father}</Col>
        </Row>
        <Row>
          <Col xs={5}>Age: </Col>
          <Col>{voter.age}</Col>
        </Row>
        <Row>
          <Col xs={5}>Panchayat: </Col>
          <Col>
            {voter.panchayat ? `[${voter.panchayat}]` : ""}{" "}
            {voter.panchayatName ||
              panchayats?.find((p) => String(p.id) === String(voter.panchayat))
                ?.name}
          </Col>
        </Row>
        <Row>
          <Col xs={5}>Address: </Col>
          <Col>{voter.address || "N/A"}</Col>
        </Row>

        <Row>
          <Col xs={5}>Issued On: </Col>
          <Col>{voter?.updatedAt && getFormattedDate(voter.updatedAt)}</Col>
        </Row>

        <Row className="my-3">
          <Col className="">Election Incharge:</Col>
          <Col>
            <img src={electionInchargeSignature} width="100px" alt="sign" />
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default VoterId;
