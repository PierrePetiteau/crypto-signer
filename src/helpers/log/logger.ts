export type ILogLevel = "debug" | "code" | "success" | "info" | "warning" | "error";

export interface ILog {
  timestamp: number;
  message: string;
  level?: ILogLevel;
}

export class Logger {
  history: ILog[] = [];

  private log(message: string, level: ILog["level"]) {
    this.history.push({ level, timestamp: Date.now(), message });
  }

  debug(message: string) {
    this.log(message, "debug");
  }
  code(message: string) {
    this.log(message, "code");
  }
  success(message: string) {
    this.log(message, "success");
  }
  info(message: string) {
    this.log(message, "info");
  }
  warning(message: string) {
    this.log(message, "warning");
  }
  error(message: string) {
    this.log(message, "error");
  }

  merge(history: ILog[]) {
    this.history.push(...history);
  }
}
