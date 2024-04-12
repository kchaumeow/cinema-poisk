import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

type Filters = {
  genre?: string;
  country?: string;
  year?: string;
  ageRating?: string;
};

export type UseFiltersResult = {
  genre?: string;
  country?: string;
  year?: string;
  ageRating?: string;
  setAllFilters: (filters: Filters) => void;
};

export function useFilters(): UseFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre: string | undefined = searchParams.get("genre") || undefined;
  const country: string | undefined = searchParams.get("country") || undefined;
  const year: string | undefined = searchParams.get("year") || undefined;
  const ageRating: string | undefined =
    searchParams.get("ageRating") || undefined;

  const setAllFilters = useCallback(
    (filters: Filters) => {
      const newSearchParams = new URLSearchParams(searchParams);
      !filters.genre
        ? newSearchParams.delete("genre")
        : newSearchParams.set("genre", filters.genre);
      !filters.country
        ? newSearchParams.delete("country")
        : newSearchParams.set("country", filters.country);
      !filters.year
        ? newSearchParams.delete("year")
        : newSearchParams.set("year", filters.year);
      !filters.ageRating
        ? newSearchParams.delete("ageRating")
        : newSearchParams.set("ageRating", filters.ageRating);

      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );

  return { genre, country, year, ageRating, setAllFilters };
}
