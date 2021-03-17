/**
 * Distribute a new message between participants
 */
export interface WSChatMessage {
  type: "ChatMessage";
  payload: {
    message: string;
  };
}
