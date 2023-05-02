import { Collapse } from "@/src/components/display/Collapse/Collapse";
import { Console } from "@/src/components/mockup/Console/Console";
import { useTransfer } from "@/src/contexts/TransferContext";

const levelToPrefix = {
  debug: "",
  code: "",
  success: "✅",
  info: "ℹ️",
  warning: "⚠️",
  error: "❌",
};

const levelToClass = {
  debug: "opacity-[0.5]",
  code: "",
  success: "text-success",
  info: "text-info opacity-[0.5]",
  warning: "text-warning",
  error: "text-error",
};

export const TransferLogs = () => {
  const { logs } = useTransfer();

  return (
    <Collapse id="collapse_logs_section" title="Step 3 - check the result" initialState="close">
      <Console
        logs={logs?.map((v, i) => ({
          timestamp: v.timestamp,
          prefix: v.level ? levelToPrefix[v.level] : " ",
          className: v.level ? levelToClass[v.level] : "",
          message: v.message,
          newLine: !!i && v.level && ["info"].includes(v.level),
        }))}
      />
    </Collapse>
  );
};
