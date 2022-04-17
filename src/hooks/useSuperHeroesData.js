import { useQuery, useMutation, useQueryClient } from "react-query";

import { request } from "../utils/axios-utils";

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery(
    "super-heroes",
    // () => axios.get("http://localhost:4000/superheroes"),
    () => request({ url: '/superheroes' }),
    { onSuccess, onError }
  );
};

export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient();
  return useMutation(
    // (hero) => axios.post("http://localhost:4000/superheroes", hero),
    (hero) => request({ url: "/superheroes", method: "post", data: hero }),
    {
      // onSuccess: (data) => {
      //   // queryClient.invalidateQueries("super-heroes");
      //   queryClient.setQueryData("super-heroes", (oldQueryData) => {
      //     return {
      //       ...oldQueryData,
      //       data: [...oldQueryData.data, data.data],
      //     };
      //   });
      // },
      onMutate: async (newHero) => {
        await queryClient.cancelQueries("super-heroes");
        const previousHeroesData = queryClient.getQueryData("super-heroes");
        queryClient.setQueryData("super-heroes", (oldQueryData) => {
          return {
            ...oldQueryData,
            data: [
              ...oldQueryData.data,
              { id: oldQueryData?.data?.length + 1, ...newHero },
            ],
          };
        });
        return previousHeroesData;
      },
      onError: (_error, _hero, context) => {
        queryClient.setQueryData("super-heroes", context.previousHeroesData);
      },
      onSettled: () => {
        queryClient.invalidateQueries("super-heroes");
      },
    }
  );
};
