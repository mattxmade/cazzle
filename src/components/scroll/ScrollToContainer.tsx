import Container, { ContainerProps } from "@mui/material/Container/Container";

const ScrollToContainer = ({ children, ...props }: ContainerProps) => {
  return <Container {...props}>{children}</Container>;
};

export default ScrollToContainer;
