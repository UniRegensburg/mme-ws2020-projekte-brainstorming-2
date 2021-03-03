/**
 * Distribute a new message between participants
 */
interface WSChatMessage {
  type: "ChatMessage";
  payload: {
    message: string;
  };
}
