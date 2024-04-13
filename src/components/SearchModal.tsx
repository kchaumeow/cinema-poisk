import {
  Box,
  Button,
  Flex,
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
import { useEffect, useRef, useState } from "react";
import { usePagination } from "../hooks/usePagination";
import CinemaList from "./CinemaList";
import Pagination from "./Pagination";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../features/store";
import { add, selectHistory } from "../features/searchSlice";
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from "@choc-ui/chakra-autocomplete";
import { useLazyGetCinemaByNameQuery } from "../features/api/cinemasSlice";

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const dispatch: AppDispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 1000);

  const [trigger, { isLoading, isFetching, data: cinemas }, lastPromiseInfo] =
    useLazyGetCinemaByNameQuery();

  const { page, limit, setPage, setLimit } = usePagination("search");

  useEffect(() => {
    dispatch(add(debouncedQuery));
    const request = trigger({ page, limit, query: debouncedQuery });
    return () => request.abort();
  }, [debouncedQuery]);
  const searchHistory = useSelector(selectHistory);
  return (
    <>
      <Input onClick={onOpen} placeholder="Искать по названию" w="500px" />

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="7xl"
      >
        <ModalOverlay />
        <ModalContent bgColor="#323230" maxW="2000px">
          <ModalHeader>
            <Heading color="orange.500">Поиск фильма по названию</Heading>
          </ModalHeader>
          <ModalCloseButton color="orange.500" />
          <ModalBody>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <AutoComplete rollNavigation>
                <AutoCompleteInput
                  variant="filled"
                  colorScheme="orange"
                  color="orange.500"
                  focusBorderColor="orange.500"
                  placeholder="Искать по названию"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <AutoCompleteList bgColor="#141414">
                  {searchHistory.map((item, index) => (
                    <AutoCompleteItem
                      key={index}
                      value={item}
                      label={item}
                      bgColor="#141414"
                      color="orange.500"
                    >
                      {item}
                    </AutoCompleteItem>
                  ))}
                </AutoCompleteList>
              </AutoComplete>
            </Box>
            <Box
              mt={10}
              justifyContent="center"
              display="flex"
              flexDirection="column"
            >
              {!query ? (
                <Heading color="orange.500" textAlign="center">
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
                    <Flex flexDirection="column" gap={20} alignItems="center">
                      <CinemaList cinemas={cinemas.docs} />

                      <Pagination
                        page={page}
                        limit={limit}
                        setPage={setPage}
                        setLimit={setLimit}
                        maxPage={cinemas.pages}
                      />
                    </Flex>
                  )}
                </>
              )}
            </Box>
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
