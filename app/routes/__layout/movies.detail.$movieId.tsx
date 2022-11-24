import { Fragment } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { johnDoe } from "~/assets/images";
import { json } from "@remix-run/node";
import { marked } from "marked";
import { BASE_IMAGE_URL, BackdropSizes, ProfileSizes } from "~/utils/tmdb";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "~/assets/icons";
import { Link, useLoaderData } from "@remix-run/react";
import { Link as LinkIcon, Play, Star } from "lucide-react";
import {
  formatLangCodeAsLangName,
  formatNumberAsCompactNumber,
  formatNumberAsCurrency,
} from "~/utils/formatters.server";
import {
  getMovie,
  getMovieCredits,
  getMovieExternalIDs,
  getMovieRecommendations,
  getMovieReviews,
} from "~/services/movies.server";

const loader = async ({ params }: LoaderArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [movie, credits, recommendations, externalIDs, reviews] =
    await Promise.all([
      getMovie(params.movieId),
      getMovieCredits(params.movieId),
      getMovieRecommendations(params.movieId),
      getMovieExternalIDs(params.movieId),
      getMovieReviews(params.movieId),
    ]);

  return json({
    movie: {
      backdropPath: movie.backdrop_path,
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
      featuredReview: {
        author: {
          avatarPath: reviews.results[0].author_details.avatar_path,
          name: reviews.results[0].author_details.name,
        },
        rating: reviews.results[0].author_details.rating,
        content: marked.parse(reviews.results[0].content),
      },
      count: reviews.total_results,
    },
    recommendations: recommendations.results.map((recommendation) => ({
      id: recommendation.id,
      backdropPath: recommendation.backdrop_path,
      title: recommendation.title,
      voteAverage: recommendation.vote_average.toPrecision(2),
    })),
    externalIDs: {
      facebookID: externalIDs.facebook_id,
      instagramID: externalIDs.instagram_id,
      twitterID: externalIDs.twitter_id,
    },
  });
};

