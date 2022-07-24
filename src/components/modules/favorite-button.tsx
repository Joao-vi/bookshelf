import { Button } from "components/elements";
import { AnimatePresence, motion } from "framer-motion";
import { CircleNotch, XCircle, PlusCircle } from "phosphor-react";

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
