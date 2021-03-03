import { WSResponse } from "./generic";

/**
 * Gets the current whiteboard status
 * Used if a new user joins or a room is reentered
 */
export interface WSGetWhiteboardStatusRequest {
  type: "WhiteBoardGetStatus";
}

export interface WSGetWhiteboardStatusResponse extends WSResponse {
  type: "WhiteBoardGetStatus";
  payload: {
    data: any;
  };
}

/**
 * Joined room
 * Emitted from the server to all connected clients of a room when a new user joins
 */
export interface WSJoinedResponse {
  type: "Joined";
  payload: {
    username: string;
  };
}

/**
 * Updates a part of the whiteboard
 * Can be drawing, sticker or any other event on the canvas
 */
export interface WSUpdateWhiteboardRequest {
  type: "WhiteBoardUpdated";
  payload: {
    from: string;
    timestamp: number;
    data: any;
  };
}

/**
 * Saves the current whiteboard status to the database
 */
export interface WSSaveWhiteboardRequest {
  type: "WhiteBoardSave";
  payload: {
    roomId: string;
    data: any;
  };
}

export interface WSSaveWhiteboardResponse extends WSResponse {
  type: "WhiteBoardSave";
}
