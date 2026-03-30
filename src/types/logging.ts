/**
 * Log level enumeration.
 * Controls which log messages are output to the console.
 */
export enum ELogLevel {
  /** No logging */
  NONE = 0,
  /** Only error messages */
  ERROR = 1,
  /** Error and warning messages */
  WARN = 2,
  /** Error, warning, and info messages */
  INFO = 3,
  /** All messages including debug */
  DEBUG = 4,
}
