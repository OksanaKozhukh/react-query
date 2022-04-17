import { useState } from "react";
import { Link } from "react-router-dom";

import {
  useAddSuperHeroData,
  useSuperHeroesData,
} from "../hooks/useSuperHeroesData";

export const RQSuperHeroes = () => {
  const [name, setName] = useState("");
  const [alterEgo, setAlterEgo] = useState("");

  const onSuccess = () => console.log("success");
  const onError = () => console.log("error");

  const { isLoading, data, isError, error, isFetching, refetch } =
    useSuperHeroesData(onSuccess, onError);

  const { mutate } = useAddSuperHeroData();

  if (isLoading || isFetching) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>{error.message}</h2>;
  }

  const handleAddHero = () => {
    const hero = { name, alterEgo };
    mutate(hero);
  };

  return (
    <>
      <h2>RQSuperHeroes Page</h2>
      <div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={alterEgo}
          onChange={(e) => setAlterEgo(e.target.value)}
        />
        <button onClick={handleAddHero}>Add Hero</button>
      </div>
      <button onClick={refetch}>Fetch heroes</button>
      {data.data.map((el) => (
        <div key={el.id}>
          <Link to={`/rq-super-heroes/${el.id}`}>{el.name}</Link>
        </div>
      ))}
    </>
  );
};
