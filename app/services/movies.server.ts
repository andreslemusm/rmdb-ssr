import { apiClient } from "~/utils/api-client";

const getMovies = ({
  subCollection,
  page,
}: {
  subCollection: "now_playing" | "popular" | "top_rated" | "upcoming";
  page?: number | null;
}) =>
  apiClient.query<{
    page: number;
    results: Array<{
      adult: boolean;
      backdrop_path: string;
      genre_ids: Array<string>;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }>;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: `movie/${subCollection}`,
    searchParams: {
      page,
    },
  });

const getMovie = (movieId: string) =>
  apiClient.query<{
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    };
    budget: number;
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: Array<{
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }>;
    production_countries: Array<{
      iso_3166_1: string;
      name: string;
    }>;
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: Array<{
      english_name: string;
      iso_639_1: string;
      name: string;
    }>;
    status: string;
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }>({
    endpoint: `movie/${movieId}`,
  });

const getMovieCredits = (movieId: string) =>
  apiClient.query<{
    cast: Array<{
      adult: boolean;
      cast_id: number;
      character: string;
      credit_id: string;
      gender: number | null;
      id: number;
      known_for_department: string;
      name: string;
      order: number;
      original_name: string;
      popularity: number;
      profile_path: string | null;
    }>;
    crew: Array<{
      adult: boolean;
      gender: number | null;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string | null;
      credit_id: string;
      department: string;
      job: string;
    }>;
  }>({
    endpoint: `movie/${movieId}/credits`,
  });

export { getMovies, getMovie, getMovieCredits };
