import { WSResponse } from "./generic";

/**
 * Create a new Room
 */
export interface WSNewRoomRequest {
  type: "NewRoom";
}

export interface WSNewRoomResponse extends WSResponse {
  type: "NewRoom";
  payload: {
    link: string;
    name: string;
  };
}

/**
 * Change the name of the room
 */
export interface WSChangeRoomNameRequest {
  type: "ChangeRoomName";
  payload: {
    name: string;
  };
}

export interface WSChangeRoomNameResponse extends WSResponse {
  type: "ChangeRoomName";
  payload: {
    name: string;
  };
}

/**
 * Destroy a room and its contents
 */
export interface WSDestroyRoomRequest {
  type: "DestroyRoom";
  payload: {
    name: string;
  };
}

export interface WSDestroyRoomResponse extends WSResponse {
  type: "DestroyRoom";
}
