import { useSearchParams } from "@remix-run/react";

const Search = (): React.ReactElement => {
  const [searchParams] = useSearchParams();

  return (
    <div className="text-neutral-300">
      <h1>
        Search{" "}
        <strong className="text-white">{searchParams.get("query")}</strong>
      </h1>
      <ul className="list-disc pl-10">
        <li>Movies: /search/movies</li>
        <li>TV Shows: /search/tv</li>
        <li>People: /search/person</li>
      </ul>
    </div>
  );
};

export default Search;
