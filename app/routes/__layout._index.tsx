import { Fragment } from "react";
import { Pagination } from "~/components/pagination";
import { Star } from "lucide-react";
import { cacheHeader } from "pretty-cache-header";
import clsx from "clsx";
import { generateMetaTags } from "~/utils/meta-tags";
import { getMovies } from "~/services/movies.server";
import { json } from "@vercel/remix";
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb";
import type {
  HeadersFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@vercel/remix";
import { Link, useLoaderData } from "@remix-run/react";

const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const listType = url.searchParams.get("listType") ?? "now-playing";
  const page = Number(url.searchParams.get("page") ?? 1);

  if (
    listType !== "now-playing" &&
    listType !== "popular" &&
    listType !== "top-rated" &&
    listType !== "upcoming"
  ) {
    throw new Error(`Unhandled case of listType: ${JSON.stringify(listType)}`);
  }

  const moviesResponse = await getMovies({
    subCollection: listType.replace(/-/g, "_") as
      | "popular"
      | "upcoming"
      | "now_playing"
      | "top_rated",
    page,
  });

  return json(
    {
      listType: listType,
      totalPages: moviesResponse.total_pages,
      movies: moviesResponse.results.map((movie) => ({
        id: movie.id,
        posterPath: movie.poster_path,
        title: movie.title,
        voteAverage: movie.vote_average,
        releaseDate: movie.release_date,
      })),
      page,
    },
    {
      headers: {
        "Cache-Control": cacheHeader({
          public: true,
          maxAge: "1m",
          staleWhileRevalidate: "1month",
        }),
      },
    }
  );
};

const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
});

const meta: V2_MetaFunction<typeof loader> = ({ data }) =>
  generateMetaTags({
    title: `${
      listTypes.find(({ value }) => value === data.listType)?.label ??
      "Now Playing"
    } | React Movie Database (RMDB)`,
    description:
      "React Movie Database (RMDB) is a popular, user editable database for movies. Powered by TMDB",
  });

const Home = () => {
  const { movies, page, totalPages, listType } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <div className="flex items-center gap-x-1 overflow-x-auto pt-4 sm:pt-7 lg:pt-9">
        {listTypes.map(({ label, value }) => (
          <Link
            to={{ pathname: ".", search: `?listType=${value}` }}
            key={value}
            className={clsx(
              value === listType
                ? "bg-neutral-800 text-neutral-200"
                : "text-neutral-400 hover:text-neutral-200",
              "shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition"
            )}
            prefetch="intent"
          >
            {label}
          </Link>
        ))}
      </div>
      <ul className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:pt-14">
        {movies.map((movie) => (
          <li
            key={movie.id}
            className="block rounded-lg p-2 transition duration-500 hover:bg-neutral-800"
          >
            <Link to={`/movies/${movie.id}`} prefetch="intent">
              <div className="aspect-2/3 overflow-hidden rounded-lg">
                {movie.posterPath ? (
                  <img
                    src={`${BASE_IMAGE_URL}${PosterSizes.lg}${movie.posterPath}`}
                    alt={`${movie.title} poster`}
                    width={342}
                    height={513}
                    className="h-full w-full object-cover object-bottom"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-cyan-500/10">
                    <p className="font-bold text-cyan-500">No Poster</p>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between pt-2 text-sm text-neutral-200">
                <p title={movie.title} className="w-2/3 truncate font-bold">
                  {movie.title}
                </p>
                <p className="flex items-center gap-x-1 font-normal">
                  <Star className="mb-0.5 h-4 w-4 fill-yellow-500 stroke-yellow-500 sm:mb-0" />
                  {movie.voteAverage.toPrecision(2)}
                </p>
              </div>
              <p className="text-xs text-neutral-400">{movie.releaseDate}</p>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination page={page} totalPages={totalPages} />
    </Fragment>
  );
};

const listTypes = [
  {
    label: "Now Playing",
    value: "now-playing",
  },
  {
    label: "Popular",
    value: "popular",
  },
  {
    label: "Top Rated",
    value: "top-rated",
  },
  {
    label: "Upcoming",
    value: "upcoming",
  },
] as const;

export { loader, headers, meta };
export default Home;
