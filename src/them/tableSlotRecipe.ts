import { tableAnatomy } from "@chakra-ui/react/anatomy";
import { defineSlotRecipe } from "@chakra-ui/react";

export const tableSlotRecipe = defineSlotRecipe({
  slots: tableAnatomy.keys(),
  base: {
    root: {
      overflow: "hidden",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    header: {
      backgroundColor: "#F1F1F1",
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    body: {
      borderTopWidth: 1,
      borderTopColor: "#D9E1EC",
    },
  },
});
