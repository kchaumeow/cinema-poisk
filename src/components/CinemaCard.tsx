import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Text,
} from "@chakra-ui/react";
import { CinemaSmall } from "../types";
import { Link } from "react-router-dom";

export default function CinemaCard({ cinema }: { cinema: CinemaSmall }) {
  return (
    <Link to={`/cinemas/${cinema.id}`}>
      <Card
        bg="#141414"
        maxW="sm"
        transition="transform .3s linear"
        _hover={{
          transform: "scale(1.1)",
        }}
      >
        <CardBody>
          <Image
            src={cinema.poster.url}
            alt={cinema.name}
            borderRadius="lg"
            objectFit="contain"
          />
        </CardBody>
        <Divider borderColor={"orange"} />
        <CardFooter display="flex" justifyContent="space-between">
          <Text color="white" as="b" fontSize="2xl" noOfLines={1}>
            {cinema.name}
          </Text>
          <Text color="orange.400" as="b" fontSize="2xl">
            {cinema.rating.kp}
          </Text>
        </CardFooter>
      </Card>
    </Link>
  );
}
