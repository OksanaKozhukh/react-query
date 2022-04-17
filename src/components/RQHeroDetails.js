import { useParams } from "react-router-dom";

import { useHeroDetailsData } from "../hooks/useHeroDetailsData";

export const RQHeroDetails = () => {
  const { heroId } = useParams();
  const { isLoading, data, isError, error } = useHeroDetailsData(heroId);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  return (<div>{data?.data?.name} - {data?.data?.alterEgo}</div>);
};
