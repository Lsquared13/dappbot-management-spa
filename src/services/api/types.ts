export interface RequestArgs {
  url: string,
  data: any
}

export interface Headers {
  'Content-Type': string,
  Authorization?:string
}

export interface AuthorizedRequest extends RequestArgs {
  headers: Headers,
  method: string
}

export enum RootResources {
  private = 'private',
  public = 'public',
  auth = 'auth'
}

export type RootStrings = keyof typeof RootResources;

export enum Operations {
  create = "create",
  login = "login",
  resetPassword = "reset-password",
  delete = "delete",
  edit = "edit",
  list = "list",
  read = "read"
}