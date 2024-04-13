import { Episode } from "../types";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export default function EpisodesTable({ episodes }: { episodes: Episode[] }) {
  return (
    <TableContainer w="80%" bgColor="#141414" p={5} borderRadius="lg" m={10}>
      <Table variant="simple" size="lg" colorScheme="red">
        <TableCaption color="white">Эпизоды</TableCaption>
        <Thead>
          <Tr>
            <Th color="white">Номер</Th>
            <Th color="white">Название</Th>
            <Th color="white">Дата выхода</Th>
          </Tr>
        </Thead>
        <Tbody>
          {episodes.map((episode) => (
            <Tr>
              <Td color="white">{episode.number}</Td>
              <Td color="white" whiteSpace="normal">
                {episode.description || "-"}
              </Td>
              <Td color="white">
                {episode.airDate
                  ? new Date(episode.airDate).toLocaleString("ru", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    })
                  : "-"}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
