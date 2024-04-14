import { useParams } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Posters from "../components/Posters";
import ActorsList from "../components/ActorsList";
import CinemaSlider from "../components/CinemaSlider";
import ReviewList from "../components/ReviewsList";
import SeasonsList from "../components/SeasonsList";
import { useLazyGetCinemaByIdQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "../components/Error";

const series = ["cartoon", "tv-series", "anime", "animated-series"];

export default function Cinema() {
  const { id } = useParams();
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
  ] = useLazyGetCinemaByIdQuery();
  useEffect(() => {
    const request = trigger(id!);
    return () => request.abort();
  }, []);

  if (isError) return <Error error={cinemaError} />;

  if (isLoading || isFetching || cinemaError || !cinema)
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
      h="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Flex px={20} py={10}>
        <Stack spacing={5}>
          {cinema.logo ? (
            <Image
              fontSize="3xl"
              color="white"
              src={cinema.logo.url!}
              alt={cinema.name}
              w="50%"
              h="200px"
              objectFit="contain"
            />
          ) : (
            <Text color="white" fontSize="2xl" fontWeight="bold">
              {cinema.name}
            </Text>
          )}
          <Text color="orange.500" fontWeight="700" fontSize="xl">
            KP: {cinema.rating.kp.toFixed(1)}
          </Text>
          <Text color="white" w="80%" fontSize="lg" align="justify">
            {cinema.description}
          </Text>
        </Stack>
        <Image src={cinema.poster.url} alt={cinema.name} h="800px" />
      </Flex>

      <Heading size="2xl" color="orange.500" pb={5}>
        Постеры
      </Heading>
      <Posters id={cinema.id.toString()} />

      <Heading size="2xl" color="orange.500" pb={5} pt={100}>
        Актеры
      </Heading>
      <ActorsList actors={cinema.persons} />

      <CinemaSlider cinemas={cinema.similarMovies} />

      <ReviewList id={id!} />

      {series.includes(cinema.type) && (
        <>
          <Heading size="2xl" color="orange.500" pb={5}>
            Сезоны и серии
          </Heading>
          <SeasonsList movieId={id!} />
        </>
      )}
    </Box>
  );
}
