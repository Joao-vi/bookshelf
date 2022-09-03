import { Input } from "components/elements";
import { Layout } from "components/layouts";
import { Book } from "components/modules";
import { FormEvent, useMemo, useState } from "react";
import { useFetchFavorites } from "services/use-fetch-favorites";

type SearchFavoriteFormElements = {
  search: HTMLInputElement;
} & HTMLFormControlsCollection;

const FavoritesPage = () => {
  const [query, setQuery] = useState("");

  const { data, isLoading, isError, error } = useFetchFavorites();

  const handleSearchFavorite = (e: FormEvent<HTMLFormElement>) => {
    const { search } = e.currentTarget.elements as SearchFavoriteFormElements;
    setQuery(search.value);
  };

  const filteredData = useMemo(() => {
    return data?.filter((fav) => fav.title.includes(query));
  }, [query, data]);

  return (
    <Layout>
      <main className="mx-auto max-w-[1400px] flex flex-col gap-8 justify-start items-center px-4">
        <form onSubmit={handleSearchFavorite}>
          <Input id="search" placeholder="Search on favorites" />
        </form>

        {isError && (
          <div className="text-red-500 font-medium text-center">
            <span>There was an error</span>
            <p className="font-normal">{error.message}</p>
            <p className="font-normal">{error.stack}</p>
          </div>
        )}

        {isLoading ? (
          <h1>Loading</h1>
        ) : filteredData?.length && filteredData.length > 0 ? (
          <div className="flex flex-wrap gap-3 items-center justify-items-stretch">
            {filteredData.map((book) => (
              <Book key={book.id} {...book} />
            ))}
          </div>
        ) : (
          <h1>No items to show.</h1>
        )}
      </main>
    </Layout>
  );
};

export { FavoritesPage };
