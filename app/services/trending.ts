import { apiClient } from "~/utils/api-client";

const getTrending = (params: {
  mediaType: "movie" | "tv";
  timeWindow: "day" | "week";
}) =>
  apiClient.query<{
    page: number;
    results: Array<{
      id: number;
      popularity: number;
      video: boolean;
      title: string;
      release_date: string;
      original_title: string;
      adult: boolean;
      backdrop_path: string | null;
      genre_ids: Array<number>;
      overview: string;
      original_language: string;
      poster_path: string | null;
      vote_count: number;
      vote_average: number;
    }>;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: `trending/${params.mediaType}/${params.timeWindow}`,
  });

export { getTrending };
