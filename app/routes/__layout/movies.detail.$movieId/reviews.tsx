import { Fragment } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { getMovie } from "~/services/movies.server";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb";

const loader = async ({ params }: LoaderArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [movie] = await Promise.all([getMovie(params.movieId)]);

  return json({
    movie: {
      title: movie.title,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
    },
  });
};

const Reviews = () => {
  const { movie } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <div className="flex items-start gap-x-4 pt-10 sm:gap-x-5">
        <div className="aspect-2/3 w-16 shrink-0 overflow-hidden rounded-lg">
          <img
            src={`${BASE_IMAGE_URL}${PosterSizes.sm}${movie.posterPath}`}
            alt={`${movie.title} main poster`}
            width={780}
            height={1169}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white lg:text-xl">
            {movie.title}
          </h1>
          <p className="pt-1 text-sm text-neutral-400">{movie.releaseDate}</p>
        </div>
      </div>
      <div className="mt-8 border-t border-neutral-800 pb-16 pt-7 lg:mt-9 lg:pt-8">
        <span className="text-white">add reviews</span>
      </div>
    </Fragment>
  );
};

export { loader };
export default Reviews;
