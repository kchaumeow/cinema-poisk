import {
  useLazyGetCountriesQuery,
  useLazyGetGenresQuery,
} from "../features/api/cinemasSlice";
import { useEffect } from "react";

export function useGenresAndCountries() {
  const [triggerGenres, resultGenres, lastGenresPromiseInfo] =
    useLazyGetGenresQuery();
  const [triggerCountries, resultCountries, lastCountryPromiseInfo] =
    useLazyGetCountriesQuery();
  useEffect(() => {
    const request1 = triggerGenres("");
    const request2 = triggerCountries("");
    return () => {
      request1.abort();
      request2.abort();
    };
  }, []);
  return { resultGenres, resultCountries };
}
