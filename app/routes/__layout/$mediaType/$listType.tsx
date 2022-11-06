import { getMovies } from "~/services/movies";
import { getTVShows } from "~/services/tv-shows";
import { getTrending } from "~/services/trending";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { HeadersFunction, LoaderArgs } from "@remix-run/node";

const loader = async ({ params }: LoaderArgs) => {
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
        results: trendingMedia.results.map(
          ({
            id,
            poster_path,
            title,
            vote_average,
            release_date,
            vote_count,
          }) => ({
            id,
            poster_path,
            title,
            vote_average,
            release_date,
            vote_count,
          })
        ),
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
    });

    return json(
      {
        results: movies.results.map(
          ({
            id,
            poster_path,
            title,
            vote_average,
            release_date,
            vote_count,
          }) => ({
            id,
            poster_path,
            title,
            vote_average,
            release_date,
            vote_count,
          })
        ),
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
    });

    return json(
      {
        results: tvShows.results.map(
          ({
            id,
            poster_path,
            title,
            vote_average,
            release_date,
            vote_count,
          }) => ({
            id,
            poster_path,
            title,
            vote_average,
            release_date,
            vote_count,
          })
        ),
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
  const { results } = useLoaderData<typeof loader>();

  return (
    <ul className="grid grid-cols-2 gap-x-8 gap-y-10 pt-6 pb-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:pt-14">
      {results.map((mediaItem) => (
        <li key={mediaItem.id} className="snap-center sm:snap-start">
          <a
            href="/"
            className="bg-neutral-00 block aspect-2/3 overflow-hidden rounded-lg border border-neutral-700 bg-clip-padding transition duration-500"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${
                mediaItem.poster_path ?? ""
              }`}
              alt={mediaItem.title}
              className="h-full w-full object-cover object-bottom"
            />
          </a>
        </li>
      ))}
    </ul>
  );
};

export { loader, headers };
export default Home;
