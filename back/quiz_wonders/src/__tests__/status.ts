import Status from '../models/status';
import StatusController from '../controllers/StatusController';

jest.mock('../models/status');

describe('QuizResponseController', () => {
  let controller: StatusController;

  beforeEach(() => {
    controller = new StatusController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it(' should list all status', async () => {
    const mockStatus = [
      {
        id: 1,
        name: 'done'
      },
      {
        id: 1,
        name: 'canceled'
      },
      {
        id: 1,
        name: 'in prgress'
      }
    ];
    (Status.findAll as jest.Mock).mockResolvedValue(mockStatus);

    const result = await controller.list();
    expect(Status.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockStatus);
  });

  it('should get one status by id', async () => {
    const mockStatus = { id: 1, name: 'done' };
    (Status.findByPk as jest.Mock).mockResolvedValue(mockStatus);

    const result = await controller.one(1);

    expect(Status.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockStatus);
  });

  it('should create a new status', async () => {
    const mockStatus = { id: 1, name: 'done' };
    (Status.create as jest.Mock).mockResolvedValue(mockStatus);

    const result = await controller.new('done');

    expect(Status.create).toHaveBeenCalledWith({ name: 'done' });
    expect(result).toEqual(mockStatus);
  });

  it('should update a status', async () => {
    const mockStatus = { id: 1, name: 'test', save: jest.fn() };
    (Status.findByPk as jest.Mock).mockResolvedValue(mockStatus);

    const result = await controller.update(1, 'test222');

    expect(Status.findByPk).toHaveBeenCalledWith(1);
    expect(mockStatus.save).toHaveBeenCalled();
    expect(mockStatus.name).toBe('test222');
    expect(result).toEqual(mockStatus);
  });

  it('shouls delete a status', async () => {
    const mockStatus = { id: 1, name: 'test', destroy: jest.fn() };
    (Status.findByPk as jest.Mock).mockResolvedValue(mockStatus);

    const result = await controller.remove(1);

    expect(Status.findByPk).toHaveBeenCalledWith(1);
    expect(mockStatus.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockStatus);
  });
});
