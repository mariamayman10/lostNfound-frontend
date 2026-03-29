import DesktopNav from "./desktopNav";
import TabletNav from "./tabletNav";
import MobileNav from "./mobileNav";

function Navbar() {
  return (
    <header>
      <MobileNav className="block sm:hidden" />
      <TabletNav className="hidden sm:block md:hidden" />
      <DesktopNav className="hidden md:block" />
    </header>
  );
}

export default Navbar;
