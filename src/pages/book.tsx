import { Layout, LoadingScreen } from "components/layouts";
import { useParams } from "react-router-dom";
import { useFetchBook } from "services/use-fetch-book";
import noCoverBook from "../../assets/no-cover-book.png";

export const BookPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useFetchBook(id);

  if (isLoading || !id) return <LoadingScreen />;

  return (
    <Layout>
      <section className="max-w-[1400px] mx-auto">
        {!isError ? (
          <article className="flex items-start gap-4 p-5 bg-slate-50 rounded shadow-sm">
            <img
              className="rounded"
              src={
                data?.items[0].volumeInfo?.imageLinks?.thumbnail || noCoverBook
              }
              alt={data?.items[0].volumeInfo.title}
            />

            <main className="flex flex-col gap-2">
              <header>
                <h1 className="font-bold text-2xl">
                  {data?.items[0].volumeInfo.title}
                </h1>
              </header>

              <div>
                <span className="text-headline">Description</span>
                <p className="font-medium">
                  {data?.items[0].volumeInfo.description}
                </p>
              </div>
              <div>
                <span className="text-headline block">General info</span>
                <span>
                  Authors:{" "}
                  {data?.items[0].volumeInfo.authors.map((author) => (
                    <span className="font-medium" key={author}>
                      {author}
                    </span>
                  ))}{" "}
                  |{" "}
                </span>
                <span>
                  Publisher:{" "}
                  <span className="font-medium">
                    {data?.items[0].volumeInfo.publisher}
                  </span>
                </span>{" "}
                |{" "}
                <span>
                  Published At:{" "}
                  <span className="font-medium">
                    {data?.items[0].volumeInfo.publishedDate}
                  </span>
                </span>
                <span className="block">
                  Language:{" "}
                  <span className="font-medium">
                    {data?.items[0].volumeInfo.language.toUpperCase()}
                  </span>
                </span>
                <span className="block">
                  Pages:{" "}
                  <span className="font-medium">
                    {data?.items[0].volumeInfo.pageCount}
                  </span>
                </span>
              </div>
            </main>
          </article>
        ) : (
          <h1 className="text-red-500">
            Some error has accoured, please try to reload the page.
          </h1>
        )}
      </section>
    </Layout>
  );
};
