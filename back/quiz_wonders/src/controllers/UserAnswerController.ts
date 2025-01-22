import UserAnswer from '../../models/useranswer';
interface UpdatedFields {
  quiz_answer_text_id?: number;
  quiz_line_id: number;
  quiz_response_id: number;
  boolean?: boolean;
  text?: string;
  updated_at: Date;
}

export default class UserAnswerController {
  
  async list() {
      return await UserAnswer.findAll();
  }

  async one(id: number) {
      return await UserAnswer.findByPk(id);
  }

  async new(
    quiz_answer_text_id: number | undefined,
    quiz_line_id: number,
    quiz_response_id: number,
    boolean: boolean | undefined,
    text: string | undefined,
    created_at: Date,
    updated_at: Date
  ) {
    try {
      return await UserAnswer.create({
        quiz_answer_text_id,
        quiz_line_id,
        boolean,
        quiz_response_id,
        text,
        created_at,
        updated_at
      });
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updatedFields: UpdatedFields) {
    try {
      const userAnswer = await UserAnswer.findByPk(id);
      if (userAnswer) {
        // Mettez à jour les propriétés de userAnswer avec celles de updatedFields
        Object.keys(updatedFields).forEach((key) => {
          const value = updatedFields[key as keyof UpdatedFields];
          if (value !== undefined) {
            // Assurez-vous que le type de la clé est valide pour userAnswer
            (userAnswer as any)[key as keyof typeof userAnswer] = value;
          }
        });
  
        // Sauvegardez les modifications dans la base de données
        await userAnswer.save();
        return userAnswer;
      } else {
        return null;  // Si l'utilisateur n'est pas trouvé
      }
    } catch (error) {
      console.error(error);
      throw new Error('Failed to update user answer');
    }
  }
  
  
  
  async delete(id: number) {
    try {
      return await UserAnswer.destroy({ where: { id } });
    } catch (error) {
      return console.log(error);
    }
  }
}
