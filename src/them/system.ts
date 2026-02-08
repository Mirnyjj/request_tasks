import { createSystem, defaultConfig } from "@chakra-ui/react";
import { tableSlotRecipe } from "./tableSlotRecipe";

const config = {
  theme: {
    slotRecipes: {
      table: tableSlotRecipe,
    },
  },
};

export const system = createSystem(defaultConfig, config);
