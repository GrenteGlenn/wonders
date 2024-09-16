import Tag from '../models/tag';
import TagController from '../controllers/TagController';

jest.mock('../models/tag');

describe('TagController', () => {
  let controller: TagController;

  beforeEach(() => {
    controller = new TagController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date;
  const updated_at = new Date;

  it('should list all tags', async () => {
    const mockTags = [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' }
    ];

    (Tag.findAll as jest.Mock).mockResolvedValue(mockTags);

    const result = await controller.list();

    expect(Tag.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTags);
  });

  it('should get one tag by id', async () => {
    const mockTags = [
      { id: 1, name: 'test1' },
      { id: 2, name: 'test2' }
    ];

    (Tag.findByPk as jest.Mock).mockResolvedValue(mockTags);

    const result = await controller.one(1);

    expect(Tag.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockTags);
  });

  it('should create a new tag', async () => {
    const mockTags = [{ id: 1, name: 'test1', created_at: created_at, updated_at: updated_at }];

    (Tag.create as jest.Mock).mockResolvedValue(mockTags);

    const result = await controller.new('test1', created_at, updated_at);

    expect(Tag.create).toHaveBeenCalledWith({ name: 'test1', created_at: created_at, updated_at: updated_at });
    expect(result).toEqual(mockTags);
  });

  it('should update a tag', async () => {
    const mockTag = { id: 1, name: 'test1',  created_at: created_at, updated_at: updated_at, save: jest.fn() };
    (Tag.findByPk as jest.Mock).mockResolvedValue(mockTag);

    const result = await controller.update(1, 'test2', created_at, updated_at);

    expect(Tag.findByPk).toHaveBeenCalledWith(1);
    expect(mockTag.save).toHaveBeenCalled();
    expect(mockTag.name).toBe('test2');
    expect(result).toEqual(mockTag);
  });

  it('should delete a tag', async () => {
    const mockTags = { id: 1, name: 'test1', destroy: jest.fn() };
    (Tag.findByPk as jest.Mock).mockResolvedValue(mockTags);

    const result = await controller.remove(1);

    expect(Tag.findByPk).toHaveBeenCalledWith(1);
    expect(mockTags.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockTags);
  });
});
