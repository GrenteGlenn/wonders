import ActivityCategoryController from '../controllers/activityCategoryController';
import ActivityCategory from '../../models/activityCategory';

jest.mock('../../models/activityCategory');

describe('ActivityController', () => {
  let controller: ActivityCategoryController;

  beforeEach(() => {
    controller = new ActivityCategoryController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all activity categories', async () => {
    const mockActivityCategories = [{ id: 1, name: 'sports aquatiques', picture_id: 2 },{ id: 2, name: 'Sport de montagne',  picture_id: 3 }];
    (ActivityCategory.findAll as jest.Mock).mockResolvedValue(mockActivityCategories);

    const result = await controller.list();

    expect(ActivityCategory.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockActivityCategories);
  });

  it('should get one activityCategory by id', async () => {
    const mockActivityCategories = [{ id: 1, name: 'sports aquatiques', picture_id: 2 },{ id: 2, name: 'Sport de montagne',  picture_id: 3 }];
    (ActivityCategory.findByPk as jest.Mock).mockResolvedValue(mockActivityCategories);

    const result = await controller.one(1);

    expect(ActivityCategory.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockActivityCategories);
  });

  it('should create a new activity category', async () => {
    const mockActivityCategory = { id: 1, name: 'sports aquatiques', picture_id: 2 };
    (ActivityCategory.create as jest.Mock).mockResolvedValue(mockActivityCategory);
    const data = {name: 'sports aquatiques', picture_id: 2};
    const result = await controller.new(data as any);

    expect(ActivityCategory.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockActivityCategory);
  });

  it('should update an existing activity category', async () => {
    const mockActivityCategory = { id: 1, name: 'sports aquatiques', picture_id: 2, save: jest.fn() };
    (ActivityCategory.findByPk as jest.Mock).mockResolvedValue(mockActivityCategory);

    const result = await controller.update(1,'sports de table',3  );

    expect(ActivityCategory.findByPk).toHaveBeenCalledWith(1);
    expect(mockActivityCategory.save).toHaveBeenCalled();
    expect(mockActivityCategory.name).toBe('sports de table');
    expect(result).toEqual(mockActivityCategory);
  });

  it('should remove a activity category by id', async () => {
    const mockActivityCategory = { id: 1, name: 'sports aquatiques', picture_id: 2, destroy: jest.fn() };
    (ActivityCategory.findByPk as jest.Mock).mockResolvedValue(mockActivityCategory);

    const result = await controller.delete(1);

    expect(ActivityCategory.findByPk).toHaveBeenCalledWith(1);
    expect(mockActivityCategory.destroy).toHaveBeenCalled();
    expect(result).toEqual('resource had been deleted');
  });
});
