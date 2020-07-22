export interface INormalResponse {
  ok: boolean;
  error: string | null;
}

export interface ITokenResponse {
  ok: boolean;
  error: string | null;
  token: string | null;
}
