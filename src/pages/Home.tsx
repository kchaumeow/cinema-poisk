import CinemaList from "../components/CinemaList";
import {
  useGetAllCinemasQuery,
  useGetCountriesQuery,
  useGetGenresQuery,
} from "../features/api/cinemasSlice";
import { Box, Spinner } from "@chakra-ui/react";
import { usePagination } from "../hooks/usePagination";
import { useFilters } from "../hooks/useFilters";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import SearchModal from "../components/SearchModal";

export default function Home() {
  const { page, limit, setPage, setLimit } = usePagination("home");
  const { genre, country, year, ageRating, setAllFilters } = useFilters();
  const {
    data: cinemas,
    isLoading,
    isError,
    isFetching,
    isSuccess,
    error,
  } = useGetAllCinemasQuery({
    page,
    selectFields: ["id", "name", "rating", "poster"],
    limit,
    filters: {
      genre,
      country,
      year,
      ageRating,
    },
  });
  const {
    data: genres,
    isSuccess: isSuccessGenres,
    isLoading: isLoadingGenres,
  } = useGetGenresQuery("");
  const {
    data: countries,
    isSuccess: isSuccessCountries,
    isLoading: isLoadingCountry,
  } = useGetCountriesQuery("");
  if (isLoading || isFetching || isLoadingGenres || isLoadingCountry)
    return (
      <Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        marginTop="200px"
        w={100}
        h={100}
      />
    );
  return (
    <>
      {isError && JSON.stringify(error)}
      {isSuccess && (
        <Box display="flex" alignItems="center" flexDirection="column" gap={10}>
          <SearchModal />
          {isSuccessGenres && isSuccessCountries && (
            <Filters
              setAllFilters={setAllFilters}
              genres={genres}
              countries={countries}
              genre={genre}
              country={country}
              year={year}
              ageRating={ageRating}
            />
          )}
          <CinemaList cinemas={cinemas.docs} />
          {cinemas.docs.length && (
            <Pagination
              page={+page}
              maxPage={cinemas.pages}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
            />
          )}
        </Box>
      )}
    </>
  );
}
