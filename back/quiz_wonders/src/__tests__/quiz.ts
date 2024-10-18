import Quiz from '../../models/quiz';
import QuizController from '../controllers/QuizController';

// Mock du modèle Quiz
jest.mock('../../models/quiz');

describe('QuizController', () => {
  let controller: QuizController;

  beforeEach(() => {
    controller = new QuizController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date;
  const updated_at = new Date;

  it('should list all quizzes', async () => {
    const mockQuizzes = [
      { id: 1, name: 'Quiz 1', tag_id: 1 },
      { id: 2, name: 'Quiz 2', tag_id: 2 }
    ];
    (Quiz.findAll as jest.Mock).mockResolvedValue(mockQuizzes);

    const result = await controller.list();

    expect(Quiz.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizzes);
  });

  it('should get one quiz by id', async () => {
    const mockQuiz = { id: 1, name: 'Quiz 1', tag_id: 1 };
    (Quiz.findByPk as jest.Mock).mockResolvedValue(mockQuiz);

    const result = await controller.one(1);

    expect(Quiz.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockQuiz);
  });

  it('should create a new quiz', async () => {
    const mockQuiz = { id: 1, name: 'New Quiz', tag_id: 1, created_at: created_at, updated_at: updated_at };
    (Quiz.create as jest.Mock).mockResolvedValue(mockQuiz);

    const result = await controller.new('New Quiz', 1, created_at, updated_at);

    expect(Quiz.create).toHaveBeenCalledWith({ name: 'New Quiz', tag_id: 1, created_at, updated_at });
    expect(result).toEqual(mockQuiz);
  });

  it('should update an existing quiz', async () => {
    const mockQuiz = { id: 1, name: 'New Quiz', tag_id: 1, created_at: created_at, updated_at: updated_at, save: jest.fn() };
    (Quiz.findByPk as jest.Mock).mockResolvedValue(mockQuiz);

    const result = await controller.update(1, 'Updated Quiz', 2, created_at, updated_at);

    expect(Quiz.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuiz.save).toHaveBeenCalled();
    expect(mockQuiz.name).toBe('Updated Quiz');
    expect(mockQuiz.tag_id).toBe(2);
    expect(result).toEqual(mockQuiz);
  });

  it('should delete a quiz by id', async () => {
    const mockQuiz = {
      id: 1,
      name: 'Quiz 1',
      tag_id: 1,
      destroy: jest.fn()
    };
    (Quiz.findByPk as jest.Mock).mockResolvedValue(mockQuiz);

    const result = await controller.remove(1);

    expect(Quiz.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuiz.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockQuiz);
  });
});
