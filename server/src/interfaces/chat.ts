import { WSResponse } from "./generic";

/**
 * Distribute a new message between participants
 */
export interface WSChatMessage {
  type: "ChatMessage";
  payload: {
    from: string;
    message: string;
  };
}

/**
 * Change username
 */
export interface WSChangeNameRequest {
  type: "ChangeName";
  payload: {
    username: string;
  };
}

export interface WSChangeNameResponse extends WSResponse {
  type: "ChangeName";
  payload: {};
}

/**
 * Notify participants
 */
export interface WSUsernameChanged {
  type: "NameCahnged";
  payload: {
    oldUsername: string;
    newUsername: string;
  };
}
