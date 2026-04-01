import { cacheHeader } from "pretty-cache-header"
import { Fragment } from "react"
import { Review } from "~/components/review"
import { getMovie, getMovieReviews } from "~/services/movies.server"
import { markdownFormatter } from "~/utils/formatters.server"
import { generateMetaTags } from "~/utils/meta-tags"
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb"
import type { Route } from "./+types/_app.movies.$movieId.reviews"

const loader = async ({ params }: Route.LoaderArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`)
  }

  const [movie, reviews] = await Promise.all([
    getMovie(params.movieId),
    getMovieReviews(params.movieId),
  ])

  return {
    movie: {
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
    },
    reviews: reviews.results.map((review) => ({
      author: {
        avatarPath: review.author_details.avatar_path,
        name: review.author_details.name
          ? review.author_details.name
          : review.author_details.username,
      },
      // This is safe because the content is already sanitized by the TMDB API
      content: markdownFormatter(review.content),
      createdDate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
      }).format(new Date(review.created_at)),
      id: review.id,
      rating: review.author_details.rating,
    })),
  }
}

const headers: Route.HeadersFunction = () => ({
  "Cache-Control": cacheHeader({
    maxAge: "1m",
    public: true,
    staleWhileRevalidate: "1month",
  }),
})

const meta: Route.MetaFunction = ({ loaderData }) =>
  generateMetaTags({
    description: loaderData?.movie.overview ?? "",
    title: loaderData
      ? `${loaderData.movie.title} - Reviews | React Movie Database (RMDB)`
      : "React Movie Database (RMDB)",
  })

const Reviews = ({ loaderData: { movie, reviews } }: Route.ComponentProps) => (
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
    <section className="mt-8 border-t border-neutral-800 pt-7 pb-16 lg:mt-9 lg:pt-8">
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
)

export { meta, loader, headers }
export default Reviews
