import { Grid, GridItem, Heading } from "@chakra-ui/react";
import CinemaCard from "./CinemaCard";
import { Cinema } from "../types";

export default function CinemaList({ cinemas }: { cinemas: Cinema[] }) {
  if (!cinemas.length)
    return (
      <Heading color="orange.500" mt={200}>
        По вашему запросу ничего не найдено
      </Heading>
    );
  return (
    <Grid
      templateColumns={[
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(1, 1fr)",
        "repeat(2, 1fr)",
        "repeat(3, 1fr)",
        "repeat(4, 1fr)",
      ]}
      gap={10}
    >
      {cinemas.map((cinema) => (
        <GridItem key={cinema.id}>
          <CinemaCard cinema={cinema} />
        </GridItem>
      ))}
    </Grid>
  );
}
