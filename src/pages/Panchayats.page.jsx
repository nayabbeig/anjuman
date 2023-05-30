import React, { useState } from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useGetPanchayatsQuery } from "../api/panchayatsApi";
import Loader from "../components/Loader";
import PanchayatsTable from "../components/PanchayatsTable";
import TablePagination from "../components/Pagination";
import { useGetVotersByPanchayatQuery } from "../api/votersApi";
import VoterId from "../components/VoterId";
import SearchBar from "../components/SearchBar";

const PanchayatsPage = () => {
  const [keyword, setKeyword] = useState("");
  const { data, isLoading } = useGetPanchayatsQuery();
  const { data: panchayatsData } = data || {};
  const panchayats = panchayatsData?.map?.((panchayat, index) => ({
    id: panchayat.id,
    name: panchayat.attributes.name,
    pid: panchayat.attributes.pid,
    members: panchayat.attributes?.voters?.data?.length,
  }));

  const [selectedPanchayat, setSelectedPanchayat] = useState(
    panchayats?.[0]?.id
  );

  console.log("Keyword from page", keyword);
  const {
    data: votersData,
    isLoading: isVotersLoading,
    refetch,
  } = useGetVotersByPanchayatQuery({
    panchayat: selectedPanchayat,
    name: keyword,
    uid: keyword,
  });

  const { data: votersList, meta } = votersData || {};
  const voters = votersList?.map?.((voter, index) => ({
    pid: voter?.attributes?.panchayat?.data?.attributes?.pid,
    id: voter?.id,
    uid: voter?.uid,
    ...voter.attributes,
    panchayat: voter?.attributes?.panchayat?.data?.id,
    panchayatName: voter?.attributes?.panchayat?.data?.attributes?.name,
  }));

  const pagination = meta?.pagination;

  return (
    <Container fluid className="px-2">
      <Row className="no-print">
        <Col>
          <NavBar />
        </Col>
      </Row>
      <Row className="no-print">
        <Col>{isLoading && <Loader />}</Col>
      </Row>

      {panchayats && (
        <div className="no-print">
          <Row className="my-2">
            <Col md={6}>
              {pagination && (
                <TablePagination
                  totalPages={pagination.pageCount}
                  currentPage={pagination.page}
                />
              )}
            </Col>
            <Col md={4}>
              <SearchBar
                setKeyword={setKeyword}
                keyword={keyword}
                panchayat={selectedPanchayat}
              />
            </Col>
            <Col md={2}>
              {voters && (
                <Button
                  onClick={() => window.print()}
                  variant="success"
                  className="px-3 mx-5"
                >
                  Print
                </Button>
              )}
            </Col>
          </Row>
          <Row className="my-2">
            <Col>
              <div className="d-flex justify-content-center">
                {/* <PanchayatsTable panchayats={panchayats} />8
                 */}
                {panchayats?.map(({ id, name, members }) => (
                  <Button
                    size="sm"
                    className="m-1"
                    variant={selectedPanchayat === id ? "primary" : "secondary"}
                    onClick={() => setSelectedPanchayat(id)}
                  >
                    {name} <Badge bg="danger">{members}</Badge>
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      )}
      <div className="d-flex flex-wrap print">
        {voters?.map((voter) => (
          <VoterId voter={voter} />
        ))}
      </div>
    </Container>
  );
};

export default PanchayatsPage;
