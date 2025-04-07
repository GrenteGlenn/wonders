interface UserGroupInterface {
  id?: number;
  name: string;
  users?: UserGroupLinkInterface[];
  created_at?: Date;
  updated_at?: Date;
}

interface UserGroupLinkInterface {
  id?: number;
  user_id: number;
  user_group_id: number;
  is_accepted: boolean;
  is_owner: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export { UserGroupInterface, UserGroupLinkInterface };
