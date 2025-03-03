interface TopicInterface {
  id: number;
  country_id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

interface SubjectInterface {
  id: number;
  title: string;
  content: string;
  user_id: number;
  topic: number;
  created_at?: Date;
  updated_at?: Date;
}

interface CommentInterface {
  id: number;
  message: string;
  user_id: number;
  subject: number;
  created_at?: Date;
  updated_at?: Date;
}

export { CommentInterface, SubjectInterface, TopicInterface };
