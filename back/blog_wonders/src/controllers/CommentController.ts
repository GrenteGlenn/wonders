import Comment from '../../models/comment';

export default class CommentController {
  async list() {
    return await Comment.findAll();
  }

  async one(id: number) {
    return await Comment.findByPk(id);
  }

  async new(message: string, user_id: number, subject: number, created_at: Date) {
    try {
      return await Comment.create({ message, user_id, subject, created_at });
    } catch (error: unknown) {
      console.error('Error creating a Comment:', error);
    }
  }

  async update(id: number, message: string, user_id: number, subject: number, updated_at: Date) {
    const comment = await Comment.findByPk(id);
    try {
      if (!comment) {
        return { status: 404, message: 'Comment not found' };
      }

      comment.message = message;
      comment.user_id = user_id;
      comment.subject = subject;
      comment.updated_at = updated_at;
      await comment.save();
      return comment;
    } catch (error) {
      console.error('Error while updating a comment:', error);
    }
  }

  async delete(id: number) {
    try {
      const trip = await Comment.findByPk(id);

      if (!trip) {
        console.warn('Comment not found');
      } else {
        await trip.destroy();
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }
}
