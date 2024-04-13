import {
  Box,
  Button,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useGetCinemaByNameQuery } from "../features/api/cinemasSlice";
import { usePagination } from "../hooks/usePagination";
import CinemaList from "./CinemaList";
import Pagination from "./Pagination";
import { useDebounce } from "use-debounce";

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const finalRef = useRef(null);
  const { page, limit, setPage, setLimit } = usePagination("search");
  const {
    data: cinemas,
    isLoading,
    isError,
    isFetching,
    isSuccess,
  } = useGetCinemaByNameQuery({ page, limit, query: debouncedQuery });

  return (
    <>
      <Input
        m={4}
        onClick={onOpen}
        placeholder="Искать по названию"
        w="500px"
      />
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="8xl"
      >
        <ModalOverlay />
        <ModalContent bgColor="#323230">
          <ModalHeader color="orange.500">Поиск фильма по названию</ModalHeader>
          <ModalCloseButton color="orange.500" />
          <ModalBody>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              m={100}
            >
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                colorScheme="orange"
                color="orange.500"
                focusBorderColor="orange.500"
                autoFocus={true}
                mt={4}
                placeholder="Искать по названию"
              />
            </Box>
            {!query ? (
              <Heading color="orange.500" mt={200}>
                Начните вводить название фильма
              </Heading>
            ) : (
              <>
                {isLoading || isFetching || !cinemas ? (
                  <Spinner
                    thickness="10px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="orange.500"
                    marginTop="200px"
                    w={100}
                    h={100}
                  />
                ) : (
                  <>
                    <CinemaList cinemas={cinemas.docs} />
                    <Pagination
                      page={page}
                      limit={limit}
                      setPage={setPage}
                      setLimit={setLimit}
                      maxPage={cinemas.pages}
                    />
                  </>
                )}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose} colorScheme="orange">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
