import { apiClient } from "~/utils/api-client";

type TrendingItemAttr = {
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
};

type TrendingPageAttr = {
  page: number;
  results: Array<TrendingItemAttr>;
  total_pages: number;
  total_results: number;
};

const getTrending = async (params: {
  mediaType: "movie" | "tv";
  timeWindow: "day" | "week";
}): Promise<TrendingPageAttr> => {
  const response = await apiClient.query<TrendingPageAttr>({
    endpoint: `trending/${params.mediaType}/${params.timeWindow}`,
  });

  return response;
};

export type { TrendingItemAttr };
export { getTrending };
