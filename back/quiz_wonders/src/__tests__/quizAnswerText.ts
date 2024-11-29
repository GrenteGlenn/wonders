import QuizAnswerText from '../../models/quizanswertext';
import QuizAnswerTextController from '../controllers/QuizAnswerTextController';

jest.mock('../../models/quizanswertext');

describe('QuizAnswerTextController', () => {
  let controller: QuizAnswerTextController;

  beforeEach(() => {
    controller = new QuizAnswerTextController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date;
  const updated_at = new Date;

  it(' should list all quiz responses', async () => {
    const mockQuizAnswerTexts = [{ id: 1, answer: 'test', quiz_line_id: 1 }];
    (QuizAnswerText.findAll as jest.Mock).mockResolvedValue(mockQuizAnswerTexts);

    const result = await controller.list();
    expect(QuizAnswerText.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizAnswerTexts);
  });

  it(' should get a quiz answer', async () => {
    const mockQuizAnswerTexts = [{}];
    (QuizAnswerText.findByPk as jest.Mock).mockResolvedValue(mockQuizAnswerTexts);

    const result = await controller.one(1);
    expect(QuizAnswerText.findByPk).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizAnswerTexts);
  });

  it('should create a new quiz answer', async () => {
    const mockQuizAnswerText = { id: 1, answer: 'France', quiz_line_id: 1, created_at: created_at, updated_at: updated_at };
    (QuizAnswerText.create as jest.Mock).mockResolvedValue(mockQuizAnswerText);

    const result = await controller.new('France', 1, created_at, updated_at);

    expect(QuizAnswerText.create).toHaveBeenCalledWith({ answer: 'France', quiz_line_id: 1, created_at, updated_at });
    expect(result).toEqual(mockQuizAnswerText);
  });

  it('should update a new quiz answer', async () => {
    const mockQuizAnswerText = { id: 1, answer: 'France', quiz_line_id: 1, created_at, updated_at, save: jest.fn() };
    (QuizAnswerText.update as jest.Mock).mockResolvedValue(mockQuizAnswerText);

    const result = await controller.update(1, 'France', 16, created_at, updated_at);

    expect(QuizAnswerText.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuizAnswerText.save).toHaveBeenCalled();
    expect(mockQuizAnswerText.answer).toBe('France');
    expect(mockQuizAnswerText.quiz_line_id).toBe(16);
    expect(result).toEqual(mockQuizAnswerText);
  });

  it('should remove a quiz answer by id', async () => {
    const mockQuizAnswerText = { id: 1, answer: 'France', quiz_line_id: 1, destroy: jest.fn() };
    (QuizAnswerText.findByPk as jest.Mock).mockResolvedValue(mockQuizAnswerText);

    const result = await controller.delete(1);

    expect(QuizAnswerText.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuizAnswerText.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockQuizAnswerText);
  });
});
