"use client";

import { INavLink } from "@/src/components/layout/NavLayout/constants";
import { toogleCheckboxInput } from "@/src/helpers/dom/input";
import Link from "next/link";
import { FC } from "react";

type NavMenuProps = { item: INavLink };

export const NavMenuLink: FC<NavMenuProps> = ({ item }) => {
  return (
    <Link href={item.path} className="rounded-lg" onClick={() => toogleCheckboxInput("navigation-bar")}>
      {item.name}
    </Link>
  );
};
