import { apiClient } from "~/utils/api-client";

const getSearchMovies = ({
  query,
  page,
}: {
  query: string;
  page?: number | null;
}) =>
  apiClient.query<{
    page: number;
    results: Array<{
      adult: boolean;
      backdrop_path: string | null;
      genre_ids: Array<number>;
      id: number;
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      release_date?: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }>;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: "search/movie",
    searchParams: {
      query,
      page,
    },
  });

export { getSearchMovies };
