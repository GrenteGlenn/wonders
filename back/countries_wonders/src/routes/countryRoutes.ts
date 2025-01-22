import { RequestHandler, Router } from 'express';
import CountryController from '../controllers/CountryController';
import { fetchImages } from '../services/countryImage';
import { get_country_fake } from '../Api/Country';

interface Body {
  name: string;
  code: string;
  description: Text;
  image: string;
  language: number;
  created_at: Date;
  updated_at: Date;
  data: string;
}

interface Pays {
  langue: Array<string>;
  climat: string;
  paysage: string;
  activity: Array<string>;
  populaire: boolean;
}

interface Result {
  pays: string;
  img_full: string | null;
}

const router = Router();

const countryController = new CountryController();

router.get('/', (async (req, res) => {
  try {
    const countries = await countryController.list();
    res.json(countries);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const country = await countryController.one(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/country-description/:id', (async (req, res) => {
  try {
    const country = await countryController.getCountryDescription(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.new(
      body.name,
      body.code,
      body.description,
      body.image,
      body.language,
      new Date(),
      new Date()
    );
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/ai', (async (req, res) => {
  try {
    const body = <Body>req.body;

    const prompt = `Je souhaite visiter ${body.name}. Peux-tu me donner des informations intéressantes sur ce pays,
             telles que les monuments célèbres, la culture locale, la gastronomie typique, ainsi que les activités incontournables ?
             Peux-tu également donner le lien officiel de l'office de tourisme du pays.
              Mentionne aussi ce pour quoi ce pays est particulièrement connu. Donne moi également des conseils de sécurité si le pays fait objet de violences,
            guerres, conflits. Le résumé ne doit pas dépasser les 3000 caractères.`;

    const countryData = await countryController.getDataFromOpenAI(prompt);
    res.json({ data: countryData });
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.post('/ai_get_country', (async (req, res) => {
  let result: Result[] | [] = [];

  try {
    const body = <Pays>req.body;

    const populaire = body.populaire ? `Qui est une destination populaire.` : `Qui est une destination populaire.`;
    const prompt =
      `Je souhaite visiter un ou des pays qui parle ${body.langue.join(', ')}. 
      Qui a un climat ${body.climat}. 
      Qui a des paysage de type ${body.paysage}. 
      Qui propose ce type d'activité : ${body.activity.join(', ')}.` +
      populaire +
      `Le réponse ne doit être une liste de pays en format d'un array comme cette exemple [pays1, pays2 ...] sans texte`;

    const countryData = await countryController.getDataFromOpenAI(prompt);
    console.log(countryData);
    const arrayCountry = countryData?.replace('[', '').replace(']', '').split(',');
    if (arrayCountry !== undefined)
      for (const element of arrayCountry) {
        let image = null;
        await fetchImages(element, 'country')
          .then((e) => {
            if (e != undefined) {
              image = e.items[0].link;
            }
          })
          .catch((error) => {
            console.error('Error in /ai route:', error);
            res.status(404).json(error);
          });
        result = [
          {
            pays: element.trim(),
            img_full: image
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

router.post('/ai_get_country_fake', ((req, res) => {
  const body = <Pays>req.body;
  try {
    const countryData = get_country_fake(body);

    res.status(200).json(countryData);
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.update(
      parseInt(req.params.id, 10),
      body.name,
      body.code,
      body.description,
      body.image,
      body.language
    );
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const country = await countryController.remove(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
