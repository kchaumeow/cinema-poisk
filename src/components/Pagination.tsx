import { Button, Flex, Select, Text } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { UsePaginationResult } from "../hooks/usePagination";

type PaginationProps = UsePaginationResult & { maxPage: number };

export default function Pagination({
  limit,
  page,
  setPage,
  maxPage,
  setLimit,
}: PaginationProps) {
  const buttons = [page - 1, page, page + 1];
  return (
    <Flex alignItems="center" gap={5}>
      <Button
        colorScheme="orange"
        variant="solid"
        isDisabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        <ArrowBackIcon />
      </Button>
      {buttons.map((button) => {
        return (
          <Button
            key={button}
            colorScheme="orange"
            variant={page === button ? "solid" : "outline"}
            isDisabled={page === button}
            display={button && button < maxPage ? "block" : "none"}
            onClick={() => setPage(button)}
          >
            {button}
          </Button>
        );
      })}
      <Button
        colorScheme="orange"
        variant="solid"
        isDisabled={page === maxPage}
        onClick={() => setPage(page + 1)}
      >
        <ArrowForwardIcon />
      </Button>
      <Text color="orange.500" w="100px">
        из {maxPage}
      </Text>
      <Select
        w="100px"
        defaultValue={limit}
        onChange={(e) => setLimit(e.target.value)}
        colorScheme="orange"
        color="orange"
      >
        <option value="5">5</option>
        <option value="7">7</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </Select>
    </Flex>
  );
}
