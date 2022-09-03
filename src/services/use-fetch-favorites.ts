import { KEYS } from "lib/react-query";
import { useQuery } from "react-query";
import { useAuthContext } from "store/auth-conext";
import { getFavorites } from "./api";
import { User } from "./auth";

const handleFetchFavorites = async (username: string) => {
  const favorites = await getFavorites(username);

  return favorites;
};

export const useFetchFavorites = () => {
  const { user } = useAuthContext();

  return useQuery<User["data"]["favoriteBooks"], any>(
    KEYS.FAV_BOOKS,
    () => handleFetchFavorites(user!.username),
    {
      enabled: !!user?.username,
    }
  );
};
