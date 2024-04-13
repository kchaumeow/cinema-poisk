import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function Layout() {
  const navigate = useNavigate();
  return (
    <Box h="100%" bg="black">
      <Flex p={6} justifyContent="space-between">
        <Button
          colorScheme="orange"
          color="black"
          onClick={() => navigate(-1)}
          variant="solid"
          size="lg"
        >
          <ArrowBackIcon />
        </Button>
        <Link to={"/"}>
          <Text
            fontWeight={600}
            fontSize="4xl"
            color="orange.500"
            textAlign="center"
          >
            Кинопоиск
          </Text>
        </Link>
      </Flex>
      <Box
        h="100%"
        p={4}
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Outlet />
      </Box>
    </Box>
  );
}
