import { redirect } from "@remix-run/node";

export const loader = () => redirect("/movies/now-playing");
