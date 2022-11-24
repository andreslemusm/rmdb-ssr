const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/";

const enum BackdropSizes {
  xs = "w300",
  sm = "w780",
  md = "w1280",
  lg = "original",
}

const enum LogoSizes {
  xs = "w45",
  sm = "w92",
  md = "w154",
  lg = "w185",
  xl = "w300",
  "2xl" = "w500",
  "3xl" = "original",
}

const enum PosterSizes {
  xs = "w92",
  sm = "w154",
  md = "w185",
  lg = "w342",
  "xl" = "w500",
  "2xl" = "w780",
  "3xl" = "original",
}

const enum ProfileSizes {
  xs = "w45",
  sm = "w185",
  md = "h632",
  lg = "original",
}

export { BASE_IMAGE_URL, BackdropSizes, LogoSizes, PosterSizes, ProfileSizes };
