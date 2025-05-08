import { RequestHandler, Router } from 'express';
import CityController from '../controllers/CityController';
import CountryController from '../controllers/CountryController';
import { fetchImages } from '../services/countryImage';
import { get_city_fake } from '../Api/City';
import { apiOpenTrip } from '../services/OpenTripMap';
import { BodyCity, CityPosition, ResultCity, TargetImage, Ville } from '../interfaces/Globals';
import { capitalizeFirstLetter } from '../services/util';

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
    const body = <BodyCity>req.body;
    const country = await cityController.new(
      body.name,
      body.country,
      body.longitude,
      body.latitude,
      new Date(),
      new Date()
    );
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <BodyCity>req.body;
    const country = await cityController.update(
      parseInt(req.params.id, 10),
      body.name,
      body.country,
      body.longitude,
      body.latitude
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
  let result: ResultCity[] | [] = [];

  try {
    const body = <Ville>req.body;

    const prompt = `Dans ces/ce pays ${body.pays.join(',')} peux-tu me donné des villes qui ont ces/ce types d'activités : ${body.activity.join(', ')}, avec un description de la ville en 3 ligne sans virgule. Le réponse ne doit être une liste de ville avec le pays en format d'un array comme cette exemple {ville: ville1, pays: pays1, description : description1},{ville: ville2, pays: pays1, description : description2} ... et sans texte et saut de ligne`;

    const cityData = await countryController.getDataFromOpenAI(prompt);
    const arrayCity = cityData?.split('}');
    if (arrayCity !== undefined)
      for (const item of arrayCity) {
        if (item === '') break;
        const data = item.replace('[', '').replace(']', '').split(',');
        if (data[0] === '') {
          data.splice(0, 1);
        }
        const city = data[0].split(':')[1].trim();
        const country = data[1].split(':')[1].trim();
        const description = data[2].split(':')[1].trim();
        const cityPosition = (await apiOpenTrip('geoname', `name=${city}`)) as CityPosition;
        let image = null;
        await fetchImages(city, 'city')
          .then((e) => {
            if (e != undefined) {
              image = e.items[0].link;
            }
          })
          .catch((error) => {
            console.error('Error in /ai route:', error);
            res.status(404).json(error);
          });
        const getCountry = await countryController.getOneByName(capitalizeFirstLetter(country));
        const getCity = await cityController.getOneByName(capitalizeFirstLetter(city));
        result = [
          {
            pays: country,
            country_id: getCountry ? getCountry.id : null,
            city: city,
            city_id: getCity ? getCity.id : null,
            description: description,
            img_full: image,
            longitude: cityPosition.lat,
            latitude: cityPosition.lon
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

router.post('/city_image', (async (req, res) => {
  const body = <TargetImage>req.body;

  if (!body || !body.pays) {
    res.status(404).json({ error: 'No pays image.' });
  }

  let image = null;
  await fetchImages(body.pays, 'city').then((e) => {
    if (e != undefined) {
      image = e.items[0].link;
    }
  });

  res.json({ data: image });
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
