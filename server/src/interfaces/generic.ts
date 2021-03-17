import { Socket } from "socket.io";

/**
 * Type for a generic socket response
 * error field will contain any errors that may have occured if status is "error"
 * otherwise its null
 */
export type WSResponse = {
  status: "ok" | "error";
  error: string | null;
};

/**
 * Type for the socket binding.
 * T can extend the `this` object this if neccesary.
 */
export type IThis<T = unknown> = T & {
  socket: TSocket;
};

/**
 * Type for our extended socket.
 * T can extend the `Socket` object if neccesary.
 */
export type TSocket<T = unknown> = Socket &
  T & {
    name?: string;
    room?: string;
  };
