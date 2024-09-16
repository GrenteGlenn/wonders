import RatingController from '../controllers/ratingController';
import Rating from '../../models/rating';

jest.mock('../../models/rating');

describe('RatingController', () => {
  let controller: RatingController;

  beforeEach(() => {
    controller = new RatingController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all rating', async () => {
    const mockRatings = [{ id: 1, path: 'test' }];
    (Rating.findAll as jest.Mock).mockResolvedValue(mockRatings);

    const result = await controller.list();

    expect(Rating.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockRatings);
  });

  it('should get one rating by id', async () => {
    const mockRatings = { id: 1, path: 'test' };
    (Rating.findByPk as jest.Mock).mockResolvedValue(mockRatings);

    const result = await controller.one(1);

    expect(Rating.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockRatings);
  });

  it('should create a new picture', async () => {
    const mockRatings = { id: 1, path: 'test' };
    (Rating.create as jest.Mock).mockResolvedValue(mockRatings);
    const data = { rating: 3 };
    const result = await controller.new(data);

    expect(Rating.create).toHaveBeenCalledWith({ rating: 3 });
    expect(result).toEqual(mockRatings);
  });

  it('should update an existing rating', async () => {
    const mockRatings = { id: 1, rating: 1, save: jest.fn() };
    (Rating.findByPk as jest.Mock).mockResolvedValue(mockRatings);

    const result = await controller.update(1, 3);

    expect(Rating.findByPk).toHaveBeenCalledWith(1);
    expect(mockRatings.save).toHaveBeenCalled();
    expect(mockRatings.rating).toBe(3);
    expect(result).toEqual(mockRatings);
  });

  it('should remove a rating by id', async () => {
    const mockRating = { id: 1, rating: 3, destroy: jest.fn() };
    (Rating.findByPk as jest.Mock).mockResolvedValue(mockRating);

    const result = await controller.delete(1);

    expect(Rating.findByPk).toHaveBeenCalledWith(1);
    expect(mockRating.destroy).toHaveBeenCalled();
    expect(result).toEqual('resource had been deleted');
  });
});
