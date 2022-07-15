import { Input } from "components/elements";

import { Book } from "components/modules";
import { FormEvent, useEffect, useState } from "react";
import { Books, client, ResponseAPI } from "services/api";

type Status = "idle" | "loading" | "success" | "error";

type SearchFormElements = {
  search: HTMLInputElement;
} & HTMLFormControlsCollection;

type DataBooks = {
  kind: string;
  totalItems: number;
  items: Books["volumeInfo"][];
};

const handleFormatData = (data: ResponseAPI["items"]) =>
  data.map(({ volumeInfo }) => ({ ...volumeInfo }));

const BrowsePage = () => {
  const [data, setData] = useState<DataBooks>();
  const [error, setError] = useState<any>();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { search } = e.currentTarget.elements as SearchFormElements;

    setQuery(search.value);

    setStatus("loading");
    client<ResponseAPI>(`volumes?q=${encodeURIComponent(search.value)}`).then(
      (data) => {
        setData({ ...data, items: handleFormatData(data.items) });
        setStatus("success");
      },
      (error) => {
        setStatus("error");
        setError(error);
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen px-4">
      <form onSubmit={handleSearch}>
        <Input
          id="search"
          placeholder="Search for a book"
          hasIcon
          isError={status === "error"}
          isLoading={status === "loading"}
        />
      </form>

      {status === "error" ? (
        <div className="text-[#d00000] font-medium">
          <span>There was an error</span>
          <p>{error}</p>
        </div>
      ) : null}

      <section className="flex flex-wrap gap-3 items-center justify-items-stretch">
        {status === "success" ? (
          data?.items.length ? (
            data.items.map((item, index) => <Book {...item} />)
          ) : (
            <p>No books found. Try another search.</p>
          )
        ) : null}
      </section>
    </div>
  );
};

export { BrowsePage };
