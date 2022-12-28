import { Fragment } from "react";
import { Pagination } from "~/components/pagination";
import { Star } from "lucide-react";
import type { categories } from "../$mediaType";
import clsx from "clsx";
import { getMovies } from "~/services/movies.server";
import { getTVShows } from "~/services/tv-shows.server";
import { getTrending } from "~/services/trending.server";
import { json } from "@remix-run/node";
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb";
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

const Home = () => {
  const { listType, mediaType } = useParams() as {
    mediaType: keyof typeof categories;
    listType: string;
  };
  const isTrending = listType === "trending";

  const { results, page, totalPages } = useLoaderData<typeof loader>();

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
            <Link
              to={`/${mediaType}/detail/${mediaItem.id}`}
              className="block aspect-2/3 overflow-hidden rounded-lg bg-neutral-700 bg-clip-padding transition duration-500 hover:brightness-50"
            >
              <img
                src={`${BASE_IMAGE_URL}${PosterSizes.lg}${mediaItem.posterPath}`}
                alt={`${mediaItem.title} poster`}
                width={342}
                height={513}
                className="h-full w-full object-cover object-bottom"
              />
            </Link>
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
      {isTrending ? null : <Pagination page={page} totalPages={totalPages} />}
    </Fragment>
  );
};

export { loader, headers };
export default Home;
