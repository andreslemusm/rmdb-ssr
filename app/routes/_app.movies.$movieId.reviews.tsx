import { Fragment } from "react";
import { Review } from "~/components/review";
import { cacheHeader } from "pretty-cache-header";
import { generateMetaTags } from "~/utils/meta-tags";
import { json } from "@vercel/remix";
import { markdownFormatter } from "~/utils/formatters.server";
import { useLoaderData } from "@remix-run/react";
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb";
import type {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@vercel/remix";
import { getMovie, getMovieReviews } from "~/services/movies.server";

const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [movie, reviews] = await Promise.all([
    getMovie(params.movieId),
    getMovieReviews(params.movieId),
  ]);

  return json(
    {
      movie: {
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        overview: movie.release_date,
      },
      reviews: reviews.results.map((review) => ({
        id: review.id,
        author: {
          avatarPath: review.author_details.avatar_path,
          name: review.author_details.name
            ? review.author_details.name
            : review.author_details.username,
        },
        rating: review.author_details.rating,
        content: markdownFormatter(review.content),
        createdDate: new Intl.DateTimeFormat("en-US", {
          dateStyle: "medium",
        }).format(new Date(reviews.results[0].created_at)),
      })),
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
      ? `${data.movie.title} - Reviews | React Movie Database (RMDB)`
      : "React Movie Database (RMDB)",
    description: data?.movie.overview ?? "",
  });

const Reviews = () => {
  const { movie, reviews } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <div className="flex items-start gap-x-4 pt-10 sm:gap-x-5">
        <div className="aspect-2/3 w-16 shrink-0 overflow-hidden rounded-lg">
          {movie.posterPath ? (
            <img
              src={`${BASE_IMAGE_URL}${PosterSizes.sm}${movie.posterPath}`}
              alt={`${movie.title} main poster`}
              width={780}
              height={1169}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-cyan-500/10">
              <p className="font-bold text-cyan-500">No Poster</p>
            </div>
          )}
        </div>
        <div>
          <h1 className="text-lg font-bold text-neutral-50 lg:text-xl">
            {movie.title}
          </h1>
          <p className="pt-1 text-sm text-neutral-400">{movie.releaseDate}</p>
        </div>
      </div>
      <section className="mt-8 border-t border-neutral-800 pb-16 pt-7 lg:mt-9 lg:pt-8">
        <h2 className="flex items-baseline gap-x-2 text-lg font-bold text-neutral-200">
          Reviews
          <span className="rounded-lg bg-neutral-800 px-2 text-xs text-neutral-200">
            {reviews.length}
          </span>
        </h2>
        {reviews.length > 0 ? (
          <ul className="flex flex-col gap-y-10 pt-8">
            {reviews.map((review) => (
              <li key={review.id}>
                <Review {...review} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-5 text-center text-neutral-400">
            We don&apos;t have any reviews for {movie.title}.
          </p>
        )}
      </section>
    </Fragment>
  );
};

export { meta, loader, headers };
export default Reviews;
