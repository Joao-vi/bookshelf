import { Layout, LoadingScreen } from "components/layouts";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { client } from "services/api";
import { BookData } from "types";

export const BookPage = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<BookData>();
  const [error, setError] = useState();
  const isQuered = useRef(false);

  useEffect(() => {
    if (id && !isQuered.current) {
      setIsLoading(true);
      client<BookData>(`volumes?q=${encodeURIComponent(id)}`)
        .then((data) => {
          setIsLoading(false);
          return setData(data);
        })
        .catch((error) => {
          setIsLoading(false);
          return setError(error);
        });
      isQuered.current = true;
    }
  }, [id]);

  if (isLoading) return <LoadingScreen />;

  return (
    <Layout>
      <section className="max-w-[1400px] mx-auto">
        <article className="flex items-start gap-4 p-5 bg-slate-50 rounded shadow-sm">
          <img
            className="rounded"
            src={data?.items[0].volumeInfo.imageLinks.thumbnail}
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
      </section>
    </Layout>
  );
};
