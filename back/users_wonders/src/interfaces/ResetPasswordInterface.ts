export default interface ResetPasswordInterface {
  id?: number;
  token: string;
  created_at: Date;
  expired_at: Date;
  user_id: number;
}
