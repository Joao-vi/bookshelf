import { Input } from "components/elements";
import { Layout } from "components/layouts/layout";

import { Book } from "components/modules";
import { CircleNotch, MagnifyingGlass, X } from "phosphor-react";
import { createRef, FormEvent, useEffect, useRef, useState } from "react";
import { client } from "services/api";
import { BookData } from "types";

type Status = "idle" | "loading" | "success" | "error";

type SearchFormElements = {
  search: HTMLInputElement;
} & HTMLFormControlsCollection;

const BrowsePage = () => {
  const [data, setData] = useState<BookData>();
  const [error, setError] = useState<any>();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const isFirstRender = useRef(true);

  const fetchBooks = async (query: string) => {
    try {
      setStatus("loading");
      const data = await client<BookData>(
        `volumes?q=${encodeURIComponent(query)}`
      );
      setData(data);
      setStatus("success");
    } catch (error) {
      setError(error);
      setStatus("error");
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { search } = e.currentTarget.elements as SearchFormElements;

    setQuery(search.value);

    fetchBooks(search.value);
  };

  useEffect(() => {
    if (isFirstRender.current) {
      fetchBooks("");
    }
    return () => {
      isFirstRender.current = false;
    };
  }, [fetchBooks]);

  return (
    <Layout>
      <div className="mx-auto max-w-[1400px] flex flex-col gap-8 justify-start items-center px-4">
        <form onSubmit={handleSearch}>
          <Input
            id="search"
            placeholder="Search for a book"
            isError={status === "error"}
            isLoading={status === "loading"}
          >
            {status === "idle" || status === "success" ? (
              <MagnifyingGlass size={20} weight="bold" />
            ) : status === "loading" ? (
              <CircleNotch
                size={20}
                weight="bold"
                className="spinner-animation"
              />
            ) : (
              <X size={20} weight="bold" />
            )}
          </Input>
        </form>

        {status === "error" ? (
          <div className="text-red-500 font-medium text-center">
            <span>There was an error</span>
            <p className="font-normal">{error.message}</p>
            <p className="font-normal">{error.stack}</p>
          </div>
        ) : null}

        <section className="flex flex-wrap gap-3 items-center justify-items-stretch">
          {status === "success" ? (
            data?.items.length ? (
              data.items.map((item) => (
                <Book key={item.id} {...item.volumeInfo} id={item.id} />
              ))
            ) : (
              <p>No books found. Try another search.</p>
            )
          ) : null}
        </section>
      </div>
    </Layout>
  );
};

export { BrowsePage };
