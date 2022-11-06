import { apiClient } from "~/utils/api-client";

type TVShowAttr = {
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

type TVShowsPageAttr = {
  page: number;
  results: Array<TVShowAttr>;
  total_pages: number;
  total_results: number;
};

const getTVShows = async ({
  subCollection,
}: {
  subCollection: "airing_today" | "on_the_air" | "popular" | "top_rated";
}): Promise<TVShowsPageAttr> => {
  const response = await apiClient.query<TVShowsPageAttr>({
    endpoint: `tv/${subCollection}`,
  });

  return response;
};

export type { TVShowAttr };
export { getTVShows };
