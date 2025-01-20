export default interface MessageInterface {
  id?: number;
  message: string;
  created_at?: Date;
  updated_at?: Date;
  user_id?: number;
}
