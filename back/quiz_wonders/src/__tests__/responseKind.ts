import ResponseKind from '../models/responsekind';
import ResponseKindController from '../controllers/ResponseKindController';

jest.mock('../models/responsekind');

describe('ResponseKindController', () => {
  let controller: ResponseKindController;

  beforeEach(() => {
    controller = new ResponseKindController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date;
  const updated_at = new Date;

  it('should list all responses kinds', async () => {
    const mockResponseKinds = [
      {
        id: 1,
        type: 'Boolean'
      },
      {
        id: 2,
        type: 'Text'
      },
      {
        id: 3,
        type: 'Responses'
      }
    ];

    (ResponseKind.findAll as jest.Mock).mockResolvedValue(mockResponseKinds);

    const result = await controller.list();

    expect(ResponseKind.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponseKinds);
  });

  it('should list a response kind by id', async () => {
    const mockResponseKinds = [
      {
        id: 1,
        type: 'Boolean'
      },
      {
        id: 2,
        type: 'Text'
      },
      {
        id: 3,
        type: 'Responses'
      }
    ];

    (ResponseKind.findByPk as jest.Mock).mockResolvedValue(mockResponseKinds);
    const result = await controller.one(2);

    expect(ResponseKind.findByPk).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockResponseKinds);
  });

  it('should create a new response kind', async () => {
    const mockResponseKind = {
      id: 1,
      type: 'Boolean',
      created_at: created_at,
      updated_at: updated_at
    };

    (ResponseKind.create as jest.Mock).mockResolvedValue(mockResponseKind);

    const result = await controller.new('boolean', created_at, updated_at);

    expect(ResponseKind.create).toHaveBeenCalledWith({ type: 'boolean', created_at: created_at, updated_at: updated_at});
    expect(result).toEqual(mockResponseKind);
  });

  it('should update an response kind', async () => {
    const mockResponseKind = {
      id: 1,
      type: 'Boolean',
      created_at,
      updated_at,
      save: jest.fn()
    };

    (ResponseKind.findByPk as jest.Mock).mockResolvedValue(mockResponseKind);

    const result = await controller.update(1, 'boolean22222', created_at, updated_at);

    expect(ResponseKind.findByPk).toHaveBeenCalledWith(1);
    expect(mockResponseKind.save).toHaveBeenCalled();
    expect(mockResponseKind.type).toBe('boolean22222');
    expect(result).toEqual(mockResponseKind);
  });

  it('should remove a response kind by id', async () => {
    const mockResponseKind = {
      id: 1,
      type: 'Boolean',
      destroy: jest.fn()
    };
    (ResponseKind.findByPk as jest.Mock).mockResolvedValue(mockResponseKind);

    const result = await controller.remove(1);

    expect(ResponseKind.findByPk).toHaveBeenCalledWith(1);
    expect(mockResponseKind.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockResponseKind);
  });
});
