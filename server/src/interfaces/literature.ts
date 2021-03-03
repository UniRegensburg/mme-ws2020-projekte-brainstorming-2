import { WSResponse } from "./generic";

/**
 * Add a new literature source
 */
export interface WSAddLiteratureRequest {
  type: "AddLiterature";
  payload: Literature;
}

export interface WSAddLiteratureResponse extends WSResponse {
  type: "AddLiterature";
}

export interface WSLiteratureAdded {
  type: "LiteratureAdded";
  payload: {
    literature: Literature;
    from: string;
  };
}

/**
 * Remove a literature source
 */
export interface WSRemoveLiteratureRequest {
  type: "RemoveLiterature";
  payload: {
    id: string;
  };
}

export interface WSRemoveLiteratureResponse extends WSResponse {
  type: "RemoveLiterature";
}

export interface WSLiteratureRemoved {
  type: "LiteratureAdded";
  payload: {
    id: string;
  };
}

/**
 * Exports the literature collection of the room
 */
export interface WSExportLiteratureRequest {
  type: "ExportLiterature";
}

export interface WSExportLiteratureResponse extends WSResponse {
  type: "ExportLiterature";
  payload: {
    data: Buffer;
  };
}

/**
 * Literature Type
 */
export type Literature = {
  id?: string;
  title: string;
  author?: string;
  url?: string;
  pages?: number[];
};
