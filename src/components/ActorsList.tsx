import { Person } from "../types";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useState } from "react";
import ActorCard from "./ActorCard";

export default function ActorsList({ actors }: { actors: Person[] }) {
  if (!actors.length)
    return (
      <Heading color="orange.500" mt={200}>
        Информация об актерах не найдена
      </Heading>
    );
  const [currButton, setButton] = useState(1);
  let buttons = [],
    index = 1;
  for (let i = 0; i < actors.length; i += 5) {
    buttons.push(index);
    index++;
  }

  return (
    <Box>
      <Flex gap={4} p={5} flexWrap="wrap" justifyContent="center">
        {actors.slice((currButton - 1) * 5, currButton * 5).map((actor) => {
          return <ActorCard key={actor.id} actor={actor} />;
        })}
      </Flex>
      <Stack
        direction="row"
        spacing={5}
        p={4}
        alignItems="center"
        justifyContent="center"
      >
        {buttons.map((button, index) => {
          return (
            <Button
              isDisabled={currButton === button}
              colorScheme="orange"
              variant="outline"
              key={button}
              onClick={() => {
                setButton(button);
              }}
            >
              {button}
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}
