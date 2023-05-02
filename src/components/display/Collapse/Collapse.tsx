import { ClassNameMap } from "@/src/helpers/style/classname";
import { ReactElement } from "react";

interface ICollapseProps {
  id: string;
  title: string;
  children: ReactElement;
  initialState?: "open" | "close";
  forceState?: typeof forceStateMap.keys;
}

export const Collapse = ({ id, children, title, initialState, forceState }: ICollapseProps) => {
  const style = {
    container: forceStateMap.get(forceState),
  };

  return (
    <div className={"collapse collapse-arrow bg-base-200 rounded-box" + style.container}>
      <input id={id} type="checkbox" defaultChecked={initialState === "open"} />
      <div className="collapse-title text-xl font-medium">{title}</div>
      <div className="collapse-content">{children}</div>
    </div>
  );
};

const forceStateMap = new ClassNameMap({
  open: "collapse-open",
  close: "collapse-close",
});
