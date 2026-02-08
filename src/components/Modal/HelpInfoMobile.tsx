import { Box, Dialog } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { HelpInfo } from "./HelpInfo";

export const HelpInfoMobile = ({
  setShowHelpInfo,
}: {
  setShowHelpInfo: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Dialog.Header
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        border="1px solid #DDDDDD"
      >
        <Box
          cursor="pointer"
          position="relative"
          top="0"
          onClick={() => setShowHelpInfo((e) => !e)}
        >
          <IoMdArrowBack size={30} color="black" />
        </Box>

        <Dialog.Title fontSize="2xl" fontWeight="semibold">
          Проверьте себя
        </Dialog.Title>
      </Dialog.Header>
      <Dialog.Body
        px="8"
        pb="8"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        flex={1}
      >
        <HelpInfo />
      </Dialog.Body>
    </>
  );
};
