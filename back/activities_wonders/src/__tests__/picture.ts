import PictureController from '../controllers/pictureController';
import Picture from '../../models/picture';

jest.mock('../../models/picture');

describe('PictureController', () => {
  let controller: PictureController;

  beforeEach(() => {
    controller = new PictureController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all pictures', async () => {
    const mockPictures = [{ id: 1, path: 'test' }];
    (Picture.findAll as jest.Mock).mockResolvedValue(mockPictures);

    const result = await controller.list();

    expect(Picture.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockPictures);
  });

  it('should get one picture by id', async () => {
    const mockPictures = { id: 1, path: 'test' };
    (Picture.findByPk as jest.Mock).mockResolvedValue(mockPictures);

    const result = await controller.one(1);

    expect(Picture.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockPictures);
  });

  it('should create a new picture', async () => {
    const mockPictures = { id: 1, path: 'test' };
    (Picture.create as jest.Mock).mockResolvedValue(mockPictures);
    const data = { path: 'test' };
    const result = await controller.new(data);

    expect(Picture.create).toHaveBeenCalledWith({ path: 'test' });
    expect(result).toEqual(mockPictures);
  });

  it('should update an existing picture', async () => {
    const mockPicture = { id: 1, path: 'test', save: jest.fn() };
    (Picture.findByPk as jest.Mock).mockResolvedValue(mockPicture);

    const result = await controller.update(1, 'test');

    expect(Picture.findByPk).toHaveBeenCalledWith(1);
    expect(mockPicture.save).toHaveBeenCalled();
    expect(mockPicture.path).toBe('test');
    expect(result).toEqual(mockPicture);
  });

  it('should remove a picture by id', async () => {
    const mockPicture = { id: 1, path: 'test', destroy: jest.fn() };
    (Picture.findByPk as jest.Mock).mockResolvedValue(mockPicture);

    const result = await controller.delete(1);

    expect(Picture.findByPk).toHaveBeenCalledWith(1);
    expect(mockPicture.destroy).toHaveBeenCalled();
    expect(result).toEqual('resource had been deleted');
  });
});
