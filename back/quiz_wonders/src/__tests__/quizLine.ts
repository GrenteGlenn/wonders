import QuizLine from '../../models/quizline';
import Quiz from '../../models/quiz';
import ResponseKind from '../../models/responsekind';
import QuizLineController from '../controllers/QuizLineController';

// Mock des modèles
jest.mock('../../models/quizline');
jest.mock('../../models/quiz');
jest.mock('../../models/responsekind');

describe('QuizLineController', () => {
  let controller: QuizLineController;

  beforeEach(() => {
    controller = new QuizLineController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all quiz lines with their relations', async () => {
    const mockQuizLines = [
      {
        id: 1,
        question: 'How often do you travel?',
        is_boolean: false,
        step: 1,
        is_text: true,
        is_required: true,
        response_kind: { id: 3, type: 'Responses' },
        quiz: { id: 2, name: 'Travel Quiz' },
        childrens: []
      },
      {
        id: 2,
        question: 'What is your budget?',
        is_boolean: false,
        step: 2,
        is_text: true,
        is_required: true,
        response_kind: { id: 3, type: 'Responses' },
        quiz: { id: 2, name: 'Travel Quiz' },
        childrens: []
      }
    ];
    (QuizLine.findAll as jest.Mock).mockResolvedValue(mockQuizLines);

    const result = await controller.list();

    expect(QuizLine.findAll).toHaveBeenCalledTimes(1);
    expect(QuizLine.findAll).toHaveBeenCalledWith({
      include: [
        { model: ResponseKind, as: 'response_kind' },
        { model: Quiz, as: 'quiz' },
        { model: QuizLine, as: 'childrens', required: false }
      ]
    });
    expect(result).toEqual(mockQuizLines);
  });

  it('should get a specific quiz line by id with relations', async () => {
    const mockQuizLine = {
      id: 1,
      question: 'How often do you travel?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      response_kind: { id: 3, type: 'Responses' },
      quiz: { id: 2, name: 'Travel Quiz' },
      ParentQuizLine: null
    };
    (QuizLine.findByPk as jest.Mock).mockResolvedValue(mockQuizLine);

    const result = await controller.one(1);

    expect(QuizLine.findByPk).toHaveBeenCalledTimes(1);
    expect(QuizLine.findByPk).toHaveBeenCalledWith(1, {
      include: [
        { model: ResponseKind, as: 'response_kind' },
        { model: Quiz, as: 'quiz' },
        { model: QuizLine, as: 'ParentQuizLine', required: false, foreignKey: 'parent' }
      ]
    });
    expect(result).toEqual(mockQuizLine);
  });

  it('should create a new quiz line', async () => {
    const mockQuizLine = {
      id: 1,
      question: 'How often do you travel?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      quiz_id: 2,
      response_kind_id: 3
    };
    const inputData = {
      question: 'How often do you travel?',
      is_boolean: false,
      step: 1,
      is_text: true,
      is_required: true,
      mutiple_type_answer: false,
      parent: undefined,
      response_kind_id: 3,
      quiz_id: 2
    };
    (QuizLine.create as jest.Mock).mockResolvedValue(mockQuizLine);

    const result = await controller.new(inputData);

    expect(QuizLine.create).toHaveBeenCalledTimes(1);
    expect(QuizLine.create).toHaveBeenCalledWith(inputData);
    expect(result).toEqual(mockQuizLine);
  });

  it('should update an existing quiz line', async () => {
    const mockQuizLine = {
      id: 1,
      question: 'How often do you travel?',
      is_required: true,
      is_text: true,
      is_boolean: false,
      mutiple_type_answer: false,
      response_kind_id: 3,
      parent: undefined,
      quiz_id: 2,
      step: 1,
      save: jest.fn()
    };
    (QuizLine.findByPk as jest.Mock).mockResolvedValue(mockQuizLine);

    const result = await controller.update(
      1,
      2,
      'Updated Question',
      true,
      false,
      true,
      true,
      undefined,
      4,
      2
    );

    expect(QuizLine.findByPk).toHaveBeenCalledTimes(1);
    expect(QuizLine.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuizLine.save).toHaveBeenCalledTimes(1);
    expect(mockQuizLine.question).toBe('Updated Question');
    expect(mockQuizLine.is_text).toBe(false);
    expect(mockQuizLine.is_boolean).toBe(true);
    expect(mockQuizLine.response_kind_id).toBe(4);
    expect(result).toEqual(mockQuizLine);
  });

  it('should delete a quiz line by id', async () => {
    const mockQuizLine = {
      id: 1,
      question: 'How often do you travel?',
      destroy: jest.fn()
    };
    (QuizLine.findByPk as jest.Mock).mockResolvedValue(mockQuizLine);

    const result = await controller.remove(1);

    expect(QuizLine.findByPk).toHaveBeenCalledTimes(1);
    expect(QuizLine.findByPk).toHaveBeenCalledWith(1);
    expect(mockQuizLine.destroy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockQuizLine);
  });
});
