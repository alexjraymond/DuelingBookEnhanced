/**
 * Centralized logging service for the Chrome extension.
 * Provides colored console output with filename prefixes for better debugging.
 * Supports log levels to control verbosity in different environments.
 */

import { ELogLevel } from "../../types";

/**
 * ANSI color codes for terminal output
 */
const Colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan: "\x1b[36m",
} as const;

/**
 * Logger class that provides colored console output with filename prefixes.
 * Respects the global log level to control output verbosity.
 */
export class Logger {
  private filename: string;

  /**
   * Global log level setting.
   * Set to DEBUG for development, INFO or WARN for production.
   * Can be changed at runtime: Logger.globalLogLevel = ELogLevel.DEBUG
   */
  static globalLogLevel: ELogLevel = ELogLevel.DEBUG;

  /**
   * Creates a new Logger instance.
   * @param filename - The filename (without extension) to prefix all log messages with
   */
  constructor(filename: string) {
    this.filename = filename;
  }

  /**
   * Formats a log message with filename prefix and color.
   * @param color - ANSI color code
   * @param args - Arguments to log
   * @returns Formatted log message
   */
  private formatMessage(color: string, ...args: unknown[]): unknown[] {
    const prefix = `${color}${Colors.Bright}[${this.filename}]${Colors.Reset}${color}`;
    return [prefix, ...args, Colors.Reset];
  }

  /**
   * Logs an info message (default console.log with blue color).
   * Only outputs if global log level is INFO or higher.
   * @param args - Arguments to log
   */
  log(...args: unknown[]): void {
    if (Logger.globalLogLevel >= ELogLevel.INFO) {
      console.log(...this.formatMessage(Colors.Blue, ...args));
    }
  }

  /**
   * Logs an error message (console.error with red color).
   * Only outputs if global log level is ERROR or higher.
   * @param args - Arguments to log
   */
  error(...args: unknown[]): void {
    if (Logger.globalLogLevel >= ELogLevel.ERROR) {
      console.error(...this.formatMessage(Colors.Red, ...args));
    }
  }

  /**
   * Logs a warning message (console.warn with yellow color).
   * Only outputs if global log level is WARN or higher.
   * @param args - Arguments to log
   */
  warn(...args: unknown[]): void {
    if (Logger.globalLogLevel >= ELogLevel.WARN) {
      console.warn(...this.formatMessage(Colors.Yellow, ...args));
    }
  }

  /**
   * Logs a success message (console.log with green color).
   * Only outputs if global log level is INFO or higher.
   * @param args - Arguments to log
   */
  success(...args: unknown[]): void {
    if (Logger.globalLogLevel >= ELogLevel.INFO) {
      console.log(...this.formatMessage(Colors.Green, ...args));
    }
  }

  /**
   * Logs a debug message (console.log with dim/cyan color).
   * Only outputs if global log level is DEBUG.
   * @param args - Arguments to log
   */
  debug(...args: unknown[]): void {
    if (Logger.globalLogLevel >= ELogLevel.DEBUG) {
      console.log(...this.formatMessage(`${Colors.Dim}${Colors.Cyan}`, ...args));
    }
  }
}
