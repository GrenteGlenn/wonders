import OrganizationUrl from '../models/organizationurl';
import OrganizationUrlController from '../controllers/OrganizationUrlController';

jest.mock('../models/organizationurl');

describe('OrganizationUrlController', () => {
  let controller: OrganizationUrlController;

  beforeEach(() => {
    controller = new OrganizationUrlController();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const created_at = new Date;
  const updated_at = new Date;

  it('should list all organization URLs', async () => {
    const mockOrganizationUrls = [
      {
        id: 1,
        url: 'https://example.com',
        organization_id: 1,
        rank: 1,
        partner: 'partner1',
        status_id: 1,
        key: 'key1'
      }
    ];
    (OrganizationUrl.findAll as jest.Mock).mockResolvedValue(mockOrganizationUrls);

    const result = await controller.list();

    expect(OrganizationUrl.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockOrganizationUrls);
  });

  it('should get one organization URL by id', async () => {
    const mockOrganizationUrl = {
      id: 1,
      url: 'https://example.com',
      organization_id: 1,
      rank: 1,
      partner: 'partner1',
      status_id: 1,
      key: 'key1'
    };
    (OrganizationUrl.findByPk as jest.Mock).mockResolvedValue(mockOrganizationUrl);

    const result = await controller.one(1);

    expect(OrganizationUrl.findByPk).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockOrganizationUrl);
  });

  it('should create a new organization URL', async () => {
    const mockOrganizationUrl = {
      id: 1,
      url: 'https://www.getyourguide.fr/oxford-l441/oxford-visite-de-l-universite-et-de-la-ville-t92427/?ranking_uuid=348b6aa6-103f-4be4-a57d-386c46cc8f25',
      organization_id: 1,
      rank: 1,
      partner: 'getyourguide',
      status_id: 1,
      key: '348b6aa6-103f-4be4-a57d-386c46cc8f25',
      updated_at,
      created_at
    };
    (OrganizationUrl.create as jest.Mock).mockResolvedValue(mockOrganizationUrl);

    const result = await controller.create(
      'https://www.getyourguide.fr/oxford-l441/oxford-visite-de-l-universite-et-de-la-ville-t92427/?ranking_uuid=348b6aa6-103f-4be4-a57d-386c46cc8f25',
      1,
      1,
      'getyourguide',
      1,
      '348b6aa6-103f-4be4-a57d-386c46cc8f25',
      updated_at,
      created_at
    );

    expect(OrganizationUrl.create).toHaveBeenCalledWith({
      url: 'https://www.getyourguide.fr/oxford-l441/oxford-visite-de-l-universite-et-de-la-ville-t92427/?ranking_uuid=348b6aa6-103f-4be4-a57d-386c46cc8f25',
      organization_id: 1,
      rank: 1,
      partner: 'getyourguide',
      status_id: 1,
      key: '348b6aa6-103f-4be4-a57d-386c46cc8f25',
      updated_at,
      created_at
    });
    expect(result).toEqual(mockOrganizationUrl);
  });

  it('should update an existing organization URL', async () => {
    const mockOrganizationUrl = {
      id: 1,
      url: 'https://example.com',
      organization_id: 1,
      rank: 1,
      partner: 'partner1',
      status_id: 1,
      key: 'key1',
      updated_at: created_at,
      created_at: created_at,
      save: jest.fn().mockResolvedValue(true)
    };
    (OrganizationUrl.findByPk as jest.Mock).mockResolvedValue(mockOrganizationUrl);

    const result = await controller.update(
      1,
      'https://www.getyourguide.fr/oxford-l441/oxford-visite-de-l-universite-et-de-la-ville-t92427/?ranking_uuid=348b6aa6-103f-4be4-a57d-386c46cc8f25',
      1,
      1,
      'getyourguide',
      '348b6aa6-103f-4be4-a57d-386c46cc8f25',
    );

    expect(OrganizationUrl.findByPk).toHaveBeenCalledWith(1);

    expect(mockOrganizationUrl.save).toHaveBeenCalled();

    expect(mockOrganizationUrl.url).toBe(
      'https://www.getyourguide.fr/oxford-l441/oxford-visite-de-l-universite-et-de-la-ville-t92427/?ranking_uuid=348b6aa6-103f-4be4-a57d-386c46cc8f25'
    );
    expect(mockOrganizationUrl.partner).toBe('getyourguide');
    expect(mockOrganizationUrl.key).toBe('348b6aa6-103f-4be4-a57d-386c46cc8f25');

    expect(result).toEqual(mockOrganizationUrl);
  });

  it('should remove an organization URL by id', async () => {
    const mockOrganizationUrl = {
      id: 1,
      url: 'https://example.com',
      organization_id: 1,
      rank: 1,
      partner: 'partner1',
      status_id: 1,
      key: 'key1',
      destroy: jest.fn().mockResolvedValue(true)
    };
    (OrganizationUrl.findByPk as jest.Mock).mockResolvedValue(mockOrganizationUrl);

    const result = await controller.delete(1);

    expect(OrganizationUrl.findByPk).toHaveBeenCalledWith(1);
    expect(mockOrganizationUrl.destroy).toHaveBeenCalled();
    expect(result).toEqual(mockOrganizationUrl);
  });
});
