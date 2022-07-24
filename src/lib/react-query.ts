import toast from "react-hot-toast";
import { QueryCache, QueryClient } from "react-query";

export const rqClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => toast.error(`Something went wrong: ${error}`),
  }),
});

export const KEYS = {
  FAV_BOOKS: "FAVORITES-BOOKS",
};
