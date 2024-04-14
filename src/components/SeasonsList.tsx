import { Heading, Spinner } from "@chakra-ui/react";
import { useLazyGetSeasonsQuery } from "../features/api/cinemasSlice";
import Seasons from "./Seasons";
import { useEffect } from "react";
import Error from "./Error";

export default function SeasonsList({ movieId }: { movieId: string }) {
  const [
    trigger,
    {
      data: seasons,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: seasonsError,
    },
    lastPromiseInfo,
  ] = useLazyGetSeasonsQuery();
  useEffect(() => {
    const request = trigger({ movieId: movieId });
    return () => request.abort();
  }, []);

  if (isError) return <Error error={seasonsError} />;

  if (isLoading || !seasons || isFetching)
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
  if (!seasons.docs.length)
    return (
      <Heading color="orange.500" mt={200}>
        По вашему запросу ничего не найдено
      </Heading>
    );

  return <Seasons list={seasons.docs} />;
}
