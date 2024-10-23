import { RequestHandler, Router } from 'express';
import CountryController from '../controllers/CountryController';

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

interface Ville {
  activity: Array<string>;
  pays: Array<string>;
}

interface Ai {
  country: string;
}

const router = Router();

const countryController = new CountryController();

router.get('/countries', (async (req, res) => {
  try {
    const countries = await countryController.list();
    res.json(countries);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/countries/:id', (async (req, res) => {
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

router.post('/countries', (async (req, res) => {
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
    console.log(body);

    const prompt = `Je souhaite visiter ${body.name}. Peux-tu me donner des informations intéressantes sur ce pays,
             telles que les monuments célèbres, la culture locale, la gastronomie typique, ainsi que les activités incontournables ?
             Peux-tu également donner le lien officiel de l'office de tourisme du pays.
              Mentionne aussi ce pour quoi ce pays est particulièrement connu. Donne moi également des conseils de sécurité si le pays fait objet de violences,
            guerres, conflits. Le résumé ne doit pas dépasser les 3000 caractères.`;

    const countryData = await countryController.getDataFromOpenAI(prompt);
    res.json({ data: countryData });
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error as any });
  }
}) as RequestHandler);

router.post('/ai_get_country', (async (req, res) => {
  try {
    const body = <Pays>req.body;
    console.log(body);

    const langue =`Je souhaite visiter un ou des pays qui parle ${body.langue.join(', ')}.`;
    const climat = `Qui a un climat ${body.climat}.`;
    const paysage = `Qui a des paysage de type ${body.paysage}.`;
    const activity = `Qui propose ce type d'activité : ${body.activity.join(', ')}.`;
    const populaire = body.populaire ? `Qui est une destination populaire.` : `Qui est une destination populaire.`;
    const prompt =
      langue +
      climat +
      paysage +
      activity +
      populaire +
      `Le réponse ne doit être une liste de pays en format d'un array comme cette exemple [pays1, pays2 ...]`;

    const countryData = await countryController.getDataFromOpenAI(prompt);
    res.json({ data: countryData });
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error as any });
  }
}) as RequestHandler);

router.post('/ai_get_city', (async (req, res) => {
  try {
    const body = <Ville>req.body;
    console.log(body);

    const prompt = `Dans ces pays ${body.pays.join(',')} peux tu me donner des villes qui ont ces types d'activité : ${body.activity.join(', ')}. Le réponse ne doit être une liste de ville avec le pays en format d'un array comme cette exemple [{ville: ville1, pays: pays1},{ville: ville2, pays: pays1} ...]`;

    const countryData = await countryController.getDataFromOpenAI(prompt);
    res.json({ data: countryData });
  } catch (error) {
    console.error('Error in /ai route:', error);
    res.status(500).json({ error: error as any });
  }
}) as RequestHandler);

router.put('/countries/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const country = await countryController.update(
      parseInt(req.params.id, 10),
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

router.delete('/countries/:id', (async (req, res) => {
  try {
    const country = await countryController.remove(parseInt(req.params.id, 10));
    res.json(country);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
