import { ClientOnly, IconButton, Skeleton, Span } from "@chakra-ui/react";
import { LuMoon, LuSun } from "react-icons/lu";
import { ThemeProvider } from "next-themes";
import type { IconButtonProps, SpanProps } from "@chakra-ui/react";
import * as React from "react";
import { useColorMode } from "../../lib/colorModeUtils";

export type ColorModeProviderProps = React.ComponentProps<typeof ThemeProvider>;

export function ColorModeProvider({
  children,
  ...props
}: ColorModeProviderProps) {
  return (
    <ThemeProvider attribute="class" disableTransitionOnChange {...props}>
      {children}
    </ThemeProvider>
  );
}

export function ColorModeIcon() {
  const { colorMode } = useColorMode();
  return colorMode === "dark" ? <LuSun /> : <LuMoon />;
}

export const ColorModeButton = React.forwardRef<
  HTMLButtonElement,
  Omit<IconButtonProps, "aria-label">
>(function ColorModeButton(props, ref) {
  const { toggleColorMode } = useColorMode();
  return (
    <ClientOnly fallback={<Skeleton boxSize="9" />}>
      <IconButton
        onClick={toggleColorMode}
        variant="ghost"
        aria-label="Toggle color mode"
        size="sm"
        ref={ref}
        {...props}
        css={{
          _icon: {
            width: "5",
            height: "5",
          },
        }}
      >
        <ColorModeIcon />
      </IconButton>
    </ClientOnly>
  );
});

export const LightMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function LightMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme light"
        colorPalette="gray"
        colorScheme="light"
        ref={ref}
        {...props}
      />
    );
  },
);

export const DarkMode = React.forwardRef<HTMLSpanElement, SpanProps>(
  function DarkMode(props, ref) {
    return (
      <Span
        color="fg"
        display="contents"
        className="chakra-theme dark"
        colorPalette="gray"
        colorScheme="dark"
        ref={ref}
        {...props}
      />
    );
  },
);
