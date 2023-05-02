"use client";

import { scrollToBottomOfDiv } from "@/helpers/dom/scroll";
import { FC, useEffect } from "react";

interface Props {
  logs: { timestamp: number; prefix?: string; className?: string; message: string; newLine?: boolean }[];
}

export const Console: FC<Props> = ({ logs }) => {
  useEffect(() => {
    if (logs && logs.length) {
      setTimeout(() => scrollToBottomOfDiv("logs-container"), 1000);
    }
  }, [logs]);

  return (
    <div id={"logs-container"} className="overflow-y-auto h-[80vh] flex flex-col pl-4">
      {logs.map((v, i) => {
        return (
          <div key={v.timestamp * 10 + i} className={`flex flex-row align-start ${v.newLine ? "mt-8" : ""}`}>
            <div className="min-w-[32px] opacity-[0.5]">
              <code className={v.className}>{v.prefix}</code>
            </div>
            <div className="">
              <code className={v.className}>{v.message}</code>
            </div>
          </div>
        );
      })}
      <div className="p-2" />
    </div>
  );
};
