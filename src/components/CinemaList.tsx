import { Box, GridItem } from "@chakra-ui/react";
import CinemaCard from "./CinemaCard";
import { CinemaSmall } from "../types";

export default function CinemaList({ cinemas }: { cinemas: CinemaSmall[] }) {
  return (
    <Box gap={6} display="flex" flexWrap="wrap" justifyContent="center">
      {cinemas.map((cinema) => (
        <GridItem key={cinema.id}>
          <CinemaCard cinema={cinema} />
        </GridItem>
      ))}
    </Box>
  );
}
