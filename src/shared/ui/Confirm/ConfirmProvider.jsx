import { useCallback, useMemo, useRef, useState } from "react";
import { ConfirmContext } from "./ConfirmContext";
import { ConfirmModal } from "./ConfirmModal";

const DEFAULT_MESSAGE = "Wirklich löschen?";

export const ConfirmProvider = ({ children }) => {
  const resolverRef = useRef(null);

  const [state, setState] = useState({
    open: false,
    message: DEFAULT_MESSAGE,
  });

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      resolverRef.current = resolve;

      setState({
        open: true,
        message: message ?? DEFAULT_MESSAGE,
      });
    });
  }, []);

  const close = useCallback((result) => {
    setState((s) => ({ ...s, open: false }));
    resolverRef.current?.(result);
    resolverRef.current = null;
  }, []);

  const value = useMemo(() => confirm, [confirm]);

  return (
    <ConfirmContext.Provider value={value}>
      {children}

      <ConfirmModal
        open={state.open}
        message={state.message}
        onConfirm={() => close(true)}
        onCancel={() => close(false)}
      />
    </ConfirmContext.Provider>
  );
};