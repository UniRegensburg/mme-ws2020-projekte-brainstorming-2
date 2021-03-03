# Communication Interfaces

## Principles

All communication is meant to be held over websockets.  
Client facing data can only be changed when the request has been verified by the server. `Response` type will contain a filed indicating if the request was successfull.
If not stated otherwise, responses will be sent as socket.io acknowledgements (see [here](https://socket.io/docs/v3/emitting-events/)).  
Emited event names are expected to match the `type` field.

## Reference

### Setup

**Create Room**

Creates a new room in the database and returns the unique link and a human readable name.

```typescript
interface WSNewRoomRequest {
  type: "NewRoom";
}

interface WSNewRoomResponse extends WSResponse {
  type: "NewRoom";
  payload: {
    link: string;
    name: string;
  };
}
```

**Rename Room**

Renames the room to the provided name. Does not change the unique URL.

```typescript
interface WSChangeRoomNameRequest {
  type: "ChangeRoomName";
  payload: {
    name: string;
  };
}

interface WSChangeRoomNameResponse extends WSResponse {
  type: "ChangeRoomName";
  payload: {
    name: string;
  };
}
```

**Destroy Room**

Deletes the room with its contents

```typescript
interface WSDestroyRoomRequest {
  type: "DestroyRoom";
  payload: {
    name: string;
  };
}

interface WSDestroyRoomResponse extends WSResponse {
  type: "DestroyRoom";
}
```

### Whiteboard

**Get Status**

Returns the current whiteboard status

```typescript
interface WSGetWhiteboardStatusRequest {
  type: "WhiteBoardGetStatus";
}

interface WSGetWhiteboardStatusResponse extends WSResponse {
  type: "WhiteBoardGetStatus";
  payload: {
    data: any;
  };
}
```

**User Joined**

> This is an emit-only event

Gets emited if a new user joins the room

```typescript
interface WSJoinedResponse {
  type: "Joined";
  payload: {
    username: string;
  };
}
```

**Update Whiteboard**

> This event gets no response

Distributes a change to the whiteboard between the participants of a room

```typescript
interface WSUpdateWhiteboardRequest {
  type: "WhiteBoardUpdated";
  payload: {
    from: string;
    timestamp: number;
    data: any;
  };
}
```

**Save Room**

Saves the content of the room to the database

```typescript
interface WSSaveWhiteboardRequest {
  type: "WhiteBoardSave";
  payload: {
    roomId: string;
    data: any;
  };
}

interface WSSaveWhiteboardResponse extends WSResponse {
  type: "WhiteBoardSave";
}
```

### Chat

> Chat events do not receive a response

**New Message**

Send a new message to the chat

```typescript
interface WSChatMessage {
  type: "ChatMessage";
  payload: {
    message: string;
  };
}
```

### Literature

> Literature Type
>
> ```typescript
> type Literature = {
>   id?: string;
>   title: string;
>   author?: string;
>   url?: string;
>   pages?: number[];
> };
> ```

**Add Literature**

> Seperate event is distributed to inform all users

Adds a new literature to the room and database

```typescript
interface WSAddLiteratureRequest {
  type: "AddLiterature";
  payload: Literature;
}

interface WSAddLiteratureResponse extends WSResponse {
  type: "AddLiterature";
}

interface WSLiteratureAdded {
  type: "LiteratureAdded";
  payload: {
    literature: Literature;
    from: string;
  };
}
```

**Remove Literature**

> Seperate event is distributed to inform all users

Removes a literature source from the database and room

```typescript
interface WSRemoveLiteratureRequest {
  type: "RemoveLiterature";
  payload: {
    id: string;
  };
}

interface WSRemoveLiteratureResponse extends WSResponse {
  type: "RemoveLiterature";
}

interface WSLiteratureRemoved {
  type: "LiteratureAdded";
  payload: {
    id: string;
  };
}
```

**Export Literature**

Exports the rooms literature as a file

```typescript
interface WSExportLiteratureRequest {
  type: "ExportLiterature";
}

interface WSExportLiteratureResponse extends WSResponse {
  type: "ExportLiterature";
  payload: {
    data: Buffer;
  };
}
```
