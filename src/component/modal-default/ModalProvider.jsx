/* eslint-disable react/prop-types */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'

const ModalProvider = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor={"#232323"} color={"#dedede"}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Please choose chat topic first
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>

        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};



export default ModalProvider;
