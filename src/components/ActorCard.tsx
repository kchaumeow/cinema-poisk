import { Card, CardBody, CardFooter, Image, Text } from "@chakra-ui/react";
import { Person } from "../types";

export default function ActorCard({ actor }: { actor: Person }) {
  return (
    <Card bg="#141414" maxW="sm" h="500px">
      <CardBody h={400} w={300}>
        <Image
          src={actor.photo}
          alt={actor.name}
          borderRadius="lg"
          w={300}
          h={400}
        />
      </CardBody>
      <CardFooter display="flex" justifyContent="space-between">
        <Text color="white" as="b" fontSize="lg" noOfLines={1} p={2}>
          {actor.name}
        </Text>
        <Text color="orange.500" as="b" fontSize="lg" p={2}>
          {actor.profession.slice(0, -1)}
        </Text>
      </CardFooter>
    </Card>
  );
}
