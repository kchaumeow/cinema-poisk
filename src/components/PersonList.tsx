import { Person } from "../types";
import { Card, CardBody, Stack } from "@chakra-ui/react";

export default function PersonList({ persons }: { persons: Person[] }) {
  return (
    <Stack spacing={2}>
      {persons.map((person: Person) => (
        <Card>
          <CardBody bgImage={person.photo}></CardBody>
        </Card>
      ))}
    </Stack>
  );
}
