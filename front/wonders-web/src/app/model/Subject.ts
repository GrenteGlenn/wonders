export interface Subject {
    id: number;
    title: string;
    content: string;
    user_id: number;
    topic: number;
    likes: number;
    created_at?: Date;
    updated_at?: Date;
  }

  export interface Comment {
    id: number;
    message: string;
    user_id: number;
    subject: number;
    created_at?: Date;
    updated_at?: Date;
  }

  export interface SubjectDetails {
    id: number;
    title: string;
    content: string;
    user_id: number;
    topic: number;
    likes: number;
    comments: Comment[];
    created_at?: Date;
    updated_at?: Date;
  }