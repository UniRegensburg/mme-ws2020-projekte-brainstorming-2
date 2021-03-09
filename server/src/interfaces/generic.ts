/**
 * Type for a generic socket response
 * error field will contain any errors that may have occured if status is "error"
 * otherwise its null
 */
export type WSResponse = {
  status: "ok" | "error";
  error: string | null;
};
