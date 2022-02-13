import { ProductProvider } from "./productContext";

export const Providers = ({ children }) => {
  return <ProductProvider>{children}</ProductProvider>;
};
