import ReviewController from '../controllers/reviewController';
import Review from '../../models/review';

jest.mock('../../models/review');

describe('ReviewController', () => {
  let controller: ReviewController;

  beforeEach(() => {
    controller = new ReviewController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all review', async () => {
    const mockReviews = [{ id: 1, comment: 'test', user_id: 2, activity_id: 2, rating_id: 5 }, { id: 2, comment: 'test2', user_id: 2, activity_id: 2, rating_id: 5 }];
    (Review.findAll as jest.Mock).mockResolvedValue(mockReviews);

    const result = await controller.list();

    expect(Review.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockReviews);
  });

  it('should get one review by id', async () => {
    const mockReviews = [{ id: 1, comment: 'test', user_id: 2, activity_id: 2, rating_id: 5 },{ id: 1, comment: 'test', user_id: 2, activity_id: 2, rating_id: 5 }, { id: 2, comment: 'test2', user_id: 2, activity_id: 2, rating_id: 5 }];
    (Review.findByPk as jest.Mock).mockResolvedValue(mockReviews);

    const result = await controller.one(2);

    expect(Review.findByPk).toHaveBeenCalledWith(2);
    expect(result).toEqual(mockReviews);
  });

  it('should create a new review', async () => {
    const mockReview = { id: 1, comment: 'test', user_id: 2, activity_id: 2, rating_id: 5 };
    (Review.create as jest.Mock).mockResolvedValue(mockReview);
    
    const data = { comment: 'test', user_id: 2, activity_id: 2, rating_id: 5 };
    const result = await controller.new(data as any);
  
    // Expect the entire data object to be passed to Review.create
    expect(Review.create).toHaveBeenCalledWith(data);
    expect(result).toEqual(mockReview);
  });

  it('should update an existing review', async () => {
    const mockReview = { id: 1, comment: 'test' as any, user_id: 2, activity_id: 2, rating_id: 5, save: jest.fn() };
    (Review.findByPk as jest.Mock).mockResolvedValue(mockReview);

    const result = await controller.update(1, 1, 5, 2, 'test' as any );

    expect(Review.findByPk).toHaveBeenCalledWith(1);
    expect(mockReview.save).toHaveBeenCalled();
    expect(mockReview.comment).toBe('test');
    expect(result).toEqual(mockReview);
  });

  it('should remove a review by id', async () => {
    const mockReview = {id: 1, comment: 'test' as any, user_id: 2, activity_id: 2, rating_id: 5,destroy: jest.fn() };
    (Review.findByPk as jest.Mock).mockResolvedValue(mockReview);

    const result = await controller.delete(1);

    expect(Review.findByPk).toHaveBeenCalledWith(1);
    expect(mockReview.destroy).toHaveBeenCalled();
    expect(result).toEqual('resource had been deleted');
  });
});
