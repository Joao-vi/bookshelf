import { KEYS } from "lib/react-query";
import { QueryFunctionContext, useQuery } from "react-query";
import { BookData } from "types";
import { booksAPI } from "./api";

const fetchBook = async ({ queryKey }: QueryFunctionContext) => {
  const [_, query] = queryKey as string[];

  const { data } = await booksAPI.get<BookData>("/volumes", {
    params: {
      q: query || ".",
    },
  });

  return data;
};

export const useFetchBook = (query?: string) =>
  useQuery<BookData, any>([KEYS.BOOKS, query], fetchBook, {
    enabled: query !== undefined,
  });
