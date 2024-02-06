import { Container } from "postcss";

type ListingAside = {
  children?: React.ReactNode;
};

const ListingAside = ({ children }: ListingAside) => {
  return <>{children}</>;
};

export default ListingAside;
