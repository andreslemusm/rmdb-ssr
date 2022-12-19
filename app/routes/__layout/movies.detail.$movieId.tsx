import type { LoaderArgs } from "@remix-run/node";
import { Modal } from "~/components/modal";
import { Portal } from "@headlessui/react";
import clsx from "clsx";
import { johnDoe } from "~/assets/images";
import { json } from "@remix-run/node";
import { marked } from "marked";
import {
  BASE_IMAGE_URL,
  BackdropSizes,
  PosterSizes,
  ProfileSizes,
} from "~/utils/tmdb";
import { ChevronRight, Link as LinkIcon, Play, Star } from "lucide-react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "~/assets/icons";
import { Fragment, useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import {
  formatLangCodeAsLangName,
  formatNumberAsCompactNumber,
  formatNumberAsCurrency,
} from "~/utils/formatters.server";
import {
  getMovie,
  getMovieCredits,
  getMovieExternalIDs,
  getMovieImages,
  getMovieRecommendations,
  getMovieReviews,
  getMovieVideos,
} from "~/services/movies.server";

const loader = async ({ params }: LoaderArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [
    movie,
    credits,
    recommendations,
    externalIDs,
    reviews,
    images,
    videos,
  ] = await Promise.all([
    getMovie(params.movieId),
    getMovieCredits(params.movieId),
    getMovieRecommendations(params.movieId),
    getMovieExternalIDs(params.movieId),
    getMovieReviews(params.movieId),
    getMovieImages(params.movieId),
    getMovieVideos(params.movieId),
  ]);

  return json({
    movie: {
      backdropPath: movie.backdrop_path,
      posterPath: movie.poster_path,
      title: movie.title,
      homepage: movie.homepage,
      voteAverage: movie.vote_average.toPrecision(2),
      voteCount: formatNumberAsCompactNumber(movie.vote_count),
      releaseDate: movie.release_date,
      runtime: `${Math.floor(movie.runtime / 60)}h ${
        movie.runtime - Math.floor(movie.runtime / 60) * 60
      }m`,
      genres: movie.genres,
      tagline: movie.tagline,
      overview: movie.overview,
      status: movie.status,
      budget: formatNumberAsCurrency(movie.budget),
      revenue: formatNumberAsCurrency(movie.revenue),
      originalLanguage: formatLangCodeAsLangName(movie.original_language),
    },
    youtubeTrailerID: videos.results.find((video) => video.type === "Trailer")
      ?.key,
    credits: {
      ...credits.crew.reduce(
        (mainCrew, crewPerson) => {
          if (crewPerson.job === "Director")
            return {
              ...mainCrew,
              directors: [...mainCrew.directors, crewPerson.name],
            };
          if (crewPerson.job === "Writer") {
            return {
              ...mainCrew,
              writters: [...mainCrew.writters, crewPerson.name],
            };
          }
          if (crewPerson.job === "Characters") {
            return {
              ...mainCrew,
              characters: [...mainCrew.writters, crewPerson.name],
            };
          }
          if (crewPerson.job === "Editor") {
            return {
              ...mainCrew,
              editors: [...mainCrew.writters, crewPerson.name],
            };
          }

          return mainCrew;
        },
        {
          directors: [] as Array<string>,
          writters: [] as Array<string>,
          characters: [] as Array<string>,
          editors: [] as Array<string>,
        }
      ),
      topCast: credits.cast.slice(0, 9).map((castPerson) => ({
        id: castPerson.id,
        profilePath: castPerson.profile_path,
        name: castPerson.name,
        character: castPerson.character,
      })),
    },
    reviews: {
      featuredReview:
        reviews.results.length > 0
          ? {
              author: {
                avatarPath: reviews.results[0].author_details.avatar_path,
                name: reviews.results[0].author_details.name,
              },
              rating: reviews.results[0].author_details.rating,
              content: marked.parse(reviews.results[0].content),
            }
          : null,
      count: reviews.total_results,
    },
    recommendations: recommendations.results.map((recommendation) => ({
      id: recommendation.id,
      backdropPath: recommendation.backdrop_path,
      title: recommendation.title,
      voteAverage: recommendation.vote_average.toPrecision(2),
    })),
    posters: {
      count: images.posters.length,
      featured: images.posters.slice(0, 9),
    },
    backdrops: {
      count: images.backdrops.length,
      featured: images.backdrops.slice(0, 9),
    },
    externalIDs: {
      facebookID: externalIDs.facebook_id,
      instagramID: externalIDs.instagram_id,
      twitterID: externalIDs.twitter_id,
    },
  });
};

const Movie = () => {
  const { movie, credits, recommendations, externalIDs, reviews } =
    useLoaderData<typeof loader>();

  return (
    <Fragment>
      {/* TODO: add movie navigation */}
      {/* Description */}
      {/* Mobile */}
      <div className="mt-8 lg:hidden">
        <div className="relative aspect-video overflow-visible">
          <img
            src={`${BASE_IMAGE_URL}${BackdropSizes.xs}${movie.backdropPath}`}
            alt={`${movie.title} main backdrop blurred`}
            className="h-full w-full object-cover py-10 px-14 blur-2xl sm:blur-3xl"
          />
          <div className="absolute inset-0 grid place-items-center">
            <div className="aspect-2/3 w-1/3 overflow-hidden rounded-lg">
              <img
                src={`${BASE_IMAGE_URL}${PosterSizes["2xl"]}${movie.posterPath}`}
                alt={`${movie.title} main poster`}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 pt-5 sm:gap-3">
          <h1 className="text-center text-xl font-bold text-neutral-100 md:text-2xl">
            {movie.title}
          </h1>
          <a
            href={movie.homepage}
            target="_blank"
            className="mt-1 inline-block rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100 sm:mt-1.5"
            rel="noreferrer"
          >
            <span className="sr-only">Visit website</span>
            <LinkIcon aria-hidden className="h-3.5 w-3.5" />
          </a>
        </div>
        <div className="mx-auto grid max-w-sm grid-cols-2 place-items-center pt-5 sm:pt-6">
          <div className="flex items-center gap-x-1.5">
            <Star
              aria-hidden
              className="h-4 w-4 fill-yellow-500 stroke-yellow-500"
            />
            <p className="font-bold text-neutral-200">
              {movie.voteAverage}
              <span className="text-sm font-normal text-neutral-400">
                /10 • {movie.voteCount}
              </span>
            </p>
          </div>
          <TrailerModal />
        </div>
        <div className="mt-5 grid grid-rows-2 place-items-center gap-y-1 border-b border-t border-neutral-800 pt-2 pb-3 sm:mt-6 sm:gap-y-2 sm:pt-3 sm:pb-4">
          <p className="text-sm text-neutral-400">
            {movie.releaseDate} • {movie.runtime}
          </p>
          <div className="flex items-center justify-center gap-x-1">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-lg bg-neutral-800 px-2 text-xs text-neutral-200"
              >
                {genre.name}
              </span>
            ))}
          </div>
        </div>
        <p className="pt-5 text-center italic text-neutral-400">
          {movie.tagline}
        </p>
        <p className="pt-5 text-justify text-neutral-300">{movie.overview}</p>
        <dl className="grid grid-cols-2 justify-center gap-x-4 gap-y-2 pt-8 sm:gap-y-4">
          <Description
            term="Directors"
            detail={
              credits.directors.length > 0 ? credits.directors.join(", ") : null
            }
          />
          <Description
            term="Writters"
            detail={
              credits.writters.length > 0 ? credits.writters.join(", ") : null
            }
          />
          <Description
            term="Characters"
            detail={
              credits.characters.length > 0
                ? credits.characters.join(", ")
                : null
            }
          />
          <Description
            term="Editors"
            detail={
              credits.editors.length > 0 ? credits.editors.join(", ") : null
            }
          />
        </dl>
      </div>
      {/* Desktop */}
      <div className="hidden grid-cols-3 gap-x-20 pt-10 lg:grid">
        <Portal
          as="div"
          style={{ marginTop: "6.189rem", height: "35rem" }}
          className="absolute inset-x-0 top-0 -z-10 hidden overflow-hidden lg:block"
        >
          <img
            src={`${BASE_IMAGE_URL}${BackdropSizes.sm}${movie.backdropPath}`}
            alt={`${movie.title} main backdrop`}
            className="h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900 via-neutral-900/80 to-neutral-900" />
        </Portal>
        <div className="aspect-2/3 overflow-hidden rounded-xl">
          <img
            src={`${BASE_IMAGE_URL}${PosterSizes["2xl"]}${movie.posterPath}`}
            alt={`${movie.title} main poster`}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-2">
          <div className="flex items-center gap-x-3">
            <h1 className="text-center text-2xl font-bold text-neutral-100">
              {movie.title}
            </h1>
            <a
              href={movie.homepage}
              target="_blank"
              className="mt-1.5 inline-block rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
              rel="noreferrer"
            >
              <span className="sr-only">Visit website</span>
              <LinkIcon aria-hidden className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
      {/* Cast */}
      <section className="mt-8 border-t border-neutral-800 pt-7 sm:mt-9 sm:pt-8">
        <header className="flex items-center justify-between">
          <h2 className="font-bold text-neutral-200">Top Billed Cast</h2>
          {/* TODO: add casting and crew tab */}
          <Link
            to="."
            className="flex items-center text-sm text-cyan-500 transition hover:text-cyan-400"
          >
            View Credits
            <ChevronRight aria-hidden className="mt-0.5 h-4 w-4" />
          </Link>
        </header>
        <ol className="flex gap-x-3 overflow-x-auto pt-5">
          {credits.topCast.map((castPerson) => (
            <li key={castPerson.id} className="w-36 shrink-0">
              <div className="block aspect-2/3 overflow-hidden rounded-xl bg-neutral-800">
                <img
                  src={
                    castPerson.profilePath
                      ? `${BASE_IMAGE_URL}${ProfileSizes.md}${castPerson.profilePath}`
                      : johnDoe
                  }
                  alt={castPerson.name}
                  className="h-full w-full object-cover object-center"
                  loading="lazy"
                />
              </div>
              <p title={castPerson.name} className="pt-1.5 text-neutral-200">
                {castPerson.name}
              </p>
              <p className="text-neutral-400">{castPerson.character}</p>
            </li>
          ))}
        </ol>
      </section>
      {/* Reviews */}
      <section className="mt-8 border-t border-neutral-800 pt-7 sm:mt-9 sm:pt-8">
        <header className="flex items-center justify-between">
          <h2 className="flex items-baseline gap-x-2 font-bold text-neutral-200">
            Reviews
            <span className="rounded-lg bg-neutral-800 px-2 text-xs text-neutral-200">
              {reviews.count}
            </span>
          </h2>
          {/* TODO: add review tab */}
          {reviews.featuredReview ? (
            <Link
              to="."
              className="flex items-center gap-x-1 text-sm text-cyan-500 transition hover:text-cyan-400"
            >
              View Reviews
              <ChevronRight aria-hidden className="mt-1 h-3.5 w-3.5" />
            </Link>
          ) : null}
        </header>
        {reviews.featuredReview ? (
          <article className="mx-auto mt-5 rounded-xl border border-neutral-700 bg-neutral-800 p-5">
            <div className="flex items-center gap-x-4">
              <img
                src={
                  reviews.featuredReview.author.avatarPath
                    ? reviews.featuredReview.author.avatarPath.includes(
                        "gravatar"
                      )
                      ? reviews.featuredReview.author.avatarPath.slice(1)
                      : `${BASE_IMAGE_URL}${ProfileSizes.xs}${reviews.featuredReview.author.avatarPath}`
                    : johnDoe
                }
                alt={`${reviews.featuredReview.author.name} Avatar`}
                className="h-12 w-12 rounded-full bg-neutral-400"
                width={48}
                height={48}
                loading="lazy"
              />
              <div>
                <h3 className="text-sm font-bold text-neutral-100">
                  {reviews.featuredReview.author.name}
                </h3>
                <p className="flex items-center gap-x-1 font-normal">
                  <Star
                    aria-hidden
                    className="h-4 w-4 fill-yellow-500 stroke-yellow-500 sm:mb-0"
                  />
                  <span className="text-sm text-neutral-200">
                    {reviews.featuredReview.rating}
                    <span className="text-xs text-neutral-400">/10</span>
                  </span>
                </p>
              </div>
            </div>
            <div
              className="prose prose-sm prose-invert max-w-full pt-4 md:prose-base"
              dangerouslySetInnerHTML={{
                __html: reviews.featuredReview.content,
              }}
            />
          </article>
        ) : (
          <p className="mt-5 text-center text-neutral-400">
            We don&apos;t have any reviews for {movie.title}.
          </p>
        )}
      </section>
      {/* Media */}
      <Media />
      {/* Recommendations */}
      <section className="mt-8 border-t border-neutral-800 pt-7 sm:mt-9 sm:pt-8">
        <h2 className="font-bold text-neutral-200">Recommendations</h2>
        {recommendations.length > 0 ? (
          <ul className="flex gap-x-3 overflow-x-auto pt-5">
            {recommendations.map((recommendation) => (
              <li key={recommendation.id} className="w-72 shrink-0">
                <Link
                  to={`/movies/detail/${recommendation.id}`}
                  className="block aspect-video overflow-hidden rounded-lg bg-neutral-700 transition duration-500 hover:brightness-50"
                >
                  <img
                    src={
                      recommendation.backdropPath
                        ? `${BASE_IMAGE_URL}${BackdropSizes.sm}${recommendation.backdropPath}`
                        : undefined
                    }
                    alt={recommendation.title}
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />
                </Link>
                <div className="flex items-center justify-between pt-1.5 text-neutral-300">
                  <p title={recommendation.title} className="w-2/3 truncate">
                    {recommendation.title}
                  </p>
                  <p className="text flex items-center gap-x-1">
                    <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                    {recommendation.voteAverage}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mx-auto mt-5 max-w-lg text-center text-neutral-400">
            We don&apos;t have enough data to suggest any movies based on{" "}
            {movie.title}. You can help by rating movies you&apos;ve seen.
          </p>
        )}
      </section>
      <div className="mt-8 flex gap-x-3 border-t border-neutral-800 pt-7 sm:mt-9 sm:pt-8">
        <ExternalLink
          href={
            externalIDs.facebookID
              ? `https://facebook.com/${externalIDs.facebookID}`
              : null
          }
          icon={FacebookIcon}
          label="Facebook"
        />
        <ExternalLink
          href={
            externalIDs.instagramID
              ? `https://instagram.com/${externalIDs.instagramID}`
              : null
          }
          icon={InstagramIcon}
          label="Instagram"
        />
        <ExternalLink
          href={
            externalIDs.twitterID
              ? `https://twitter.com/${externalIDs.twitterID}`
              : null
          }
          icon={TwitterIcon}
          label="Twitter"
        />
      </div>
      <dl className="flex flex-col gap-y-3 pt-4 pb-10 sm:pb-14">
        <Description term="Status" detail={movie.status} />
        <Description term="Original Language" detail={movie.originalLanguage} />
        <Description term="Budget" detail={movie.budget} />
        <Description term="Revenue" detail={movie.revenue} />
      </dl>
    </Fragment>
  );
};

const TrailerModal = () => {
  const { youtubeTrailerID } = useLoaderData<typeof loader>();
  const [open, setOpen] = useState(false);

  return youtubeTrailerID ? (
    <Fragment>
      <Modal open={open} onClose={setOpen}>
        <div className="aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeTrailerID}?controls=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      </Modal>
      <button
        type="button"
        className="flex items-center gap-x-1.5 text-sm text-neutral-400 transition hover:text-neutral-200"
        onClick={() => setOpen(true)}
      >
        <Play className="h-4 w-4" aria-hidden />
        See Trailer
      </button>
    </Fragment>
  ) : null;
};

const Description = ({
  term,
  detail,
}: {
  term: string;
  detail: React.ReactNode;
}) =>
  detail ? (
    <div>
      <dt className="text-sm font-bold text-neutral-400">{term}</dt>
      <dd className="text-neutral-200">{detail}</dd>
    </div>
  ) : null;

const Media = () => {
  const { movie, posters, backdrops } = useLoaderData<typeof loader>();

  const [currentImgType, setCurrentImgType] = useState("posters");

  return (
    <section className="mt-8 border-t border-neutral-800 pt-7 sm:mt-9 sm:pt-8">
      <header className="flex items-baseline justify-between">
        <h2 className="font-bold text-neutral-200">Media</h2>
        <nav className="flex items-center">
          {["posters", "backdrops"].map((imgType) => (
            <button
              key={imgType}
              onClick={() => setCurrentImgType(imgType)}
              className={clsx(
                imgType === currentImgType
                  ? "bg-neutral-800 text-neutral-200"
                  : "text-neutral-400 hover:text-neutral-200",
                "shrink-0 rounded-lg px-2.5 py-1.5 text-sm font-bold capitalize transition"
              )}
            >
              {imgType}
            </button>
          ))}
        </nav>
      </header>
      <ul className="flex gap-x-1 overflow-x-auto pt-5">
        {currentImgType === "posters"
          ? posters.featured.map((poster) => (
              <li
                key={poster.file_path}
                className="aspect-2/3 h-56 shrink-0 overflow-hidden bg-neutral-400 first:rounded-l-xl last:rounded-r-xl"
              >
                <img
                  src={
                    poster.file_path
                      ? `${BASE_IMAGE_URL}${PosterSizes.xl}${poster.file_path}`
                      : johnDoe
                  }
                  alt={`${movie.title} poster`}
                  className="h-full w-full object-cover object-center"
                  width={poster.width}
                  height={poster.height}
                  loading="lazy"
                />
              </li>
            ))
          : backdrops.featured.map((backdrop) => (
              <li
                key={backdrop.file_path}
                className="aspect-video h-56 shrink-0 overflow-hidden bg-neutral-400 first:rounded-l-xl last:rounded-r-xl"
              >
                <img
                  src={
                    backdrop.file_path
                      ? `${BASE_IMAGE_URL}${BackdropSizes.md}${backdrop.file_path}`
                      : johnDoe
                  }
                  alt={`${movie.title} backdrop`}
                  className="h-full w-full object-cover object-center"
                  width={backdrop.width}
                  height={backdrop.height}
                  loading="lazy"
                />
              </li>
            ))}
      </ul>
    </section>
  );
};

const ExternalLink = ({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string | null;
  icon: React.FunctionComponent<{ className: string }>;
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      className="inline-block rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
      rel="noreferrer"
    >
      <span className="sr-only">Visit {label} homepage</span>
      <Icon className="h-5 w-5" />
    </a>
  ) : null;

export { loader };
export default Movie;
