import { Fragment } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "~/assets";
import { Link, useLoaderData } from "@remix-run/react";
import { Link as LinkIcon, Play, Star } from "lucide-react";
import {
  formatLangCodeAsLangName,
  formatNumberAsCurrency,
} from "~/utils/format";
import {
  getMovie,
  getMovieCredits,
  getMovieExternalIDs,
  getMovieRecommendations,
} from "~/services/movies.server";

const loader = async ({ params }: LoaderArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [movie, credits, recommendations, externalIDs] = await Promise.all([
    getMovie(params.movieId),
    getMovieCredits(params.movieId),
    getMovieRecommendations(params.movieId),
    getMovieExternalIDs(params.movieId),
  ]);

  const { directors, writters, characters, editors } = credits.crew.reduce<{
    directors: Array<string>;
    writters: Array<string>;
    characters: Array<string>;
    editors: Array<string>;
  }>(
    (accu, crewPerson) => {
      if (crewPerson.job === "Director") {
        return { ...accu, directors: [...accu.directors, crewPerson.name] };
      }
      if (crewPerson.job === "Writer") {
        return { ...accu, writters: [...accu.writters, crewPerson.name] };
      }
      if (crewPerson.job === "Characters") {
        return { ...accu, characters: [...accu.writters, crewPerson.name] };
      }
      if (crewPerson.job === "Editor") {
        return { ...accu, editors: [...accu.writters, crewPerson.name] };
      }

      return accu;
    },
    {
      directors: [],
      writters: [],
      characters: [],
      editors: [],
    }
  );

  // TODO: trim response
  return json({
    movie,
    directors,
    writters,
    characters,
    editors,
    recommendations: recommendations.results,
    externalIDs,
  });
};

const Movie = (): React.ReactElement => {
  const {
    movie,
    directors,
    writters,
    characters,
    editors,
    recommendations,
    externalIDs,
  } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <div className="mt-5 aspect-video overflow-hidden rounded-xl">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path ?? ""}`}
          alt=""
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
          <LinkIcon className="h-3.5 w-3.5" />
        </a>
      </h1>
      <div className="grid grid-cols-2 place-items-center pt-3">
        <p className="flex items-center justify-center gap-x-1 font-normal text-neutral-400">
          <Star className="mb-0.5 h-4 w-4 fill-yellow-500 stroke-yellow-500 sm:mb-0" />
          {movie.vote_average.toPrecision(2)}
        </p>
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
          {movie.release_date} • {Math.floor(movie.runtime / 60)}h{" "}
          {movie.runtime - Math.floor(movie.runtime / 60) * 60}m
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
      <dl className="grid grid-cols-2 justify-center gap-4 px-2 pt-5">
        <Decription
          term="Directors"
          detail={directors.length > 0 ? directors.join(", ") : null}
        />
        <Decription
          term="Writters"
          detail={writters.length > 0 ? writters.join(", ") : null}
        />
        <Decription
          term="Characters"
          detail={characters.length > 0 ? characters.join(", ") : null}
        />
        <Decription
          term="Editors"
          detail={editors.length > 0 ? editors.join(", ") : null}
        />
      </dl>
      {recommendations.length > 0 ? (
        <Fragment>
          <h2 className="pt-10 font-bold text-neutral-200">Recommendations</h2>
          <ul className="flex snap-x snap-mandatory gap-x-6 overflow-x-auto pt-4">
            {recommendations.map((recommendation) => (
              <li key={recommendation.id} className="w-72 shrink-0 snap-start">
                <Link
                  to={`/movies/detail/${recommendation.id}`}
                  className="block aspect-video overflow-hidden rounded-lg bg-neutral-700 transition duration-500 hover:brightness-50"
                >
                  <img
                    src={
                      recommendation.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${recommendation.backdrop_path}`
                        : undefined
                    }
                    alt={recommendation.title}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
                <div className="flex items-center justify-between pt-1 text-neutral-300">
                  <p title={recommendation.title} className="w-2/3 truncate">
                    {recommendation.title}
                  </p>
                  <p className="text flex items-center gap-x-1">
                    <Star className="h-4 w-4 fill-yellow-500 stroke-yellow-500" />
                    {recommendation.vote_average.toPrecision(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Fragment>
      ) : null}
      <div className="mt-10 flex gap-x-3 border-t border-neutral-800 pt-5">
        <ExternalLink
          href={
            externalIDs.facebook_id
              ? `https://facebook.com/${externalIDs.facebook_id}`
              : null
          }
          icon={FacebookIcon}
          label="Facebook"
        />
        <ExternalLink
          href={
            externalIDs.instagram_id
              ? `https://instagram.com/${externalIDs.instagram_id}`
              : null
          }
          icon={InstagramIcon}
          label="Instagram"
        />
        <ExternalLink
          href={
            externalIDs.twitter_id
              ? `https://twitter.com/${externalIDs.twitter_id}`
              : null
          }
          icon={TwitterIcon}
          label="Twitter"
        />
      </div>
      <dl className="flex flex-col gap-y-3 pt-4">
        <Decription term="Status" detail={movie.status} />
        <Decription
          term="Original Language"
          detail={formatLangCodeAsLangName(movie.original_language)}
        />
        <Decription
          term="Budget"
          detail={formatNumberAsCurrency(movie.budget)}
        />
        <Decription
          term="Revenue"
          detail={formatNumberAsCurrency(movie.revenue)}
        />
      </dl>

      <div className="pt-20"></div>
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
