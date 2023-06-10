import { Col, Row } from "react-bootstrap";
import QRGenerator from "./QRGenerator";
import { getIdNumber } from "../utils/utls";
import moment from "moment";
import { useGetPanchayatNamesQuery } from "../api/panchayatsApi";

import electionInchargeSignature from "../assets/images/signature.png";
import AECLogo from "../assets/images/aecLogo.png";

const VoterId = ({ voter }) => {
  console.log(voter);
  const { data, isLoading } = useGetPanchayatNamesQuery();
  const panchayats = data?.data;
  const getFormattedDate = (dateString) =>
    moment(new Date(dateString)).format("DD-MMM-YYYY");
  return (
    <Col
      xs={4}
      className="border rounded-2 p-0 d-flex justify-content-center m-2 voterId"
      style={{ width: "360px", height: "500px", zoom: "70%" }}
    >
      <div>
        <Row className="my-3">
          <Col className="text-center d-flex justify-content-center align-items-center p-0">
            <img src={AECLogo} width="30px" height="30px" alt="logo" />
            <p
              className="m-0 mx-2"
              style={{ fontSize: "12px", fontWeight: "600" }}
            >
              Anjuman Islamia Election Committee Gumla
            </p>
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
        <Row className="voterIdRow">
          <Col xs={5}>Name: </Col>
          <Col>{voter.name}</Col>
        </Row>
        <Row className="voterIdRow">
          <Col xs={5}>UID: </Col>
          <Col>{voter.uid}</Col>
        </Row>
        <Row className="voterIdRow">
          <Col xs={5}>Father's Name: </Col>
          <Col>{voter.father}</Col>
        </Row>
        <Row className="voterIdRow">
          <Col xs={5}>Age: </Col>
          <Col>{voter.age}</Col>
        </Row>
        <Row className="voterIdRow">
          <Col xs={5}>Panchayat: </Col>
          <Col>
            {voter.panchayatName ||
              panchayats?.find((p) => String(p.id) === String(voter.panchayat))
                ?.name}
          </Col>
        </Row>
        <Row className="voterIdRow">
          <Col xs={5}>Address: </Col>
          <Col>{voter.address || "N/A"}</Col>
        </Row>

        <Row className="voterIdRow">
          <Col xs={5}>Issued On: </Col>
          <Col>{voter?.updatedAt && getFormattedDate(voter.updatedAt)}</Col>
        </Row>

        <Row className="my-3 voterIdRow">
          <Col className="">Election Incharge:</Col>
          <Col>
            <img src={electionInchargeSignature} width="80px" alt="sign" />
            <div>Md. Irfan Ali</div>
          </Col>
        </Row>
      </div>
    </Col>
  );
};

export default VoterId;
