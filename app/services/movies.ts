import { apiClient } from "~/utils/api-client";

type MovieAttr = {
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

type MoviesPageAttr = {
  page: number;
  results: Array<MovieAttr>;
  total_pages: number;
  total_results: number;
};

const getMovies = async ({
  subCollection,
  page,
}: {
  subCollection: "now_playing" | "popular" | "top_rated" | "upcoming";
  page?: `${number}`;
}): Promise<MoviesPageAttr> => {
  const response = await apiClient.query<MoviesPageAttr>({
    endpoint: `movie/${subCollection}`,
    searchParams: {
      page,
    },
  });

  return response;
};

export type { MovieAttr };
export { getMovies };
