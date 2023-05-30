import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useGetVotersQuery } from "../api/votersApi";
import Loader from "../components/Loader";
import VotersTable from "../components/VotersTable";
import TablePagination from "../components/Pagination";
import VotersForm, { Test } from "../components/VotersForm";
import ScanAdhar, { closeCamera, useScanner } from "../components/ScanAdhar";

const VotersPage = () => {
  const [QRScanner, CameraSelector] = useScanner();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, refetch, isFetching, ...rest } = useGetVotersQuery({
    page: currentPage,
  });
  const [showVotersForm, setShowVotersForm] = useState(false);

  const { data: votersData, meta } = data || {};
  const voters = votersData?.map?.((voter, index) => ({
    id: voter.id,
    name: voter.attributes.name,
    father: voter.attributes.father,
    age: voter.attributes.age,
    updatedAt: voter.attributes.updatedAt,
    panchayatName: voter.attributes?.panchayat?.data?.attributes?.name,
    panchayatId: voter.attributes?.panchayat?.data?.id,
    address: voter.attributes.address,
  }));

  const pagination = meta?.pagination;

  const [showScanner, setShowScanner] = useState(false);
  const [adharData, setAdharData] = useState();

  const getAgeFromYob = (yob) =>
    new Date().getFullYear() - new Date(yob).getFullYear();

  const closeScanner = () => {
    closeCamera();
    setShowScanner(false);
  };

  const handleAdharData = (data) => {
    if (!data) return;
    console.log("scan data from handler", data);
    const adharObject = JSON.parse(data);
    const {
      uid,
      name,
      gender,
      yob,
      co: father,
      loc: address,
      vtc,
      po,
      dist,
      state,
      pc: pincode,
    } = adharObject;

    const voter = {
      name,
      uid,
      father,
      age: getAgeFromYob(yob),
      address,
    };

    setAdharData(JSON.stringify(voter));
  };

  return (
    <Container fluid className="px-2">
      <NavBar />
      {/* <Test /> */}
      <Row className="mt-2">
        <Col>
          <h2>Voters</h2>
        </Col>
        <Col>
          {pagination && voters && (
            <TablePagination
              totalPages={pagination.pageCount}
              currentPage={pagination.page}
              setCurrentPage={setCurrentPage}
            />
          )}
        </Col>
        <Col className="d-flex justify-content-end">
          <Button onClick={() => setShowVotersForm(true)}>Add Voter</Button>
        </Col>
      </Row>
      {isLoading && <Loader />}
      {voters && (
        <VotersTable
          voters={voters}
          refetch={refetch}
          isFetching={isFetching}
          currentPage={currentPage}
          pageSize={meta?.pagination?.pageSize}
        />
      )}

      {showVotersForm && (
        <VotersForm
          refetch={refetch}
          initialValuesJson={adharData}
          isFetching={isFetching}
          closeForm={() => setShowVotersForm(false)}
          openScanner={() => setShowScanner(true)}
          closeScanner={closeScanner}
          isScannerOpen={showScanner}
          renderCameraSelector={() => <CameraSelector />}
        />
      )}

      {showScanner && (
        <div
          style={{
            position: "fixed",
            right: "10px",
            bottom: "300px",
            zIndex: 10000,
            width: "250px",
            padding: "10px",
            background: "white",
          }}
        >
          {/* <ScanAdhar
            showScanner={showScanner}
            setShowScanner={setShowScanner}
            setData={handleAdharData}
          /> */}
          <QRScanner setData={handleAdharData} />
        </div>
      )}
    </Container>
  );
};

export default VotersPage;
