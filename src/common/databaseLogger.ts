import { Logger } from "typeorm";
import { safeStringify } from "./utils";

export class DatabaseLogger implements Logger {
  logQuery(query: string, parameters?: any[]) {
    if (query !== "SELECT 1")
      console.info(`[DB] ${safeStringify({ query, parameters })}`);
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    console.error(`[DB] ${safeStringify({ query, parameters, error })}`);
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    console.warn(`[DB] ${safeStringify({ time, query, parameters })}`);
  }

  logSchemaBuild(message: string) {
    console.debug(`[DB] ${safeStringify({ message })}`);
  }

  logMigration(message: string) {
    console.debug(`[DB] ${safeStringify({ message })}`);
  }

  log(level: "log" | "info" | "warn", message: any) {
    console.log(`[DB] ${safeStringify({ level, message })}`);
  }
}
