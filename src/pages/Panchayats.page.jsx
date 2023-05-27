import React from "react";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useGetPanchayatsQuery } from "../api/panchayatsApi";
import Loader from "../components/Loader";
import PanchayatsTable from "../components/PanchayatsTable";
import TablePagination from "../components/Pagination";

const PanchayatsPage = () => {
  const { data, isLoading } = useGetPanchayatsQuery();

  const { data: panchayatsData, meta } = data || {};
  const panchayats = panchayatsData?.map?.((panchayat, index) => ({
    id: panchayat.id,
    name: panchayat.attributes.name,
    pid: panchayat.attributes.pid,
    members: panchayat.attributes?.voters?.data?.length,
  }));

  const pagination = meta?.pagination;

  return (
    <Container fluid className="px-2">
      <NavBar />
      {isLoading && <Loader />}
      {panchayats && (
        <>
          <PanchayatsTable panchayats={panchayats} />
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

export default PanchayatsPage;
