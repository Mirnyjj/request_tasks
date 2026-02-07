import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeProvider, type ColorModeProviderProps } from "./color-mode";
import { system } from "../../them/system";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={system}>
    <ChakraProvider value={system}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
  );
}
