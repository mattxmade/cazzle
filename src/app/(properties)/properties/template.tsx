import PageTemplate from "@/components/pages/PageTemplate";

type Props = {
  children: React.ReactNode;
};

export default function RouteTemplate({ children }: Props) {
  return <PageTemplate>{children}</PageTemplate>;
}
