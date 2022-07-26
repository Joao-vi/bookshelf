import { Button } from "components/elements";
import { AnimatePresence, motion } from "framer-motion";
import { KEYS, rqClient } from "lib/react-query";
import { CircleNotch, XCircle, PlusCircle } from "phosphor-react";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { addFavorite } from "services/api";
import { useFetchFavorites } from "services/use-fetch-favorites";
import { BookProps } from "./book";

type FavoriteButtonProps = {
  onClick: () => void;
  isAdd: boolean;
  isLoading: boolean;
};

const Loading = motion(CircleNotch);
const Delete = motion(XCircle);
const Add = motion(PlusCircle);

const variants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
  },
};

export const FavoriteButton = (props: FavoriteButtonProps) => {
  const { onClick, isAdd, isLoading } = props;
  return (
    <Button
      onClick={onClick}
      className="px-2"
      variant="highlight"
      disabled={isLoading}
    >
      <AnimatePresence>
        {isLoading ? (
          <Loading
            size={22}
            className="spinner-animation"
            weight="bold"
            initial="hidden"
            animate="visible"
            variants={variants}
          />
        ) : isAdd ? (
          <Delete
            size={22}
            weight="bold"
            initial="hidden"
            animate="visible"
            variants={variants}
          />
        ) : (
          <Add
            size={22}
            weight="bold"
            initial="hidden"
            animate="visible"
            variants={variants}
          />
        )}
      </AnimatePresence>
    </Button>
  );
};

interface StatusBook {
  book: BookProps;
  username: string;
}

export const StatusBook = ({ book, username }: StatusBook) => {
  const { data: favorites, isLoading } = useFetchFavorites();

  const listItem = !!favorites?.some((favorite) => favorite.id === book.id);

  const { mutate, isLoading: isLoadingMutation } = useMutation(
    () => addFavorite({ book, username }),
    {
      onMutate: async () => {
        await rqClient.cancelQueries(KEYS.FAV_BOOKS);

        const oldState = rqClient.getQueryData(KEYS.FAV_BOOKS) as BookProps[];

        rqClient.setQueryData<BookProps[]>(KEYS.FAV_BOOKS, (favorites) => {
          const isAdded = favorites?.some((fav) => fav.id === book.id);

          if (!!isAdded) {
            return favorites?.filter((fav) => fav.id !== book.id) || [];
          }
          return [...(favorites as any), book];
        });

        return { oldState };
      },
      onError: (err, book, context) => {
        toast.error(err as any);
        rqClient.setQueryData(KEYS.FAV_BOOKS, context?.oldState);
      },
      onSettled: () => {
        rqClient.invalidateQueries(KEYS.FAV_BOOKS);
      },
    }
  );
  return (
    <div className="flex gap-3 items-center">
      {isLoading ? (
        "..."
      ) : (
        <FavoriteButton
          onClick={mutate}
          isAdd={listItem}
          isLoading={isLoadingMutation || isLoading}
        />
      )}
    </div>
  );
};
