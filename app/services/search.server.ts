import { apiClient } from "~/utils/api-client.server";

const getSearchMovies = ({
  query,
  language,
  include_adult,
  region,
  year,
  page,
}: {
  query: string;
  language?: string | null;
  year?: string | null;
  include_adult?: boolean | null;
  region?: string | null;
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
      poster_path: string | null;
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
      language,
      include_adult,
      region,
      page,
      year,
    },
  });

export { getSearchMovies };
