import { FC } from "react";

import { NavMenuHeader } from "@/src/components/layout/NavLayout/components/NavMenu/NavMenuHeader";
import { NavMenuLink } from "@/src/components/layout/NavLayout/components/NavMenu/NavMenuLink";
import { navItems } from "@/src/components/layout/NavLayout/constants";

type NavMenuProps = {};

export const NavMenu: FC<NavMenuProps> = ({}) => {
  return (
    <div className="min-w-[240px] max-w-[240px] flex flex-col p-[24px] bg-base-100">
      <NavMenuHeader />
      <ul className="menu p-2 rounded-box">
        {navItems.map((item) => {
          if (item.type === "nav-title") {
            return (
              <li key={item.name} className="menu-title pt-1">
                <span className="pl-0">{item.name}</span>
              </li>
            );
          } else if (item.type === "nav-link") {
            return (
              <li key={item.name} className="pt-1">
                <NavMenuLink item={item} />
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};
