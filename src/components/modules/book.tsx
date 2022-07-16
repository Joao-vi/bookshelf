import { Button } from "components/elements";
import { ArrowRight, ArrowUpRight } from "phosphor-react";
import { Books } from "services/api";

const Book = (props: Books["volumeInfo"]) => {
  return (
    <a
      className="flex-1 self-stretch basis-[500px] flex items-center p-3 py-4 
    gap-2 border-[2px] border-card-border rounded bg-card text-card-p group
    hover:-translate-y-2 transition ease-[cubic-bezier(0.03, 0.84, 0.68, 1.42)]
    cursor-pointer
    "
    >
      <img
        className="object-contain rounded"
        src={props.imageLinks?.thumbnail}
        alt={props.title}
      />

      <div className=" self-start w-full flex flex-col gap-2">
        <header>
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">{props.title}</h1>
            <div className="font-semibold text-highlight">
              <span>{props.language}</span> / <span>{props.publishedDate}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 font-medium">
            <span>{props.publisher}</span>•<span>Book</span>•
            <span> {props.pageCount} pages </span>
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

        <a
          href="#"
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
        </a>
      </div>
    </a>
  );
};

export { Book };
