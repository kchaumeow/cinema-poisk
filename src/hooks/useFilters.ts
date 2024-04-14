import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";

const filterOptions = ["genre", "country", "year", "ageRating"] as const;
type FilterOption = (typeof filterOptions)[number];
type Filters = Record<FilterOption, string>;

export type UseFiltersResult = {
  filters: Filters;
  setAllFilters: (newFilters: Filters) => void;
  resetFilters: () => void;
};

export function useFilters(): UseFiltersResult {
  const [searchParams, setSearchParams] = useSearchParams();
  const genre = searchParams.get("genre") || "";
  const country = searchParams.get("country") || "";
  const year = searchParams.get("year") || "";
  const ageRating = searchParams.get("ageRating") || "";

  const setAllFilters = useCallback(
    (newFilters: Filters) => {
      const newSearchParams = new URLSearchParams(searchParams);

      for (const key of filterOptions) {
        const value = newFilters[key];
        if (value) newSearchParams.set(key, value);
        else newSearchParams.delete(key);
      }

      setSearchParams(newSearchParams);
    },
    [setSearchParams],
  );

  const resetFilters = useCallback(() => {
    setAllFilters({
      genre: "",
      country: "",
      year: "",
      ageRating: "",
    });
  }, []);

  return {
    filters: { genre, country, year, ageRating },
    setAllFilters,
    resetFilters,
  };
}
