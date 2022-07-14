import { Input } from "components/elements";
import { FormEvent, useEffect, useState } from "react";

type Status = "idle" | "loading" | "succes";

type SearchFormElemnts = {
  search: HTMLInputElement;
} & HTMLFormControlsCollection;

const BrowsePage = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { search } = e.currentTarget.elements as SearchFormElemnts;

    setQuery(search.value);
  };

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_BASE_URL_API}/volumes?q=lion&key=${
        import.meta.env.VITE_API_KEY
      }`
    ).then((response) => response.json().then((result) => console.log(result)));
  }, []);

  console.log(query);
  return (
    <div className="flex justify-center  items-center h-screen">
      <form onSubmit={handleSearch}>
        <Input id="search" placeholder="Search for a book" hasIcon />
      </form>
    </div>
  );
};

export { BrowsePage };
