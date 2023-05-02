import { appEmoji, appTitle } from "@/src/components/layout/NavLayout/constants";
import { noto } from "@/src/styles/font";
import Link from "next/link";
import { FC } from "react";

type NavMenuHeaderProps = {};

export const NavMenuHeader: FC<NavMenuHeaderProps> = ({}) => {
  return (
    <Link href="/" className="duration-200 ease-in-out hover:-rotate-[5deg] ">
      <div className="flex flex-row items-center pb-4">
        <h1 className={"m-0 " + noto.className}>{appEmoji}</h1>
        <h3 className="pl-1 m-0 text-accent-content">{appTitle}</h3>
      </div>
    </Link>
  );
};
