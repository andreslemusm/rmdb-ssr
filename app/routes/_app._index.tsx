import { clsx } from "clsx"
import { cacheHeader } from "pretty-cache-header"
import { Fragment } from "react"
import { StarIcon } from "~/assets/icons"
import { Link } from "~/components/link"
import { Pagination } from "~/components/pagination"
import { getMovies } from "~/services/movies.server"
import { generateMetaTags } from "~/utils/meta-tags"
import { BASE_IMAGE_URL, PosterSizes } from "~/utils/tmdb"
import type { Route } from "./+types/_app._index"

const MOVIE_CATEGORIES = [
  { label: "Now Playing", value: "now-playing" },
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top-rated" },
  { label: "Upcoming", value: "upcoming" },
] as const

const loader = async ({ unstable_url: url }: Route.LoaderArgs) => {
  const listType = url.searchParams.get("listType") ?? "now-playing"
  const page = Number(url.searchParams.get("page") ?? 1)

  if (
    listType !== "now-playing" &&
    listType !== "popular" &&
    listType !== "top-rated" &&
    listType !== "upcoming"
  ) {
    throw new Error(`Unhandled case of listType: ${JSON.stringify(listType)}`)
  }

  const moviesResponse = await getMovies({
    page,
    // Note: remove after migration to TanStack Start
    // oxlint-disable-next-line typescript/no-unsafe-type-assertion
    subCollection: listType.replaceAll("-", "_") as
      | "popular"
      | "upcoming"
      | "now_playing"
      | "top_rated",
  })

  return {
    listType,
    movies: moviesResponse.results.map((movie) => ({
      id: movie.id,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      title: movie.title,
      voteAverage: movie.vote_average,
    })),
    page,
    totalPages: moviesResponse.total_pages,
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
    description:
      "React Movie Database (RMDB) is a popular, user editable database for movies. Powered by TMDB",
    title: loaderData
      ? `${
          MOVIE_CATEGORIES.find(({ value }) => value === loaderData.listType)
            ?.label ?? "Now Playing"
        } | React Movie Database (RMDB)`
      : "React Movie Database (RMDB)",
  })

const Home = ({
  loaderData: { movies, page, totalPages, listType },
}: Route.ComponentProps) => (
  <Fragment>
    <div className="flex items-center gap-x-1 overflow-x-auto pt-4 sm:pt-7 lg:pt-9">
      {MOVIE_CATEGORIES.map(({ label, value }) => (
        <Link
          href={{ pathname: ".", search: `?listType=${value}` }}
          key={value}
          className={clsx(
            value === listType
              ? "bg-neutral-800 text-neutral-200"
              : "text-neutral-400 hover:text-neutral-200",
            "shrink-0 rounded-lg px-3 py-2 text-sm font-bold transition-colors ease-out",
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
          className="block rounded-lg p-2 transition-colors duration-500 ease-out hover:bg-neutral-800"
        >
          <Link href={`/movies/${movie.id}`} prefetch="intent">
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
                <StarIcon className="mb-0.5 h-4 w-4 fill-yellow-500 stroke-yellow-500 sm:mb-0" />
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
)

export { loader, headers, meta }
export default Home