const Movie = (): React.ReactElement => {
  const { movie, credits, recommendations, externalIDs, reviews } =
    useLoaderData<typeof loader>();

  return (
    <Fragment>
      {/* TODO: add movie navigation */}
      <div className="mt-5 aspect-video overflow-hidden rounded-xl">
        <img
          src={`${BASE_IMAGE_URL}${BackdropSizes.xs}${movie.backdropPath}`}
          alt={movie.title}
          className="h-full w-full"
        />
      </div>
      <h1 className="flex items-center justify-center gap-x-2 pt-4 text-center text-xl font-bold text-neutral-100 ">
        {movie.title}
        <a
          href={movie.homepage}
          target="_blank"
          className="mt-1 inline-block rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
          rel="noreferrer"
        >
          <span className="sr-only">Go to website</span>
          <LinkIcon aria-hidden className="h-3.5 w-3.5" />
        </a>
      </h1>
      <div className="grid grid-cols-2 place-items-center pt-3">
        <div className="flex items-center gap-x-1.5 font-normal">
          <Star
            aria-hidden
            className="h-4 w-4 fill-yellow-500 stroke-yellow-500"
          />{" "}
          <span className="font-bold text-neutral-200">
            {movie.voteAverage}
            <span className="text-sm font-normal text-neutral-400">
              /10 • {movie.voteCount}
            </span>
          </span>
        </div>
        <button
          type="button"
          className="flex items-center gap-x-1.5 rounded-xl px-3 py-1.5 text-sm text-neutral-400 transition hover:text-neutral-200"
        >
          <Play className="h-4 w-4" aria-hidden />
          See Trailer
        </button>
      </div>
      <div className="mt-3 grid grid-rows-2 place-items-center gap-y-1 border-b border-t border-neutral-800 pt-2 pb-3">
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
      <dl className="grid grid-cols-2 justify-center gap-x-4 gap-y-2 pt-8">
        <Decription
          term="Directors"
          detail={
            credits.directors.length > 0 ? credits.directors.join(", ") : null
          }
        />
        <Decription
          term="Writters"
          detail={
            credits.writters.length > 0 ? credits.writters.join(", ") : null
          }
        />
        <Decription
          term="Characters"
          detail={
            credits.characters.length > 0 ? credits.characters.join(", ") : null
          }
        />
        <Decription
          term="Editors"
          detail={
            credits.editors.length > 0 ? credits.editors.join(", ") : null
          }
        />
      </dl>
      <div className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-7">
        <h2 className="font-bold text-neutral-200">Top Billed Cast</h2>
        {/* TODO: add casting and crew tab */}
        {/* <Link
          to="."
          className="flex items-center gap-x-1 text-sm text-cyan-500 transition hover:text-cyan-400"
        >
          View Credits
          <ArrowRight className="h-3.5 w-3.5 mt-0.5" />
        </Link> */}
      </div>
      <ul className="flex snap-x snap-mandatory gap-x-6 overflow-x-auto pt-5">
        {credits.topCast.map((castPerson) => (
          <li key={castPerson.id} className="w-36 shrink-0 snap-start">
            <div className="block aspect-2/3 overflow-hidden rounded-lg bg-neutral-700">
              <img
                src={
                  castPerson.profilePath
                    ? `${BASE_IMAGE_URL}${ProfileSizes.xs}${castPerson.profilePath}`
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
      </ul>
      <div className="mt-8 flex items-center justify-between border-t border-neutral-800 pt-7">
        <h2 className="flex items-baseline gap-x-2 font-bold text-neutral-200">
          Reviews
          <span className="rounded-lg bg-neutral-800 px-2 text-xs text-neutral-200">
            {reviews.count}
          </span>
        </h2>
        {/* TODO: add review tab */}
        {/* <Link
          to="."
          className="flex items-center gap-x-1 text-sm text-cyan-500 transition hover:text-cyan-400"
        >
          View all
          <ArrowRight className="mt-0.5 h-3.5 w-3.5" />
        </Link> */}
      </div>
      <article className="mt-5 rounded-xl border border-neutral-700 bg-neutral-800 p-5">
        <div className="flex items-center gap-x-4">
          <img
            src={
              reviews.featuredReview.author.avatarPath
                ? reviews.featuredReview.author.avatarPath.includes("gravatar")
                  ? reviews.featuredReview.author.avatarPath.slice(1)
                  : `${BASE_IMAGE_URL}${ProfileSizes.xs}${reviews.featuredReview.author.avatarPath}`
                : johnDoe
            }
            alt={reviews.featuredReview.author.name}
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
          className="prose prose-sm prose-invert pt-4"
          dangerouslySetInnerHTML={{
            __html: reviews.featuredReview.content,
          }}
        />
      </article>
      <h2 className="mt-8 border-t border-neutral-800 pt-7 font-bold text-neutral-200">
        Recommendations
      </h2>
      <ul className="flex snap-x snap-mandatory gap-x-6 overflow-x-auto pt-4">
        {recommendations.map((recommendation) => (
          <li key={recommendation.id} className="w-72 shrink-0 snap-start">
            <Link
              to={`/movies/detail/${recommendation.id}`}
              className="block aspect-video overflow-hidden rounded-lg bg-neutral-700 transition duration-500 hover:brightness-50"
            >
              <img
                src={
                  recommendation.backdropPath
                    ? `${BASE_IMAGE_URL}${BackdropSizes.xs}${recommendation.backdropPath}`
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
      <div className="mt-8 flex gap-x-3 border-t border-neutral-800 pt-7">
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
      <dl className="flex flex-col gap-y-3 pt-4 pb-10">
        <Decription term="Status" detail={movie.status} />
        <Decription term="Original Language" detail={movie.originalLanguage} />
        <Decription term="Budget" detail={movie.budget} />
        <Decription term="Revenue" detail={movie.revenue} />
      </dl>
    </Fragment>
  );
};

const ExternalLink = ({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string | null;
  icon: React.VoidFunctionComponent<{ className: string }>;
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      className="inline-block rounded-lg border border-neutral-700 bg-neutral-800 p-1 text-neutral-300 transition hover:border-neutral-600 hover:bg-neutral-700 hover:text-neutral-100"
      rel="noreferrer"
    >
      <span className="sr-only">Go to {label} homepage</span>
      <Icon className="h-5 w-5" />
    </a>
  ) : null;

const Decription = ({
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

export { loader };
export default Movie;
