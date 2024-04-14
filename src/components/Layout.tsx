import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import AuthModal from "./AuthModal";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setUser } from "../features/userSlice";

export default function Layout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <Box h="100%" bg="black">
      <Flex p={6} justifyContent="space-between">
        {id && (
          <Button
            colorScheme="orange"
            color="black"
            onClick={() => navigate(-1)}
            variant="solid"
            size="lg"
          >
            <ArrowBackIcon />
          </Button>
        )}
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
        {!user ? (
          <AuthModal />
        ) : (
          <Flex gap={4} alignItems="center">
            <Link to="/cinemas/random">
              <Button
                variant="link"
                color="white"
                size="lg"
                textDecoration="underline"
              >
                Рандомный тайтл
              </Button>
            </Link>
            <Button
              onClick={() => {
                dispatch(setUser(null));
              }}
              colorScheme="orange"
              size="lg"
            >
              Выход
            </Button>
          </Flex>
        )}
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
