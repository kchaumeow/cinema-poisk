import { Box, Heading, Spinner, Stack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { usePagination } from "../hooks/usePagination";
import Pagination from "./Pagination";
import { useLazyGetReviewsQuery } from "../features/api/cinemasSlice";
import { useEffect } from "react";
import Error from "./Error";

export default function ReviewList({ id }: { id: string }) {
  const { page, limit, setPage, setLimit } = usePagination("reviews");
  const [
    trigger,
    {
      data: reviews,
      isLoading: reviewsLoading,
      isError: reviewsError,
      isFetching: reviewsFetching,
      isSuccess: reviewsSuccess,
      error,
    },
    lastPromiseInfo,
  ] = useLazyGetReviewsQuery();
  useEffect(() => {
    const request = trigger({ movieId: id, page, limit });
    return () => request.abort();
  }, []);

  if (reviewsError) return <Error error={error} />;

  if (reviewsLoading || reviewsFetching)
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
  if (!reviews || !reviews.docs.length)
    return (
      <Heading color="orange.500" m={200}>
        Нет отзывов
      </Heading>
    );
  return (
    <>
      <Heading size="2xl" color="orange.500" pb={5} pt={100}>
        Отзывы
      </Heading>
      <Stack spacing={4}>
        <Stack spacing={4}>
          {reviews.docs.map((review) => (
            <Box key={review.id}>
              <ReviewCard review={review} />
            </Box>
          ))}
        </Stack>
        <Pagination
          page={+page}
          maxPage={reviews.pages}
          setPage={setPage}
          limit={limit}
          setLimit={setLimit}
        />
      </Stack>
    </>
  );
}
