type NavBarProps = {
  items: { name: string; slug: string }[];
};

const NavBar = ({ items }: NavBarProps) => {
  return <h2>Nav Bar</h2>;
};

export default NavBar;
