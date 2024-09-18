export default interface SessionInterface {
  id?: number;
  token: string;
  valid: boolean;
  user_id: number;
}
