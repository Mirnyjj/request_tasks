import { createSystem, defaultConfig } from "@chakra-ui/react";
import { tableSlotRecipe } from "./tableSlotRecipe";

const config = {
  theme: {
    slotRecipes: {
      table: tableSlotRecipe,
    },
  },
  tokens: {
    fonts: {
      body: { value: "Inter, sans-serif" },
      heading: { value: "Inter, sans-serif" },
    },
  },
};

export const system = createSystem(defaultConfig, config);
