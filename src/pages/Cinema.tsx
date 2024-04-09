import { useParams } from "react-router-dom";
import { useGetCinemaByIdQuery } from "../features/api/cinemasSlice";
import { Box, Flex, Image, Spinner, Stack, Text } from "@chakra-ui/react";

export default function Cinema() {
  const { id } = useParams();
  console.log(id);
  const {
    data: cinema,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCinemaByIdQuery(id);
  if (isLoading)
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.300"
        marginTop="200px"
        w={100}
        h={100}
      />
    );
  return (
    <Box h="100%">
      <Flex px={10}>
        <Stack spacing={2}>
          {cinema.logo ? (
            <Image
              fontSize="3xl"
              color="white"
              src={cinema.logo.url}
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

          <Text color="orange.600" fontWeight="700" fontSize="xl">
            Рейтинг КП: {cinema.rating.kp}
          </Text>
          <Text color="white" w="80%" fontSize="lg">
            {cinema.description}
          </Text>
        </Stack>
        <Image src={cinema.poster.url} alt={cinema.name} h="800px" />
      </Flex>
    </Box>
  );
}
