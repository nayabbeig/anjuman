import React, { useState } from "react";
import { Badge, Button, Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useGetPanchayatsQuery } from "../api/panchayatsApi";
import Loader from "../components/Loader";
import PanchayatsTable from "../components/PanchayatsTable";
import TablePagination from "../components/Pagination";
import { useGetVotersByPanchayatQuery } from "../api/votersApi";
import VoterId from "../components/VoterId";

const PanchayatsPage = () => {
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
  const { data: votersData, isLoading: isVotersLoading } =
    useGetVotersByPanchayatQuery({ panchayat: selectedPanchayat });

  const { data: votersList, meta } = votersData || {};
  const voters = votersList?.map?.((voter, index) => ({
    pid: voter?.attributes?.panchayat?.data?.attributes?.pid,
    id: voter?.id,
    ...voter.attributes,
    panchayat: voter?.attributes?.panchayat?.data?.id,
    panchayatName: voter?.attributes?.panchayat?.data?.attributes?.name,
  }));

  const pagination = meta?.pagination;

  return (
    <Container fluid className="px-2">
      <div className="no-print">
        <NavBar />
        {isLoading && <Loader />}
        {panchayats && (
          <>
            <div className="d-flex justify-content-center">
              {/* <PanchayatsTable panchayats={panchayats} />8
               */}
              {panchayats?.map(({ id, name, members }) => (
                <Button
                  className="m-1"
                  variant={selectedPanchayat === id ? "primary" : "secondary"}
                  onClick={() => setSelectedPanchayat(id)}
                >
                  {name} <Badge bg="danger">{members}</Badge>
                </Button>
              ))}
            </div>
            <div className="d-flex justify-content-center">
              {pagination && (
                <TablePagination
                  totalPages={pagination.pageCount}
                  currentPage={pagination.page}
                />
              )}
              {voters && (
                <Button
                  onClick={() => window.print()}
                  variant="success"
                  className="px-3 mx-5"
                >
                  Print
                </Button>
              )}
            </div>
          </>
        )}
      </div>
      <div className="d-flex flex-wrap print">
        {voters?.map((voter) => (
          <VoterId voter={voter} />
        ))}
      </div>
    </Container>
  );
};

export default PanchayatsPage;
