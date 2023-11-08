import { IClient } from "./client";

export interface IPhoto {
  readonly id?: string;
  name: string;
  url: string;
  user: IClient;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export interface IPhotoObject {
  name: string;
  extension: string;
  data: string;
}
