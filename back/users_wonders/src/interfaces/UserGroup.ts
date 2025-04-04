interface UserGroupInterface {
  id?: number;
  name: string;
  owner: number;
  created_at: Date;
  updated_at: Date;
}

interface UserGroupLinkInterface {
  user_id: number;
  user_group_id: number;
  created_at: Date;
  updated_at: Date;
}

export { UserGroupInterface, UserGroupLinkInterface };
