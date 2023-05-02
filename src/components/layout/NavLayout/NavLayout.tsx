import { NavBar } from "@/src/components/layout/NavLayout/components/NavBar";
import { NavMenu } from "@/src/components/layout/NavLayout/components/NavMenu/NavMenu";
import { FC, ReactElement } from "react";

type NavLayoutProps = {
  children: ReactElement;
};

export const NavLayout: FC<NavLayoutProps> = ({ children }) => {
  return (
    <div className="drawer drawer-mobile">
      <input id="navigation-bar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <NavBar />
        {children}
      </div>
      <div className="drawer-side h-screen">
        <label htmlFor="navigation-bar" className="drawer-overlay" />
        <NavMenu />
      </div>
    </div>
  );
};
