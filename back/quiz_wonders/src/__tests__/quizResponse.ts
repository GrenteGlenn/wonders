import QuizResponse from '../models/quizresponse';
import QuizResponseController from '../controllers/QuizResponseController';

jest.mock('../models/quizresponse');

describe('CountryController', () => {
  let controller: QuizResponseController;

  beforeEach(() => {
    controller = new QuizResponseController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date;
  const updated_at = new Date;

  it('sould list all quiz responses', async () => {
    const mockQuizResponse = [
      {
        id: 1,
        user_id: 1,
        quiz_id: 1,
        updated_at: '2024-08-25T11:55:14.876Z',
        userAnswer: [
          {
            id: 1,
            text: null,
            boolean: false,
            updated_at: '2024-08-25T11:55:14.878Z',
            quiz_line: {
              id: 1,
              question: 'A quelle frequence vous voyagez ?',
              is_boolean: false,
              step: 1,
              is_text: true,
              is_required: true
            },
            quiz_answer_texts: {
              id: 1,
              answer: 'Au moins 1 fois par an',
              quiz_line_id: 1
            }
          },
          {
            id: 2,
            text: null,
            boolean: false,
            updated_at: '2024-08-25T11:55:14.878Z',
            quiz_line: {
              id: 1,
              question: 'A quelle frequence vous voyagez ?',
              is_boolean: false,
              step: 1,
              is_text: true,
              is_required: true
            },
            quiz_answer_texts: {
              id: 1,
              answer: 'Au moins 1 fois par an',
              quiz_line_id: 1
            }
          },
          {
            id: 3,
            text: null,
            boolean: false,
            updated_at: '2024-08-25T11:55:14.878Z',
            quiz_line: {
              id: 1,
              question: 'A quelle frequence vous voyagez ?',
              is_boolean: false,
              step: 1,
              is_text: true,
              is_required: true
            },
            quiz_answer_texts: {
              id: 1,
              answer: 'Au moins 1 fois par an',
              quiz_line_id: 1
            }
          }
        ]
      },
      {
        id: 2,
        user_id: 1,
        quiz_id: 2,
        updated_at: '2024-08-25T11:55:14.876Z',
        userAnswer: []
      },
      {
        id: 3,
        user_id: 1,
        quiz_id: 3,
        updated_at: '2024-08-25T11:55:14.876Z',
        userAnswer: []
      }
    ];

    (QuizResponse.findAll as jest.Mock).mockResolvedValue(mockQuizResponse);

    const result = await controller.list();

    expect(QuizResponse.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizResponse);
  });

  it('should get one quiz answer', async () => {
    const mockQuizResponse = {
      id: 2,
      text: null,
      boolean: false,
      updated_at: '2024-08-25T11:55:14.878Z',
      quiz_line: {
        id: 1,
        question: 'A quelle frequence vous voyagez ?',
        is_boolean: false,
        step: 1,
        is_text: true,
        is_required: true
      },
      quiz_answer_texts: {
        id: 1,
        answer: 'Au moins 1 fois par an',
        quiz_line_id: 1
      }
    };

    (QuizResponse.findByPk as jest.Mock).mockResolvedValue(mockQuizResponse);

    const result = await controller.one(2);

    expect(QuizResponse.findByPk).toHaveBeenCalledWith(2);
    expect(result).toEqual(mockQuizResponse);
  });
  it('should create a new quiz response', async () => {
    const mockQuizResponse = { id: 1, quiz_id: 1, user_id: 2, created_at: created_at, updated_at: updated_at };
    (QuizResponse.create as jest.Mock).mockResolvedValue(mockQuizResponse);

    const result = await controller.new(1, 2, created_at, updated_at);

    expect(QuizResponse.create).toHaveBeenCalledWith({ quiz_id: 1, user_id: 2 });
    expect(result).toEqual(mockQuizResponse);
  });

  it('should update an existing quiz response', async () => {
    const mockQuizResponse = { id: 1, quiz_id: 1, user_id: 2, created_at: created_at, updated_at: updated_at, save: jest.fn() };

    (QuizResponse.findByPk as jest.Mock).mockResolvedValue(mockQuizResponse);
    const result = await controller.update(1, 1, 10, created_at, updated_at);

    expect(QuizResponse.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuizResponse.save).toHaveBeenCalled();
    expect(mockQuizResponse.quiz_id).toBe(1);
    expect(mockQuizResponse.user_id).toBe(10);
    expect(result).toEqual(mockQuizResponse);
  });

  it('should remove a quiz response by id', async () => {
    const mockQuizResponse = { id: 1, quiz_id: 1, user_id: 2, destroy: jest.fn() };
    (QuizResponse.findByPk as jest.Mock).mockResolvedValue(mockQuizResponse);

    const result = await controller.delete(1);

    expect(QuizResponse.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuizResponse.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockQuizResponse);
  });
});
