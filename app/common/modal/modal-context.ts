import { createContext, useContext } from "react";

export const ModalContext = createContext({
  closeModal: (...args: unknown[]) => {
    void args;
  },
});

export const useModalContext = () => {
  return useContext(ModalContext);
};
