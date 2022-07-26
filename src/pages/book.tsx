import { Button } from "components/elements";
import { Layout, LoadingScreen } from "components/layouts";
import { BookProps, FavoriteButton, StatusBook } from "components/modules";
import { AnimatePresence, motion } from "framer-motion";
import { KEYS, rqClient } from "lib/react-query";
import { CircleNotch, PlusCircle, X, XCircle } from "phosphor-react";
import toast from "react-hot-toast";
import { QueryClient, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { addFavorite, AddFavoritesProps } from "services/api";
import { Note, updateNotes } from "services/auth";
import { useFetchBook } from "services/use-fetch-book";
import { useFetchFavorites } from "services/use-fetch-favorites";
import { useAuthContext } from "store/auth-conext";
import { debounce } from "utils";
import noCoverBook from "../../assets/no-cover-book.png";

export const BookPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();

  const { data, isLoading, isError } = useFetchBook(id);
  const favorites = useFetchFavorites();

  const updateFavorites = (props: AddFavoritesProps) => addFavorite(props);

  const addFavorites = useMutation(updateFavorites, {
    onMutate: async ({ book }) => {
      await rqClient.cancelQueries(KEYS.FAV_BOOKS);

      const previousFavorites = rqClient.getQueryData(
        KEYS.FAV_BOOKS
      ) as BookProps[];

      rqClient.setQueryData<BookProps[]>(KEYS.FAV_BOOKS, (favorites) => {
        const isAdded = favorites?.some((fav) => fav.id === book.id);

        if (!!isAdded) {
          return favorites?.filter((fav) => fav.id !== book.id) || [];
        }
        return [...(favorites as any), book];
      });

      return { previousFavorites };
    },
    onError: (err, book, context) => {
      toast.error(err as any);
      rqClient.setQueryData(KEYS.FAV_BOOKS, context?.previousFavorites);
    },
    onSettled: () => {
      rqClient.invalidateQueries(KEYS.FAV_BOOKS);
    },
  });

  const updateNote = useMutation((notes: Note) =>
    updateNotes(user!.username, notes)
  );

  const isAdd = !!favorites.data?.some(
    (favorite) => favorite.id === data?.items[0].id
  );

  if (isLoading || !id) return <LoadingScreen />;

  return (
    <Layout>
      <section className="max-w-[1400px] w-full mx-auto">
        {!isError && !!data ? (
          <article className="flex items-start gap-4 py-10 px-5 bg-slate-50 rounded shadow-sm">
            <img
              className="rounded"
              src={
                data?.items[0].volumeInfo?.imageLinks?.thumbnail || noCoverBook
              }
              alt={data?.items[0].volumeInfo.title}
            />

            <main className="flex flex-col gap-2">
              <header className="flex justify-between items-center">
                <h1 className="font-bold text-2xl">
                  {data?.items[0].volumeInfo.title}
                </h1>
                <StatusBook
                  book={{ ...data.items[0].volumeInfo, id }}
                  username={user!.username}
                />
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

              <div>
                <span className="text-headline mb-[.8rem] flex items-center gap-3 ">
                  Notes
                  {updateNote.isLoading && (
                    <CircleNotch className="spinner-animation" />
                  )}
                </span>
                <textarea
                  onChange={debounce(
                    (e) =>
                      updateNote.mutate({ bookId: id, notes: e.target.value }),
                    2000
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
