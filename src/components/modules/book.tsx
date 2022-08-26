import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { NavLink } from "react-router-dom";
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
  },
};

export type BookProps = VolumeInfo & { id: string };

const Book = (props: BookProps) => {
  
  return (
      <motion.div
        variants={variants}
        initial="hidden"
        animate='visible'
        className="flex-1 self-stretch basis-[440px] flex items-start p-3 py-4 
        gap-2 border-[2px] border-card-border rounded bg-card text-card-p group"
      >
        <img
          className="object-contain rounded w-[100px]"
          src={props.imageLinks?.thumbnail || noCoverBook}
          alt={props.title}
        />

        <div className="self-start w-full flex flex-col">
          <header>
            <div className="flex justify-between">
              <h1 className="font-bold text-lg">{props.title}</h1>
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

          <main className="relative">
            <span className="text-headline">Description</span>
            <p className="font-normal h-[calc(3*1.5rem)] truncate  whitespace-normal relative overflow-text">
              {props?.description ? props.description : "No description available."}
            </p>
            <NavLink to={`/book/${props.id}`} className="absolute flex items-center gap-1 right-0 bottom-0 text-highlight bold z[1] bg-card pl-2">Read more <ArrowRight weight="bold"/> </NavLink>
          </main>
        </div>
      </motion.div>
  );
};

export { Book };
