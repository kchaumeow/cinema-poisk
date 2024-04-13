import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";

export default function SearchModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  return (
    <>
      <Input
        mt={4}
        onClick={onOpen}
        placeholder="Искать по названию"
        w="500px"
      />

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bgColor="#141414">
          <ModalHeader color="orange.500">Поиск фильма по названию</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              colorScheme="orange"
              color="orange.500"
              focusBorderColor="orange.500"
              autoFocus={true}
              mt={4}
              placeholder="Искать по названию"
              w="500px"
            />
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} colorScheme="orange">
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
