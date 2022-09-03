import { KEYS } from "lib/react-query";
import { QueryFunctionContext, useQuery } from "react-query";
import { BookData } from "types";
import { booksAPI } from "./api";

const fetchBook = async ({ queryKey }: QueryFunctionContext) => {
  const [_, key] = queryKey as any;

  const { data } = await booksAPI.get<BookData>("/volumes", {
    params: {
      q: key.query || "a",
      startIndex: key.page,
    },
  });

  const totalPages = Math.ceil(data.totalItems / data.items.length);
  return { ...data, totalPages };
};

export const useFetchBook = (query?: string, page = 0) =>
  useQuery<BookData, any>([KEYS.BOOKS, { query, page }], fetchBook, {
    enabled: query !== undefined,
  });
