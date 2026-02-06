import { useCallback, useState } from "react";

export function useColumnHeader<T>(activeFilter: T | null) {
  const [isOpen, setIsOpen] = useState(false);

  const hasFilter = activeFilter !== null;

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((v) => !v), []);

  return {
    isOpen,
    hasFilter,
    open,
    close,
    toggle,
  };
}
