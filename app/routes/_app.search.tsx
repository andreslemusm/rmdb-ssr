import { Fragment } from "react";
import { Pagination } from "~/components/pagination";
import { cacheHeader } from "pretty-cache-header";
import { formatNumberAsCompactNumber } from "~/utils/formatters.server";
import { generateMetaTags } from "~/utils/meta-tags";
import { getSearchMovies } from "~/services/search.server";
import { json } from "@vercel/remix";
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb";
import type {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";

const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const page = Number(url.searchParams.get("page") ?? 1);
  const query = url.searchParams.get("query") ?? "";

  const moviesResponse = await getSearchMovies({ query, page });

  return json(
    {
      query,
      page,
      movies: moviesResponse.results.map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date
          ? new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date(movie.release_date))
          : null,
        overview: movie.overview,
      })),
      totalPages: moviesResponse.total_pages,
      totalResults: formatNumberAsCompactNumber(moviesResponse.total_results),
    },
    {
      headers: {
        "Cache-Control": cacheHeader({
          public: true,
          maxAge: "1m",
          staleWhileRevalidate: "1month",
        }),
      },
    },
  );
};

const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
});

const meta: MetaFunction<typeof loader> = ({ data }) =>
  generateMetaTags({
    title: data
      ? `Search: ${data.query} | React Movie Database (RMDB)`
      : "Search | React Movie Database (RMDB)",
    description:
      "React Movie Database (RMDB) is a popular, user editable database for movies. Powered by TMDB",
  });

const Search = () => {
  const { movies, totalPages, page, query, totalResults } =
    useLoaderData<typeof loader>();

  return (
    <Fragment>
      <h1 className="mt-10 text-center text-2xl font-bold capitalize text-neutral-100">
        {query}
      </h1>
      <p className="mt-4 text-center text-base text-neutral-400">
        Explore {totalResults} {query} movies
      </p>
      <ul className="mt-10 grid grid-cols-1 gap-9 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition hover:border-neutral-700 hover:bg-neutral-800"
          >
            <Link to={`/movies/${movie.id}`} className="flex" prefetch="intent">
              {movie.posterPath ? (
                <img
                  src={`${BASE_IMAGE_URL}${PosterSizes.sm}${movie.posterPath}`}
                  alt={`${movie.title} poster`}
                  width={154}
                  height={231}
                  className="aspect-2/3 w-28 shrink-0 object-cover"
                />
              ) : (
                <div className="grid aspect-2/3 w-28 shrink-0 place-items-center bg-cyan-500/10">
                  <p className="font-bold text-cyan-500">No Poster</p>
                </div>
              )}
              <div className="overflow-hidden p-4">
                <h2
                  title={movie.title}
                  className="truncate font-bold text-neutral-100"
                >
                  {movie.title}
                </h2>
                {movie.releaseDate ? (
                  <time
                    className="text-sm text-neutral-400"
                    dateTime={movie.releaseDate}
                  >
                    {movie.releaseDate}
                  </time>
                ) : null}
                <p className="mt-4 line-clamp-3 text-sm text-neutral-200">
                  {movie.overview}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} />
    </Fragment>
  );
};

export { meta, loader, headers };
export default Search;
