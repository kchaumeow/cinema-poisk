import { Box, Heading, Spinner, Stack } from "@chakra-ui/react";
import ReviewCard from "./ReviewCard";
import { usePagination } from "../hooks/usePagination";
import { useGetReviewsQuery } from "../features/api/cinemasSlice";
import Pagination from "./Pagination";

export default function ReviewList({ id }: { id: string }) {
  const { page, limit, setPage, setLimit } = usePagination("reviews");
  const {
    data: reviews,
    isLoading: reviewsLoading,
    isError: reviewsError,
    isFetching: reviewsFetching,
    isSuccess: reviewsSuccess,
    error,
  } = useGetReviewsQuery({ movieId: id, page, limit });
  if (reviewsLoading)
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
      <Heading color="orange.500" mt={200}>
        Нет отзывов
      </Heading>
    );
  return (
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
  );
}
