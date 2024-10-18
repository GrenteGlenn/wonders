import UserAnswer from "../../models/useranswer";
import UserAnswerController from "../controllers/UserAnswerController";

jest.mock('../../models/useranswer')

describe('UserAnswerController', () => {
    let controller: UserAnswerController;

    beforeEach(() => {
        controller = new UserAnswerController();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const created_at = new Date;
    const updated_at = new Date;

    it('should list all user answers', async () => {
        const mockUserAnswer = [
            {
              "id": 1,
              "text": null,
              "boolean": false,
              "updated_at": "2024-08-25T11:55:14.878Z"
            },
            {
              "id": 2,
              "text": null,
              "boolean": false,
              "updated_at": "2024-08-25T11:55:14.878Z"
            },
            {
              "id": 3,
              "text": null,
              "boolean": false,
              "updated_at": "2024-08-25T11:55:14.878Z"
            }
          ];
        (UserAnswer.findAll as jest.Mock).mockResolvedValue(mockUserAnswer);

        const result = await controller.list();

        expect(UserAnswer.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUserAnswer);
    });

    it('should get one user answer by id', async () => {
        const mockUserAnswer = {
            "id": 3,
            "text": null,
            "boolean": false,
            "updated_at": "2024-08-25T11:55:14.878Z"
          };
        (UserAnswer.findByPk as jest.Mock).mockResolvedValue(mockUserAnswer);

        const result = await controller.one(3);

        expect(UserAnswer.findByPk).toHaveBeenCalledWith(3);
        expect(result).toEqual(mockUserAnswer);
    });

    it('should create a new user answer', async () => {
        const mockUserAnswer = { id: 1, quiz_response_id: 1, quiz_line_id: 1, boolean: false, text: '', quiz_answer_text_id: 3, created_at: created_at, updated_at: updated_at };
        (UserAnswer.create as jest.Mock).mockResolvedValue(mockUserAnswer);

        const result = await controller.new(1, 1, 3, false, '', created_at, updated_at);

        expect(UserAnswer.create).toHaveBeenCalledWith({  quiz_response_id: 1, quiz_line_id: 1, boolean: false, text: '', quiz_answer_text_id: 3, created_at: created_at, updated_at: updated_at });
        expect(result).toEqual(mockUserAnswer);
    });

    it('should update an existing answer', async () => {
        const mockUserAnswer = { id: 1, quiz_response_id: 1, quiz_line_id: 1, boolean: false, text: '', quiz_answer_text_id: 3,created_at: created_at, updated_at: updated_at, save: jest.fn() };
        (UserAnswer.findByPk as jest.Mock).mockResolvedValue(mockUserAnswer);

        const result = await controller.update(1, 1, 1, 1, false, 'ttt', created_at, updated_at);

        expect(UserAnswer.findByPk).toHaveBeenCalledWith(1);
        expect(mockUserAnswer.save).toHaveBeenCalled();
        expect(mockUserAnswer.text).toBe('ttt');
        expect(mockUserAnswer.quiz_response_id).toBe(1);
        expect(result).toEqual(mockUserAnswer);
    });

    it('should remove a country by id', async () => {
        const mockUserAnswer = { id: 1, name: 'France', code: 'FR', destroy: jest.fn() };
        (UserAnswer.findByPk as jest.Mock).mockResolvedValue(mockUserAnswer);

        const result = await controller.delete(1);

        expect(UserAnswer.findByPk).toHaveBeenCalledWith(1);
        expect(mockUserAnswer.destroy).toHaveBeenCalled();
        expect(result).toEqual(mockUserAnswer);
    });
});
