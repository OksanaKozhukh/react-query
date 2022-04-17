import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const fetchDetails = ({ queryKey }) => {
  const heroId = queryKey[1];
  return axios.get(`http://localhost:4000/superheroes/${heroId}`);
};

export const useHeroDetailsData = (heroId) => {
  const queryClient = useQueryClient();

  return useQuery(["rq-hero-detail", heroId], fetchDetails, {
    initialData: () => {
      const hero = queryClient
        .getQueryData("super-heroes")
        ?.data?.find((el) => el.id === parseInt(heroId));

      if (hero) {
        return { data: hero };
      } else {
        return undefined;
      }
    },
  });
};
