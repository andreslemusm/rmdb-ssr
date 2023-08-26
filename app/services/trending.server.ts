import { apiClient } from "~/utils/api-client.server";

const getTrending = (params: {
  mediaType: "movie" | "tv";
  timeWindow: "day" | "week";
}) =>
  apiClient.query<{
    page: number;
    results: Array<
      | {
          adult: boolean;
          backdrop_path: string;
          id: number;
          name: string;
          original_language: string;
          original_name: string;
          overview: string;
          poster_path: string;
          media_type: "tv";
          genre_ids: Array<string>;
          popularity: number;
          first_air_date: string;
          vote_average: number;
          vote_count: number;
          origin_country: Array<string>;
        }
      | {
          adult: boolean;
          backdrop_path: string;
          id: number;
          title: string;
          original_language: string;
          original_title: string;
          overview: string;
          poster_path: string;
          media_type: "movie";
          genre_ids: Array<string>;
          popularity: number;
          release_date: string;
          video: boolean;
          vote_average: number;
          vote_count: number;
        }
    >;
    total_pages: number;
    total_results: number;
  }>({
    endpoint: `trending/${params.mediaType}/${params.timeWindow}`,
  });

export { getTrending };
