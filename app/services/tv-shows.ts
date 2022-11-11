import { apiClient } from "~/utils/api-client";

const getTVShows = async ({
  subCollection,
  page,
}: {
  subCollection: string;
  page?: number | null;
}) =>
  apiClient.query<{
    page: number;
    results: Array<{
      backdrop_path: string;
      first_air_date: string;
      genre_ids: Array<string>;
      id: number;
      name: string;
      origin_country: Array<string>;
      original_language: string;
      original_name: string;
      overview: string;
      popularity: number;
      poster_path: string;
      vote_average: number;
      vote_count: number;
    }>;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: `tv/${subCollection}`,
    searchParams: { page },
  });

export { getTVShows };
