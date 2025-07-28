export interface UserGroupInterface {
  id?: number;
  name: string;
  users: UserGroupLinkInterface[];
  created_at?: Date;
  updated_at?: Date;
}

export interface UserGroupLinkInterface {
  user: any;
  id?: number;
  user_id: number;
  user_group_id: number;
  is_accepted: boolean;
  is_owner: boolean;
  user_quiz_answer_id?: number | null;
  created_at?: Date;
  updated_at?: Date;
}
