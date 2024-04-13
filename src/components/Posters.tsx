import { useLazyGetCinemaPostersByIdQuery } from "../features/api/cinemasSlice";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Heading, Image, Spinner } from "@chakra-ui/react";
import "@splidejs/react-splide/css";
import { useEffect } from "react";

type CinemaPoster = {
  movieId: number;
  type: string;
  language: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
  updatedAt: string;
  createdAt: string;
};
export default function Posters({ id }: { id: string }) {
  const [
    trigger,
    {
      data: posters,
      isLoading,
      isError,
      isFetching,
      isSuccess,
      error: cinemaError,
    },
    lastPromiseInfo,
  ] = useLazyGetCinemaPostersByIdQuery();
  useEffect(() => {
    const request = trigger(id);
    return () => request.abort();
  }, []);

  if (isLoading || isFetching || !posters)
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
  if (!posters.docs.length)
    return (
      <Heading color="orange.500" mt={200}>
        Постеры к фильму отсутствуют
      </Heading>
    );
  return (
    <Splide
      aria-label="My Favorite Images"
      options={{
        rewind: true,
        width: 800,
        gap: "1rem",
      }}
    >
      {posters.docs.map((poster: CinemaPoster) => (
        <SplideSlide key={poster.url}>
          <Image
            src={poster.url}
            alt="poster"
            w={800}
            h={400}
            objectFit="contain"
          />
        </SplideSlide>
      ))}
    </Splide>
  );
}
