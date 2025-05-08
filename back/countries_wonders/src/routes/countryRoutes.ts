import { RequestHandler, Router } from 'express';
import CountryController from '../controllers/CountryController';
import { fetchImages } from '../services/countryImage';
import { get_country_fake } from '../Api/Country';
import { BodyCountry, Pays, ResultCountry, TargetImage } from '../interfaces/Globals';
import { fetchImagesWithCache, getOpenAIDescription } from '../services/ratelimite';
import countryModel from '../../models/country';
import { capitalizeFirstLetter } from '../services/util';

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
    const body = <BodyCountry>req.body;
    const country = await countryController.new(
      body.name,
      body.code,
      body.description,
      body.image,
      body.language,
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

// router.post('/ai', (async (req, res) => {
//   try {
//     const body = <BodyCountry>req.body;

//     const prompt = `Je souhaite visiter ${body.name}. Peux-tu me donner des informations intéressantes sur ce pays,
//              telles que les monuments célèbres, la culture locale, la gastronomie typique, ainsi que les activités incontournables ?
//              Peux-tu également donner le lien officiel de l'office de tourisme du pays.
//               Mentionne aussi ce pour quoi ce pays est particulièrement connu. Donne moi également des conseils de sécurité si le pays fait objet de violences,
//             guerres, conflits. Le résumé ne doit pas dépasser les 3000 caractères.`;

//     const countryData = await getOpenAIDescription(prompt, country.name);
//     res.json({ data: countryData });
//   } catch (error) {
//     console.error('Error in /ai route :', error);
//     res.status(500).json({ error: error });
//   }
// }) as RequestHandler);

router.post('/ai', (async (req, res) => {
  try {
    const body = <BodyCountry>req.body;

    const prompt = `Je souhaite visiter ${body.name}. Peux-tu me donner des informations intéressantes sur ce pays,
             telles que les monuments célèbres, la culture locale, la gastronomie typique, ainsi que les activités incontournables ?
             Peux-tu également donner le lien officiel de l'office de tourisme du pays.
             Mentionne aussi ce pour quoi ce pays est particulièrement connu. Donne moi également des conseils de sécurité si le pays fait objet de violences,
             guerres, conflits. Le résumé ne doit pas dépasser les 3000 caractères.`;

    const descriptionAI = await getOpenAIDescription(prompt, body.name);
    const imageAI = await fetchImagesWithCache(body.name, 'country');

    // Met à jour le pays si trouvé
    const country = await countryModel.findOne({ where: { name: body.name } });

    if (country) {
      country.description = descriptionAI ?? 'Aucune description disponible.';
      country.image = imageAI ?? '';
      country.updated_at_description = new Date();
      await country.save();

      return res.json({
        data: {
          description_ai: country.description,
          image_ai: country.image
        }
      });
    } else {
      return res.status(404).json({ error: `Pays '${body.name}' introuvable.` });
    }
  } catch (error) {
    console.error('Erreur dans /ai :', error);
    return res.status(500).json({ error: error });
  }
}) as RequestHandler);

router.post('/ai_get_country', (async (req, res) => {
  let result: ResultCountry[] | [] = [];

  try {
    const body = <Pays>req.body;

    const populaire = body.populaire ? `Qui est une destination populaire.` : `Qui est une destination populaire.`;
    const prompt =
      `Je souhaite visiter un ou des pays qui parle ${body.langue.join(', ')}. 
      Qui a un climat ${body.climat}. 
      Qui a des paysage de type ${body.paysage}. 
      Qui propose ce type d'activité : ${body.activity.join(', ')}.` +
      populaire +
      `le prix par semaine ne doit pas depasser les ${body.budget} euros pour 7 jours et la durée ne doit pas depasser les ${body.duration} jours.
      Le réponse ne doit être une liste de pays en format d'un array comme cette exemple [pays1, pays2 ...] sans texte`;

    const countryData = await countryController.getDataFromOpenAI(prompt);

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
        const getCountry = await countryController.getOneByName(capitalizeFirstLetter(element.trim()));
        result = [
          {
            pays: element.trim(),
            country_id: getCountry ? getCountry.id : null,
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

router.post('/country_image', (async (req, res) => {
  const body = <TargetImage>req.body;

  if (!body || !body.pays) {
    res.status(404).json({ error: 'No pays image.' });
  }
  // eslint-disable-next-line
  let image = null;

  await fetchImages(body.pays, 'city').then((e) => {
    if (e != undefined) {
      image = e.items[0].link;
    }
  });

  try {
    const image = await fetchImagesWithCache(body.pays, 'city');
    res.json({ data: image });
  } catch (error) {
    console.error('Error fetching image:', error);
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
    const body = <BodyCountry>req.body;
    const country = await countryController.update(
      parseInt(req.params.id, 10),
      body.name,
      body.code,
      body.description,
      body.image,
      body.language,
      body.longitude,
      body.latitude,
      new Date()
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

router.post('/refreshAi', (async (_req, res) => {
  try {
    const countries = await countryController.list();
    const updated: string[] = [];

    for (const country of countries) {
      if (country.description && country.image) continue;

      const prompt = `Je souhaite visiter ${country.name}. Peux-tu me donner des informations intéressantes sur ce pays,
        telles que les monuments célèbres, la culture locale, la gastronomie typique, ainsi que les activités incontournables ?
        Peux-tu également donner le lien officiel de l'office de tourisme du pays.
        Mentionne aussi ce pour quoi ce pays est particulièrement connu. Donne moi également des conseils de sécurité si le pays fait objet de violences,
        guerres, conflits. Le résumé ne doit pas dépasser les 3000 caractères.`;

      const description = await getOpenAIDescription(prompt, country.name);
      const image = await fetchImagesWithCache(country.name, 'country');

      if (description) country.description = description;
      if (image) country.image = image;
      country.updated_at_description = new Date();

      await country.save();
      updated.push(country.name);
    }

    return res.json({ message: `Mise à jour terminée pour ${updated.length} pays`, updated });
  } catch (error) {
    console.error('Erreur dans /refresh-ai :', error);
    res.status(500).json({ error: 'Erreur serveur lors du préchargement.' });
  }
}) as RequestHandler);

export default router;
