import { IClient } from "./client";

export interface IPhoto {
  readonly id?: string;
  name: string;
  url: string;
  user: IClient;
  readonly createdAt?: string;
  readonly updatedAt?: string;
}

export interface IPhotoObject {
  name: string;
  extension: string;
  data: string;
}
