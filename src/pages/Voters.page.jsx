import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useGetVotersQuery } from "../api/votersApi";
import Loader from "../components/Loader";
import VotersTable from "../components/VotersTable";
import TablePagination from "../components/Pagination";
import VotersForm, { Test } from "../components/VotersForm";

const VotersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading } = useGetVotersQuery({ page: currentPage });
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
      {voters && <VotersTable voters={voters} />}

      {showVotersForm && (
        <VotersForm closeForm={() => setShowVotersForm(false)} />
      )}
    </Container>
  );
};

export default VotersPage;
