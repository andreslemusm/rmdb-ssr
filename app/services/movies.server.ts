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
      backdrop_path: string | null;
      genre_ids: Array<string>;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string | null;
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
    backdrop_path: string | null;
    belongs_to_collection: {
      id: number;
      name: string;
      poster_path: string;
      backdrop_path: string;
    } | null;
    budget: number;
    genres: Array<{ id: number; name: string }>;
    homepage: string;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
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

const getMovieRecommendations = (movieId: string) =>
  apiClient.query<{
    page: number;
    results: Array<{
      adult: boolean;
      backdrop_path: string | null;
      genre_ids: Array<string>;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string | null;
      release_date: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }>;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: `movie/${movieId}/recommendations`,
  });

const getMovieExternalIDs = (movieId: string) =>
  apiClient.query<{
    facebook_id: string | null;
    id: number;
    imdb_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    wikidata_id: string | null;
  }>({
    endpoint: `movie/${movieId}/external_ids`,
  });

const getMovieReviews = (movieId: string) =>
  apiClient.query<{
    id: number;
    page: number;
    results: Array<{
      author: string;
      author_details: {
        name: string;
        username: string;
        avatar_path: string | null;
        rating: number | null;
      };
      content: string;
      created_at: string;
      id: string;
      updated_at: string;
      url: string;
    }>;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: `movie/${movieId}/reviews`,
  });

const getMovieImages = (movieId: string) =>
  apiClient.query<
    {
      id: number;
    } & Record<
      "backdrops" | "logos" | "posters",
      Array<{
        aspect_ratio: number;
        file_path: string;
        height: number;
        iso_639_1: string | null;
        vote_average: number;
        vote_count: number;
        width: number;
      }>
    >
  >({
    endpoint: `movie/${movieId}/images`,
    searchParams: {
      include_image_language: "en,null",
    },
  });

const getMovieVideos = (movieId: string) =>
  apiClient.query<{
    id: number;
    results: Array<{
      id: string;
      iso_639_1: string;
      iso_3166_1: string;
      key: string;
      name: string;
      official: boolean;
      published_at: string;
      site: string;
      size: number;
      type: string;
    }>;
  }>({
    endpoint: `movie/${movieId}/videos`,
    searchParams: {
      include_video_language: "en,null",
    },
  });

const getMovieKeywords = (movieId: string) =>
  apiClient.query<{
    id: number;
    keywords: Array<{
      id: string;
      name: string;
    }>;
  }>({
    endpoint: `movie/${movieId}/keywords`,
  });

export {
  getMovies,
  getMovie,
  getMovieCredits,
  getMovieRecommendations,
  getMovieExternalIDs,
  getMovieReviews,
  getMovieImages,
  getMovieVideos,
  getMovieKeywords,
};
