import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface APIError {
  status: number | string;
  error: string;
}

interface ErrorProps {
  error: unknown;
}

export default function Error({ error }: ErrorProps) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Box display="inline-block">
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bg={"red.500"}
          rounded={"50px"}
          w={"55px"}
          h={"55px"}
          textAlign="center"
        >
          <CloseIcon boxSize={"20px"} color={"white"} />
        </Flex>
      </Box>
      <Heading as="h2" size="xl" mt={6} mb={2} color={"gray.500"}>
        Error {isAPIError(error) && error.status}
      </Heading>
      <Text color={"red.500"} fontSize="2xl" fontWeight="bold">
        {isAPIError(error) && error.error}
      </Text>
    </Box>
  );
}

function isAPIError(error: unknown): error is APIError {
  return (
    typeof error === "object" &&
    error !== null &&
    error.hasOwnProperty("status") &&
    error.hasOwnProperty("error")
  );
}
