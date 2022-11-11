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

export { getMovies };
