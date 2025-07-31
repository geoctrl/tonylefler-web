import { createContext, useContext } from "react";

export const ModalContext = createContext({
  closeModal: (result?: any) => {},
});

export const useModalContext = () => {
  return useContext(ModalContext);
};
