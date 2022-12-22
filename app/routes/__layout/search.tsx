import { Fragment } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { Pagination } from "~/components/pagination";
import { formatNumberAsCompactNumber } from "~/utils/formatters.server";
import { getSearchMovies } from "~/services/search.server";
import { json } from "@remix-run/node";
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb";
import { Link, useLoaderData } from "@remix-run/react";

const loader = async ({ request }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page") ?? 1);
  const query = searchParams.get("query") ?? "";

  const movies = await getSearchMovies({ query, page });

  return json(
    {
      query,
      page,
      movies: movies.results.map((movie) => ({
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
      totalPages: movies.total_pages,
      totalResults: formatNumberAsCompactNumber(movies.total_results),
    },
    {
      headers: {
        "Cache-Control": "public, max-age=10, stale-while-revalidate=31536000",
      },
    }
  );
};

const Search = () => {
  const { movies, totalPages, page, query, totalResults } =
    useLoaderData<typeof loader>();

  return (
    <Fragment>
      <h1 className="mt-10 text-center text-2xl font-bold capitalize text-neutral-100">
        {query}
      </h1>
      <p className="mt-4 text-center text-neutral-400">
        Explore {totalResults} {query} movies
      </p>
      <ul className="mt-10 flex flex-col gap-y-4">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link
              to={`/movies/detail/${movie.id}`}
              className="flex gap-x-5 overflow-hidden rounded-xl border border-neutral-800"
            >
              <img
                src={
                  movie.posterPath
                    ? `${BASE_IMAGE_URL}${PosterSizes.sm}${movie.posterPath}`
                    : undefined
                }
                alt={movie.title}
                className="aspect-2/3 w-24 shrink-0 object-cover object-center"
              />
              <div className="overflow-hidden pt-4 pb-5 pr-4">
                <h2 className="truncate font-bold text-neutral-100">
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
                <p className="mt-4 text-sm text-neutral-200 line-clamp-2">
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

export { loader };
export default Search;
