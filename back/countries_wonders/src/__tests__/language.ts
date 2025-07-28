import LanguageController from '../controllers/LanguageController';
import Language from '../../models/language';

jest.mock('../../models/language');

describe('CountryController', () => {
  let controller: LanguageController;

  beforeEach(() => {
    controller = new LanguageController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date();
  const updated_at = new Date();

  it('should list all languages', async () => {
    const mockLanguages = [{ id: 1, name: 'Francais', code: 'fr' }];
    (Language.findAll as jest.Mock).mockResolvedValue(mockLanguages);

    const result = await controller.list();

    expect(Language.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockLanguages);
  });

  it('should get one language by id', async () => {
    const mockLanguage = { id: 1, name: 'Francais', code: 'fr' };
    (Language.findByPk as jest.Mock).mockResolvedValue(mockLanguage);

    const result = await controller.one(1);

    expect(Language.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockLanguage);
  });

  it('should create a new language', async () => {
    const mockLanguage = { id: 1, name: 'Francais', code: 'fr', created_at, updated_at };
    (Language.create as jest.Mock).mockResolvedValue(mockLanguage);

    const result = await controller.create('Francais', 'fr', created_at, updated_at);

    expect(Language.create).toHaveBeenCalledWith({ name: 'Francais', code: 'fr', created_at, updated_at });
    expect(result).toEqual(mockLanguage);
  });

  it('should update an existing language', async () => {
    const mockLanguage = { id: 1, name: 'France', code: 'fr', updated_at: updated_at, save: jest.fn() };
    (Language.findByPk as jest.Mock).mockResolvedValue(mockLanguage);

    const result = await controller.update(1, 'German', 'de', updated_at);

    expect(Language.findByPk).toHaveBeenCalledWith(1);
    expect(mockLanguage.save).toHaveBeenCalled();
    expect(mockLanguage.name).toBe('German');
    expect(mockLanguage.code).toBe('de');
    expect(result).toEqual(mockLanguage);
  });

  it('should remove a language by id', async () => {
    const mockLanguage = { id: 1, name: 'Francais', code: 'fr', destroy: jest.fn() };
    (Language.findByPk as jest.Mock).mockResolvedValue(mockLanguage);

    const result = await controller.delete(1);

    expect(Language.findByPk).toHaveBeenCalledWith(1);
    expect(mockLanguage.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockLanguage);
  });
});
