import { Input } from "components/elements";
import { Layout } from "components/layouts/layout";

import { Book } from "components/modules";
import { CircleNotch, MagnifyingGlass, X } from "phosphor-react";
import { FormEvent, useState } from "react";
import { useFetchBook } from "services/use-fetch-book";

type Status = "idle" | "loading" | "success" | "error";

type SearchFormElements = {
  search: HTMLInputElement;
} & HTMLFormControlsCollection;

const BrowsePage = () => {
  const [query, setQuery] = useState("");
  const { data, isError, isLoading, isIdle, isSuccess, error } =
    useFetchBook(query);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { search } = e.currentTarget.elements as SearchFormElements;

    setQuery(search.value);
  };

  return (
    <Layout>
      <div className="mx-auto max-w-[1400px] flex flex-col gap-8 justify-start items-center px-4">
        <form onSubmit={handleSearch}>
          <Input
            id="search"
            placeholder="Search for a book"
            isError={isError}
            isLoading={isLoading}
          >
            {isIdle || isSuccess ? (
              <MagnifyingGlass size={20} weight="bold" />
            ) : isLoading ? (
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

        {isError ? (
          <div className="text-red-500 font-medium text-center">
            <span>There was an error</span>
            <p className="font-normal">{error.message}</p>
            <p className="font-normal">{error.stack}</p>
          </div>
        ) : null}

        <section className="flex flex-wrap gap-3 items-center justify-items-stretch">
          {isSuccess && !isLoading ? (
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
