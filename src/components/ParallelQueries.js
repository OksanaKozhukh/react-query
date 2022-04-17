import { useQuery } from "react-query";
import axios from "axios";

const fetchSuperHeroes = () => axios.get("http://localhost:4000/superheroes");

const fetchFriends = () => axios.get("http://localhost:4000/friends");

export const ParallelQueries = () => {
  useQuery("super-heroes", fetchSuperHeroes);
  useQuery("friends", fetchFriends);

  return <h2>Parallel Queries</h2>;
};
