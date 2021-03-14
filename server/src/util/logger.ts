import { createLogger, format, transports } from "winston";
import shortid from "shortid";
const { printf, combine } = format;

const customFormat = printf(({ message, label, id, timestamp, topLevel }) => {
  return `${timestamp} [${label}${topLevel ? ": " + id : ""}]: ${message}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(
    format.colorize({ all: true }),
    format.timestamp({ format: "DD-MM-YYYY hh:mm" }),
    customFormat
  ),
  transports: [new transports.Console()],
});

export default logger;

export function log(message: string) {}

export class Log {
  private id = shortid.generate();
  private name: string;
  private topLevel = false;

  constructor(name: string, topLevel?: boolean) {
    this.name = name;
  }

  /**
   * Prints a debug message to the console
   * @param message Message to print
   */
  debug(message: string) {
    logger.debug({
      label: this.name,
      id: this.id,
      message,
      topLevel: this.topLevel,
    });
  }

  /**
   * Prints an info message to the console
   * @param message Message to print
   */
  info(message: string) {
    logger.info({
      label: this.name,
      id: this.id,
      message,
      topLevel: this.topLevel,
    });
  }

  /**
   * Prints an error message to the console
   * @param message Message to print
   */
  error(message: string) {
    logger.error({
      label: this.name,
      id: this.id,
      message,
      topLevel: this.topLevel,
    });
  }
}
