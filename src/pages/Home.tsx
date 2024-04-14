import CinemaList from "../components/CinemaList";
import { Box, Spinner } from "@chakra-ui/react";
import { usePagination } from "../hooks/usePagination";
import { useFilters } from "../hooks/useFilters";
import Pagination from "../components/Pagination";
import Filters from "../components/Filters";
import SearchModal from "../components/SearchModal";
import { useGenresAndCountries } from "../hooks/useGenresAndCountries";
import { useLazyGetAllCinemasQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "../components/Error";

export default function Home() {
  const { page, limit, setPage, setLimit } = usePagination("home");
  const { genre, country, year, ageRating, setAllFilters } = useFilters();

  const [
    trigger,
    {
      data: cinemas,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: cinemaError,
    },
    lastPromiseInfo,
  ] = useLazyGetAllCinemasQuery();
  useEffect(() => {
    const request = trigger({
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
    return () => request.abort();
  }, [genre, country, year, ageRating, page, limit]);

  const { resultGenres, resultCountries } = useGenresAndCountries();
  if (isError) return <Error error={cinemaError} />;
  if (
    resultGenres.isLoading ||
    resultCountries.isLoading ||
    !cinemas ||
    isFetching ||
    isLoading
  )
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
    <Box display="flex" alignItems="center" flexDirection="column" gap={10}>
      <SearchModal />
      {resultGenres.isSuccess && resultCountries.isSuccess && (
        <Filters
          setAllFilters={setAllFilters}
          genres={resultGenres.data}
          countries={resultCountries.data}
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
  );
}
