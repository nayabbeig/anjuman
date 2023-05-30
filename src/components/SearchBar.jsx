import { useRef } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useGetVotersByPanchayatQuery } from "../api/votersApi";

const SearchBar = ({ setKeyword, keyword, panchayat }) => {
  const {
    data: votersData,
    isLoading: isVotersLoading,
    refetch,
  } = useGetVotersByPanchayatQuery({
    panchayat,
    name: keyword,
    uid: keyword,
  });
  const searchBarRef = useRef(null);
  return (
    <div className="d-flex">
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        ref={searchBarRef}
      />
      <Button
        onClick={() => {
          const keyword = searchBarRef?.current?.value;
          console.log("keyword from button", keyword);
          setKeyword(keyword);
        }}
        variant="outline-success"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
