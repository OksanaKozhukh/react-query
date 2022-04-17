import { useQuery } from "react-query";
import axios from "axios";
import { useState } from "react";

const fetchColors = (pageNumber) =>
  axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`);

export const PaginatedQueries = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, isError, error, isFetching } = useQuery(
    ["colors", pageNumber],
    () => fetchColors(pageNumber),
    { keepPreviousData: true }
  );

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>Paginated Queries</h2>
      {data?.data?.map((color) => (
        <div key={color.id}>
          {color.id}. {color.label}
        </div>
      ))}
      <div>
        <button
          onClick={() => setPageNumber((prev) => prev - 1)}
          disabled={pageNumber === 1}
        >
          Prev
        </button>
        <button
          onClick={() => setPageNumber((prev) => prev + 1)}
          disabled={pageNumber === 4}
        >
          Next
        </button>
      </div>
      {isFetching && "Loading"}
    </>
  );
};
