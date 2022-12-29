import { Fragment } from "react";
import type { LoaderArgs } from "@remix-run/node";
import { johnDoe } from "~/assets/images";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { BASE_IMAGE_URL, PosterSizes, ProfileSizes } from "~/utils/tmdb";
import { getMovie, getMovieCredits } from "~/services/movies.server";

const loader = async ({ params }: LoaderArgs) => {
  if (!params.movieId) {
    throw new Error(`No movie found`);
  }

  const [movie, credits] = await Promise.all([
    getMovie(params.movieId),
    getMovieCredits(params.movieId),
  ]);

  return json({
    movie,
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
      >
    ),
  });
};

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
      {/* TODO: add mvoie section */}
      <div className="flex items-start gap-x-4 pt-10">
        <div className="aspect-2/3 w-16 shrink-0 overflow-hidden rounded-lg">
          <img
            src={`${BASE_IMAGE_URL}${PosterSizes.sm}${movie.poster_path}`}
            alt={`${movie.title} main poster`}
            width={780}
            height={1169}
            className="h-full w-full object-cover"
          />
        </div>
        <h1 className="text-lg font-bold text-white">{movie.title}</h1>
      </div>
      <CreditSection title="Cast" people={cast} />
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
}) => (
  <section className="mt-9 border-t border-neutral-800 pt-7">
    <h2 className="text-lg font-bold text-neutral-200">{title}</h2>
    <ul className="grid gap-y-12 pt-5">
      {people.map((castPerson) => (
        <li
          key={`${castPerson.id}-${castPerson.characterOrJob}`}
          className="flex items-center gap-x-4 lg:gap-x-6"
        >
          <img
            className="h-16 w-16 shrink-0 rounded-full bg-neutral-800 object-cover object-top lg:h-20 lg:w-20"
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
);

export { loader };
export default Credits;
