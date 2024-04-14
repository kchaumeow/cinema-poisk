import { Box, Heading, Spinner } from "@chakra-ui/react";
import Filters from "../components/Filters";
import { useFilters } from "../hooks/useFilters";
import { useEffect, useRef } from "react";
import { useGenresAndCountries } from "../hooks/useGenresAndCountries";
import Error from "../components/Error";
import { useLazyGetRandomCinemaQuery } from "../features/api/cinemasSlice";
import CinemaCard from "../components/CinemaCard";
import { QueryActionCreatorResult } from "@reduxjs/toolkit/query";

export default function Random() {
  const { genre, country, year, ageRating, setAllFilters } = useFilters();
  const currReq = useRef<QueryActionCreatorResult<any> | null>(null);
  const { resultGenres, resultCountries } = useGenresAndCountries();
  const [
    trigger,
    {
      data: cinema,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: cinemaError,
    },
    lastPromiseInfo,
  ] = useLazyGetRandomCinemaQuery();
  const searchRandomCinema = () => {
    const request = trigger({
      genre,
      country,
      year,
      ageRating,
    });
    currReq.current = request;
  };
  useEffect(() => {
    searchRandomCinema();
    return () => currReq.current?.abort();
  }, []);
  if (isError) return <Error error={cinemaError} />;
  if (
    resultGenres.isLoading ||
    resultCountries.isLoading ||
    !cinema ||
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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={20}
    >
      <Heading color="orange.500">Случайный фильм</Heading>
      {resultGenres.isSuccess && resultCountries.isSuccess && (
        <Filters
          setAllFilters={setAllFilters}
          genres={resultGenres.data}
          countries={resultCountries.data}
          genre={genre}
          country={country}
          year={year}
          ageRating={ageRating}
          onClickSearch={searchRandomCinema}
        />
      )}
      <CinemaCard cinema={cinema} />
    </Box>
  );
}
