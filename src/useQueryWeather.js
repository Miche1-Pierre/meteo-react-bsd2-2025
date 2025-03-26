import { useQuery } from "@tanstack/react-query";
import fetchWeather from "./api.js";

export default function useQueryWeather(day, options) {
  return useQuery({
    queryKey: ["weather", day, options],
    queryFn: () => fetchWeather(day, options),
  });
}
