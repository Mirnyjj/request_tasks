import { tableAnatomy } from "@chakra-ui/react/anatomy";
import { defineSlotRecipe } from "@chakra-ui/react";

export const tableSlotRecipe = defineSlotRecipe({
  slots: tableAnatomy.keys(),
  base: {
    root: {
      borderCollapse: "separate",
      borderSpacing: 0,
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,

      display: "block",
    },
    header: {
      borderTopLeftRadius: 8,
      borderTopRightRadius: 8,
    },
    body: {
      borderTopWidth: 1,
      borderTopColor: "#D9E1EC",
    },
  },
});
