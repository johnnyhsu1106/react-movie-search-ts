interface NavLinkProps {
  text: string;
  onNavLinkClick: () => void;
};


const NavLink = ({
  text,
  onNavLinkClick,
}: NavLinkProps) => {
  return (
    <span onClick={onNavLinkClick}> {text} ... </span>
  )
};

export default NavLink
