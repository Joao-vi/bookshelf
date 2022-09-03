import { Layout, LoadingScreen } from "components/layouts";
import { StatusBook } from "components/modules";
import { rqClient } from "lib/react-query";
import { CircleNotch } from "phosphor-react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getNotes } from "services/api";
import { Note, updateNotes } from "services/auth";
import { useFetchBook } from "services/use-fetch-book";
import { useAuthContext } from "store/auth-conext";
import { debounce } from "utils";
import noCoverBook from "../../assets/no-cover-book.png";

const BookPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const { data, isLoading, isError } = useFetchBook(id);

  const notes = useQuery(["notes", id], () =>
    getNotes({ book: id!, username: user?.username! })
  );

  const updateNote = useMutation(
    (notes: Note) => updateNotes(user!.username, notes),
    {
      onSuccess: () => {
        rqClient.invalidateQueries(["notes", id]);
      },
    }
  );

  if (isLoading || !id) return <LoadingScreen />;

  return (
    <Layout>
      <section className="max-w-[1400px] w-full mx-auto">
        {!isError && !!data?.items[0] ? (
          <article className="flex items-start gap-4 py-10 px-5 bg-slate-50 rounded shadow-sm">
            <img
              className="rounded"
              src={
                data.items[0].volumeInfo?.imageLinks?.thumbnail || noCoverBook
              }
              alt={data.items[0].volumeInfo.title}
            />

            <main className="w-full flex flex-col gap-2">
              <header className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">
                  {data.items[0].volumeInfo.title}
                </h1>
                <StatusBook
                  book={{ ...data.items[0].volumeInfo, id }}
                  username={user!.username}
                />
              </header>

              <div>
                <span className="text-headline">Description</span>
                <p className="font-medium">
                  {data.items[0].volumeInfo.description}
                </p>
              </div>

              <div>
                <span className="text-headline block">General info</span>
                <span>
                  Authors:{" "}
                  {data.items[0].volumeInfo?.authors?.map((author) => (
                    <span className="font-medium" key={author}>
                      {author}
                    </span>
                  ))}{" "}
                  |{" "}
                </span>
                <span>
                  Publisher:{" "}
                  <span className="font-medium">
                    {data.items[0].volumeInfo.publisher}
                  </span>
                </span>{" "}
                |{" "}
                <span>
                  Published At:{" "}
                  <span className="font-medium">
                    {data.items[0].volumeInfo.publishedDate}
                  </span>
                </span>
                <span className="block">
                  Language:{" "}
                  <span className="font-medium">
                    {data.items[0].volumeInfo.language.toUpperCase()}
                  </span>
                </span>
                <span className="block">
                  Pages:{" "}
                  <span className="font-medium">
                    {data.items[0].volumeInfo.pageCount}
                  </span>
                </span>
              </div>

              <div>
                <span className="text-headline mb-[.8rem] flex items-center gap-3 ">
                  Notes
                  {updateNote.isLoading && (
                    <CircleNotch className="spinner-animation" />
                  )}
                </span>
                <textarea
                  defaultValue={notes.data?.notes}
                  onChange={debounce(
                    (e) =>
                      updateNote.mutate({ bookId: id, notes: e.target.value }),
                    1000
                  )}
                  className="w-full min-h-[200px] bg-[rgb(237,232,226)] rounded p-3  
                outline-none transition-hover-focus shadow-hover-focus-idle hover:shadow-hover-on focus:shadow-focus-on"
                />
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

export { BookPage };
