type RouteLayoutProps = Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>;

export default function RouteLayout(props: RouteLayoutProps) {
  return (
    <>
      {props.children}
      {props.modal}
    </>
  );
}
