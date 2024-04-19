import { Fragment } from "react";

import NavBar from "@/components/core/NavBar";
import Header from "@/components/core/Header";
import Footer from "@/components/core/Footer";

type Props = Readonly<{
  children: React.ReactNode;
}>;

const PageTemplate = ({ children }: Props) => (
  <Fragment>
    <Header>
      <NavBar />
    </Header>
    {children}
    <Footer />
  </Fragment>
);

export default PageTemplate;
