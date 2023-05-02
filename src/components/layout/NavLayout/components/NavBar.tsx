import { appTitle } from "@/src/components/layout/NavLayout/constants";
import { FC } from "react";
import { Menu as MenuIcon } from "react-feather";

type NavBarProps = {};

export const NavBar: FC<NavBarProps> = ({}) => {
  return (
    <div className="navbar bg-base-200 lg:hidden">
      <div className="flex-none">
        <label htmlFor="navigation-bar" className="btn btn-square drawer-button btn-ghost">
          <MenuIcon />
        </label>
      </div>
      <div className="flex-1">
        <h3 className="p-2 m-0">{appTitle}</h3>
      </div>
    </div>
  );
};
