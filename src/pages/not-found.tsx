const NotFound = () => (
  <div className="w-screen h-screen flex flex-col items-center justify-center gap-2">
    <h1>Not found.</h1>
    <span>It seems this page does not exist.</span>

    <span>
      Go back to{" "}
      <a href="/browse" className="text-highlight">
        Browse
      </a>{" "}
      page
    </span>
  </div>
);

export { NotFound };
