import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Fragment } from "react";

const fetchColors = ({ pageParam = 1 }) =>
  axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`);

export const InfiniteQueries = () => {
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery("colors", fetchColors, {
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1;
      } else {
        return undefined;
      }
    },
  });

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <h2>Infinite Queries</h2>
      {data?.pages?.map((group, i) => (
        <Fragment key={i}>
          {group?.data?.map((color) => (
            <h2 key={color.id}>
              {color.id}. {color.label}
            </h2>
          ))}
        </Fragment>
      ))}
      <button disabled={!hasNextPage} onClick={fetchNextPage}>
        Load more
      </button>
      <div>{isFetching && !isFetchingNextPage ? "Fetching..." : null}</div>
    </>
  );
};
