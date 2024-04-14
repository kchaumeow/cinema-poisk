import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

export default function () {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    username?: string;
    password?: string;
  } | null>(null);
  const dispatch = useDispatch();
  return (
    <>
      <Button onClick={onOpen} colorScheme="orange" color="black" size="lg">
        Войти
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#323230">
          <ModalHeader>
            <Heading color="orange.500">Вход в систему</Heading>
          </ModalHeader>
          <ModalCloseButton color="orange.500" />
          <ModalBody>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                dispatch(setUser(userData));
                onClose();
              }}
            >
              <Flex alignItems="center" flexDirection="column">
                <FormControl isRequired>
                  <FormLabel color="orange.500">Имя пользователя</FormLabel>
                  <Input
                    color="orange.500"
                    type="text"
                    placeholder="Напишите ваше имя пользователя..."
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel color="orange.500">Ваш пароль</FormLabel>
                  <Input
                    color="orange.500"
                    type="password"
                    placeholder="Ваш пароль в системе..."
                    onChange={(e) =>
                      setUserData((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                  />
                </FormControl>
                <Button type="submit" colorScheme="orange" m={4} color="black">
                  Авторизоваться
                </Button>
              </Flex>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Закрыть
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
