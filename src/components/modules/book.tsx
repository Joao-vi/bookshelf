import { Books } from "services/api";

const Book = (props: Books["volumeInfo"]) => {
  return (
    <article className="flex-1 self-stretch basis-[500px] flex items-center p-3 py-4  gap-2 border-[2px] border-card-border rounded  bg-card text-card-p">
      <img
        className="object-contain rounded"
        src={props.imageLinks?.thumbnail}
        alt={props.title}
      />

      <div className=" self-start w-full flex flex-col gap-2">
        <header>
          <div className="flex justify-between">
            <h1 className="font-bold text-xl">The Lion King </h1>
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
          <p className="font-normal h-[calc(3*24px)] truncate  whitespace-normal relative overflow-text">
            {props?.description
              ? props.description
              : "No description available."}
          </p>
        </main>
      </div>
    </article>
  );
};

export { Book };
