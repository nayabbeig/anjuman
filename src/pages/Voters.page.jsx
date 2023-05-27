import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useGetVotersQuery } from "../api/votersApi";
import Loader from "../components/Loader";
import VotersTable from "../components/VotersTable";
import TablePagination from "../components/Pagination";

const VotersPage = () => {
  const { data, isLoading } = useGetVotersQuery();

  const { data: votersData, meta } = data || {};
  const voters = votersData?.map?.((voter, index) => ({
    id: voter.id,
    name: voter.attributes.name,
    father: voter.attributes.father,
    age: voter.attributes.age,
    panchayat: voter.attributes?.panchayat?.data?.attributes?.name,
  }));

  const pagination = meta?.pagination;

  return (
    <Container fluid className="px-2">
      <NavBar />
      {isLoading && <Loader />}
      {voters && (
        <>
          <VotersTable voters={voters} />
          {pagination && (
            <TablePagination
              totalPages={pagination.pageCount}
              currentPage={pagination.page}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default VotersPage;
