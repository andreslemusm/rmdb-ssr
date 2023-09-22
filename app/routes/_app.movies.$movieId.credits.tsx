import { Fragment } from "react";
import { cacheHeader } from "pretty-cache-header";
import { generateMetaTags } from "~/utils/meta-tags";
import { johnDoe } from "~/assets/images";
import { json } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import { BASE_IMAGE_URL, PosterSizes, ProfileSizes } from "~/utils/tmdb";
import type {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@vercel/remix";
import { getMovie, getMovieCredits } from "~/services/movies.server";

const loader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [movie, credits] = await Promise.all([
    getMovie(params.movieId),
    getMovieCredits(params.movieId),
  ]);

  return json(
    {
      movie: {
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        overview: movie.overview,
      },
      cast: credits.cast.map((castPerson) => ({
        id: castPerson.id,
        profilePath: castPerson.profile_path,
        name: castPerson.name,
        characterOrJob: castPerson.character,
      })),
      ...credits.crew.reduce(
        (mainCrew, crewPerson) => {
          if (crewPerson.department === "Art") {
            return {
              ...mainCrew,
              art: [
                ...mainCrew.art,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Camera") {
            return {
              ...mainCrew,
              camera: [
                ...mainCrew.camera,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Costume & Make-Up") {
            return {
              ...mainCrew,
              costumeAndMakeUp: [
                ...mainCrew.costumeAndMakeUp,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Crew") {
            return {
              ...mainCrew,
              crew: [
                ...mainCrew.crew,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Directing") {
            return {
              ...mainCrew,
              directing: [
                ...mainCrew.directing,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Editing") {
            return {
              ...mainCrew,
              editing: [
                ...mainCrew.editing,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Lighting") {
            return {
              ...mainCrew,
              lighting: [
                ...mainCrew.lighting,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Production") {
            return {
              ...mainCrew,
              production: [
                ...mainCrew.production,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Sound") {
            return {
              ...mainCrew,
              sound: [
                ...mainCrew.sound,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Visual Effects") {
            return {
              ...mainCrew,
              visualEffects: [
                ...mainCrew.visualEffects,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }
          if (crewPerson.department === "Writing") {
            return {
              ...mainCrew,
              writing: [
                ...mainCrew.writing,
                {
                  id: crewPerson.id,
                  name: crewPerson.name,
                  characterOrJob: crewPerson.job,
                  profilePath: crewPerson.profile_path,
                },
              ],
            };
          }

          return mainCrew;
        },
        {
          art: [],
          camera: [],
          costumeAndMakeUp: [],
          crew: [],
          directing: [],
          editing: [],
          lighting: [],
          production: [],
          sound: [],
          visualEffects: [],
          writing: [],
        } as Record<
          | "art"
          | "camera"
          | "costumeAndMakeUp"
          | "crew"
          | "directing"
          | "editing"
          | "lighting"
          | "production"
          | "sound"
          | "visualEffects"
          | "writing",
          Array<{
            id: number;
            profilePath: string | null;
            name: string;
            characterOrJob: string;
          }>
        >,
      ),
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
      ? `${data.movie.title} - Credits | React Movie Database (RMDB)`
      : "React Movie Database (RMDB)",
    description: data?.movie.overview ?? "",
  });

const Credits = () => {
  const {
    movie,
    cast,
    art,
    camera,
    costumeAndMakeUp,
    crew,
    directing,
    editing,
    lighting,
    production,
    sound,
    visualEffects,
    writing,
  } = useLoaderData<typeof loader>();

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
      <div className="mt-8 grid gap-x-10 gap-y-12 border-t border-neutral-800 pb-16 pt-7 sm:grid-cols-2 lg:mt-9 lg:pt-8">
        <CreditSection title="Cast" people={cast} />
        <div className="space-y-12">
          <CreditSection title="Art" people={art} />
          <CreditSection title="Camera" people={camera} />
          <CreditSection title="Costume & Make-Up" people={costumeAndMakeUp} />
          <CreditSection title="Crew" people={crew} />
          <CreditSection title="Directing" people={directing} />
          <CreditSection title="Editing" people={editing} />
          <CreditSection title="Lighting" people={lighting} />
          <CreditSection title="Production" people={production} />
          <CreditSection title="Sound" people={sound} />
          <CreditSection title="Visual Effects" people={visualEffects} />
          <CreditSection title="Writing" people={writing} />
        </div>
      </div>
    </Fragment>
  );
};

const CreditSection = ({
  title,
  people,
}: {
  title: string;
  people: Array<{
    id: number;
    profilePath: string | null;
    name: string;
    characterOrJob: string;
  }>;
}) =>
  people.length > 0 ? (
    <section>
      <h2 className="flex items-baseline gap-x-2 text-lg font-bold text-neutral-200">
        {title}
        <span className="rounded-lg bg-neutral-800 px-2 text-xs text-neutral-200">
          {people.length}
        </span>
      </h2>
      <ul className="flex flex-col gap-y-10 pt-8">
        {people.map((castPerson) => (
          <li
            key={`${castPerson.id}-${castPerson.characterOrJob}`}
            className="flex items-center gap-x-5"
          >
            <img
              className="h-16 w-16 shrink-0 rounded-full bg-neutral-800 object-cover object-top"
              src={
                castPerson.profilePath
                  ? `${BASE_IMAGE_URL}${ProfileSizes.md}${castPerson.profilePath}`
                  : johnDoe
              }
              alt={castPerson.name}
              width={421}
              height={632}
            />
            <div>
              <h3 className="text-neutral-200">{castPerson.name}</h3>
              <p className="text-neutral-400">{castPerson.characterOrJob}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  ) : null;

export { meta, loader, headers };
export default Credits;
