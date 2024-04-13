import { Heading, Spinner } from "@chakra-ui/react";
import { useGetSeasonsQuery } from "../features/api/cinemasSlice";
import Seasons from "./Seasons";

export default function SeasonsList({ movieId }: { movieId: string }) {
  const {
    data: reviews,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetSeasonsQuery({ movieId: movieId });

  if (isLoading || !reviews)
    return (
      <Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        w={100}
        h={100}
      />
    );
  if (!reviews.docs.length)
    return (
      <Heading color="orange.500" mt={200}>
        По вашему запросу ничего не найдено
      </Heading>
    );

  return <Seasons list={reviews.docs} />;
}
