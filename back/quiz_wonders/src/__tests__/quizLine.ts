import QuizLine from '../../models/quizline';
import QuizLineController from '../controllers/QuizLineController';

jest.mock('../../models/quizline');

describe('QuizLineController', () => {
  let controller: QuizLineController;

  beforeEach(() => {
    controller = new QuizLineController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get all quizLines', async () => {
    const mockQuizLines = [
      {
        id: 1,
        question: 'A quelle frequence vous voyagez ?',
        is_boolean: false,
        step: 1,
        is_text: true,
        is_required: true,
        response_kind: {
          id: 3,
          type: 'Responses'
        },
        quiz: {
          id: 2,
          name: 'Pricing'
        }
      },
      {
        id: 2,
        question: 'How much will you spend during your trip',
        is_boolean: false,
        step: 2,
        is_text: true,
        is_required: true,
        response_kind: {
          id: 3,
          type: 'Responses'
        },
        quiz: {
          id: 2,
          name: 'Pricing'
        }
      }
    ];
    (QuizLine.findAll as jest.Mock).mockResolvedValue(mockQuizLines);

    const result = await controller.list();

    expect(QuizLine.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizLines);
  });

  it('should get all quizLines', async () => {
    const mockQuizLines = [
      {
        id: 1,
        question: 'A quelle frequence vous voyagez ?',
        is_boolean: false,
        step: 1,
        is_text: true,
        is_required: true,
        response_kind: {
          id: 3,
          type: 'Responses'
        },
        quiz: {
          id: 2,
          name: 'Pricing'
        }
      },
      {
        id: 2,
        question: 'How much will you spend during your trip',
        is_boolean: false,
        step: 2,
        is_text: true,
        is_required: true,
        response_kind: {
          id: 3,
          type: 'Responses'
        },
        quiz: {
          id: 2,
          name: 'Pricing'
        }
      }
    ];
    (QuizLine.findByPk as jest.Mock).mockResolvedValue(mockQuizLines);

    const result = await controller.one(1);

    expect(QuizLine.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizLines);
  });

  it('should create a new quiz', async () => {
    const mockQuiz = {
      id: 1,
      question: 'A quelle frequence vous voyagez ?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 3
    };
    (QuizLine.create as jest.Mock).mockResolvedValue(mockQuiz);

    const result = await controller.new({
      question: 'A quelle frequence vous voyagez ?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 3
    });

    expect(QuizLine.create).toHaveBeenCalledWith({
      question: 'A quelle frequence vous voyagez ?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      tag_id: 1,
      quiz_id: 2,
      response_kind_id: 3
    });

    expect(result).toEqual(mockQuiz);
  });
});
