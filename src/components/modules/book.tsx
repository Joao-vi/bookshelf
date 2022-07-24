import { Button } from "components/elements";
import { motion } from "framer-motion";
import { ArrowRight } from "phosphor-react";
import { NavLink } from "react-router-dom";
import { addFavorite } from "services/api";
import { useFetchFavorites } from "services/use-fetch-favorites";
import { useAuthContext } from "store/auth-conext";
import { VolumeInfo } from "types";

import noCoverBook from "../../../assets/no-cover-book.png";

const variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
    },
  },
};

export type BookProps = VolumeInfo & { id: string };

const Book = (props: BookProps) => {
  const { user } = useAuthContext();
  return (
    <motion.li
      className="flex-1 self-stretch basis-[500px]"
      variants={variants}
    >
      <NavLink
        to={`/book/${props.id}`}
        className="w-full h-full flex items-center p-3 py-4 
        gap-2 border-[2px] border-card-border rounded bg-card text-card-p group
        cursor-pointer"
      >
        <img
          className="object-contain rounded"
          src={props.imageLinks?.thumbnail || noCoverBook}
          alt={props.title}
        />

        <div className=" self-start w-full flex flex-col gap-2">
          <header>
            <div className="flex justify-between">
              <h1 className="font-bold text-xl">{props.title}</h1>
              <div className="font-semibold text-highlight">
                <span>{props.language.toUpperCase()}</span> /{" "}
                <span>{props.publishedDate}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1 font-medium">
              {!!props.publisher && <span>{props.publisher}</span>}
              {!!props.printType && <span>•{props.printType}</span>}
              {!!props.pageCount && <span>•{props.pageCount} pages </span>}
            </div>
          </header>

          <main>
            <span className="text-headline">Description</span>
            <p className="font-normal h-[calc(3*1.5rem)] truncate  whitespace-normal relative overflow-text">
              {props?.description
                ? props.description
                : "No description available."}
            </p>
          </main>

          <NavLink
            to={`/book/${props.id}`}
            className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition ease-[cubic-bezier(0.03, 0.84, 0.68, 1.42)]  self-end"
          >
            <Button variant="highlight" className="flex items-center gap-1">
              See more
              <ArrowRight
                size={16}
                weight="bold"
                className="icon-link-animation"
              />
            </Button>
          </NavLink>
        </div>
      </NavLink>
    </motion.li>
  );
};

export { Book };
