import { Season } from "../types";
import { useState } from "react";
import { Box, Flex, Select, Text } from "@chakra-ui/react";
import EpisodesTable from "./EpisodesTable";

export default function Seasons({ list }: { list: Season[] }) {
  const [season, setSeason] = useState<number>(list[0].number);
  return (
    <Box display="flex" alignItems="center" flexDirection="column">
      <Flex gap={5} w="100%" alignItems="center" justifyContent="center">
        <Text color="orange.500" fontSize="xl">
          Сезон
        </Text>
        <Select
          value={season}
          color="orange"
          colorScheme="orange"
          onChange={(e) => setSeason(+e.target.value)}
          w="100px"
        >
          {list.map((season) => (
            <option value={season.number}>{season.number}</option>
          ))}
        </Select>
      </Flex>

      <EpisodesTable
        episodes={list.find((obj) => obj.number === season)!.episodes}
      />
    </Box>
  );
}
