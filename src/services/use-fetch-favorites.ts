import { KEYS } from "lib/react-query";
import { QueryFunctionContext, useQuery } from "react-query";
import { useAuthContext } from "store/auth-conext";
import { getFavorites } from "./api";

const handleFetchFavorites = async (username: string) => {
  const favorites = await getFavorites(username);

  return favorites;
};

export const useFetchFavorites = () => {
  const { user } = useAuthContext();

  return useQuery(KEYS.FAV_BOOKS, () => handleFetchFavorites(user!.username), {
    enabled: !!user?.username,
  });
};
