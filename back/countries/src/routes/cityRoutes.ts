import { RequestHandler, Router } from 'express';
import CityController from '../controllers/CityController';
import CountryController from '../controllers/CountryController';
import { fetchImages } from '../services/countryImage';
import { get_city_fake } from '../Api/City';

interface Body {
  name: string;
  country: number;
  created_at: Date;
  updated_at: Date;
}

interface Ville {
  activity: Array<string>;
  pays: Array<string>;
}

const router = Router();

const cityController = new CityController();
const countryController = new CountryController();

router.get('/', (async (req, res) => {
  try {
    const cities = await cityController.list();
    res.json(cities);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const country = await cityController.one(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await cityController.new(body.name, body.country, new Date(), new Date());
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await cityController.update(
      parseInt(req.params.id, 10),
      body.name,
      body.country,
      new Date(),
      new Date()
    );
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const country = await cityController.remove(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/ai_get_city', (async (req, res) => {
  let result: any[] = [];

  try {
    const body = <Ville>req.body;
    console.log(body);

    const prompt = `Dans ces pays ${body.pays.join(',')} peux tu me donner des villes qui ont ces types d'activité : ${body.activity.join(', ')}. Le réponse ne doit être une liste de ville avec le pays en format d'un array comme cette exemple {ville: ville1, pays: pays1},{ville: ville2, pays: pays1} ... et sans texte et saut de ligne`;

    const cityData = await countryController.getDataFromOpenAI(prompt);
    const arrayCity = cityData?.split('}');
    if (arrayCity !== undefined)
      for (const item of arrayCity) {
        if (item === '') break;
        const data = item.split(',');
        if (data[0] === '') {
          data.splice(0, 1);
        }
        const city = data[0].split(':');
        const country = data[1].split(':');
        const image = await fetchImages(city[1], 'city');
        const value: Array<any> = image.items;
        result = [
          {
            pays: country,
            city: city,
            img_full: value[0].link
          },
          ...result
        ];
      }
    res.json({ data: result });
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.post('/ai_get_city_fake', ((req, res) => {
  const body = <Ville>req.body;

  try {
    const cityData = get_city_fake(body);

    res.status(200).json(cityData);
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

export default router;
