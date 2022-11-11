import { Fragment } from "react";
import clsx from "clsx";
import { convertToSearchParams } from "~/utils/api-client";
import { getMovies } from "~/services/movies";
import { getTVShows } from "~/services/tv-shows";
import { getTrending } from "~/services/trending";
import { json } from "@remix-run/node";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";

const loader = async ({ request, params }: LoaderArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const page = Number(searchParams.get("page") ?? 1);

  if (
    (params.mediaType === "movies" || params.mediaType === "tv-shows") &&
    params.listType === "trending"
  ) {
    const trendingMedia = await getTrending({
      mediaType: params.mediaType === "movies" ? "movie" : "tv",
      timeWindow: "day",
    });

    return json(
      {
        totalPages: 1,
        results: trendingMedia.results.map((trendingMedia) => ({
          id: trendingMedia.id,
          posterPath: trendingMedia.poster_path,
          title:
            trendingMedia.media_type === "movie"
              ? trendingMedia.title
              : trendingMedia.name,
          voteAverage: trendingMedia.vote_average,
          releaseDate:
            trendingMedia.media_type === "movie"
              ? trendingMedia.release_date
              : trendingMedia.first_air_date,
        })),
        page: 1,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=10, stale-while-revalidate=31536000",
        },
      }
    );
  }

  if (
    params.mediaType === "movies" &&
    (params.listType === "now-playing" ||
      params.listType === "popular" ||
      params.listType === "top-rated" ||
      params.listType === "upcoming")
  ) {
    const movies = await getMovies({
      subCollection: params.listType.replace(/-/g, "_") as
        | "popular"
        | "upcoming"
        | "now_playing"
        | "top_rated",
      page,
    });

    return json(
      {
        totalPages: movies.total_pages,
        results: movies.results.map((movie) => ({
          id: movie.id,
          posterPath: movie.poster_path,
          title: movie.title,
          voteAverage: movie.vote_average,
          releaseDate: movie.release_date,
        })),
        page: movies.page,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=10, stale-while-revalidate=31536000",
        },
      }
    );
  }

  if (
    params.mediaType === "tv-shows" &&
    (params.listType === "airing-today" ||
      params.listType === "on-the-air" ||
      params.listType === "popular" ||
      params.listType === "top-rated")
  ) {
    const tvShows = await getTVShows({
      subCollection: params.listType.replace(/-/g, "_") as
        | "airing_today"
        | "on_the_air"
        | "popular"
        | "top_rated",
      page,
    });

    return json(
      {
        totalPages: tvShows.total_pages,
        results: tvShows.results.map((tvShow) => ({
          id: tvShow.id,
          posterPath: tvShow.poster_path,
          title: tvShow.name,
          voteAverage: tvShow.vote_average,
          releaseDate: tvShow.first_air_date,
        })),
        page: tvShows.page,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=10, stale-while-revalidate=31536000",
        },
      }
    );
  }

  throw new Error(
    `Unhandled case of mediaType and listType: ${JSON.stringify(params)}`
  );
};

const headers: HeadersFunction = ({ loaderHeaders }) => ({
  "Cache-Control": loaderHeaders.get("Cache-Control") ?? "",
});

const Home = (): React.ReactElement => {
  const { listType } = useParams<"listType">();
  const isTrending = listType === "trending";

  const { results, page, totalPages } = useLoaderData<typeof loader>();

  const renderPaginationButton = (
    label: React.ReactElement,
    to: Parameters<typeof Link>[0]["to"] | null
  ) =>
    to === null ? (
      <button
        disabled
        type="button"
        className="flex cursor-not-allowed items-center rounded-lg px-3 py-1 text-base font-bold text-neutral-500"
      >
        {label}
      </button>
    ) : (
      <Link
        to={to}
        className="flex items-center rounded-lg px-3 py-1 text-base font-bold text-neutral-400 transition hover:bg-neutral-800 hover:text-neutral-200"
      >
        {label}
      </Link>
    );

  return (
    <Fragment>
      <ul
        className={clsx(
          isTrending && "pb-20",
          "grid grid-cols-2 gap-x-8 gap-y-10 pt-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:pt-14"
        )}
      >
        {results.map((mediaItem) => (
          <li key={mediaItem.id}>
            <a
              href="/"
              className="block aspect-2/3 overflow-hidden rounded-lg border border-neutral-700 bg-neutral-700 bg-clip-padding transition duration-500"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${
                  mediaItem.posterPath ?? ""
                }`}
                alt={mediaItem.title}
                className="h-full w-full object-cover object-bottom"
              />
            </a>
            <div className="flex items-center justify-between pt-2 text-sm text-neutral-200">
              <p title={mediaItem.title} className="w-2/3 truncate font-bold">
                {mediaItem.title}
              </p>
              <p className="flex items-center gap-x-1 font-normal">
                <Star className="mb-0.5 h-4 w-4 fill-yellow-500 stroke-yellow-500 sm:mb-0" />
                {mediaItem.voteAverage.toPrecision(2)}
              </p>
            </div>
            <p className="text-xs text-neutral-400">{mediaItem.releaseDate}</p>
          </li>
        ))}
      </ul>
      {isTrending ? null : (
        <nav className="flex items-center justify-center gap-x-10 px-4 py-10 sm:px-0 sm:pt-16 sm:pb-14">
          {renderPaginationButton(
            <Fragment>
              <ArrowLeft
                className="-ml-0.5 mt-0.5 mr-2 h-4 w-4"
                aria-hidden="true"
              />
              Previous
            </Fragment>,
            page <= 1
              ? null
              : {
                  search: convertToSearchParams({
                    page: page - 1,
                  }),
                }
          )}
          {renderPaginationButton(
            <Fragment>
              Next
              <ArrowRight
                className="ml-2 -mr-0.5 mt-0.5 h-4 w-4"
                aria-hidden="true"
              />
            </Fragment>,
            page >= totalPages
              ? null
              : {
                  search: convertToSearchParams({
                    page: page + 1,
                  }),
                }
          )}
        </nav>
      )}
    </Fragment>
  );
};

export { loader, headers };
export default Home;
