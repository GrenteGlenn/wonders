import { RequestHandler, Router } from 'express';
import FlyController from '../controllers/FlyController';
import { getFlightOffers } from '../services/Amadeus';
import { z } from 'zod';
import { FlightOfferSchema } from '../interface/Global';

const FlyParamsSchema = z.object({
  originLocationCode: z.string().length(3).toUpperCase(),
  destinationLocationCode: z.string().length(3).toUpperCase(),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  returnDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  adults: z.string().default('2'),
  children: z.string().optional(),
  nonStop: z.boolean().default(false).optional(),
  maxPrice: z.number().positive().optional()
});

const router = Router();

const flyController = new FlyController();

router.get('/', ((req, res) => {
  try {
    const fly = flyController.list();
    res.json(fly);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

// router.get('/list', (async (req, res) => {
//   try {
//     const validationResult = FlyParamsSchema.safeParse(req.query);

//     if (!validationResult.success) {
//       return res.status(400).json({
//         status: 'error',
//         message: 'Paramètres de recherche invalides',
//         errors: validationResult.error.format()
//       });
//     }

//     const {
//       originLocationCode,
//       destinationLocationCode,
//       departureDate,
//       returnDate,
//       adults,
//       children,
//       nonStop,
//       maxPrice
//     } = validationResult.data;

//     const flightOffers = (await getFlightOffers(
//       originLocationCode,
//       destinationLocationCode,
//       departureDate,
//       returnDate,
//       adults,
//       children,
//       nonStop,
//       maxPrice
//     )) as typeof FlightOfferSchema;

//     const validatedOffers = z.array(FlightOfferSchema).parse(flightOffers);

//     return res.status(200).json({
//       status: 'success',
//       results: validatedOffers.length,
//       data: validatedOffers
//     });
//   } catch (error) {
//     res.json({ error: error });
//   }
// }) as RequestHandler);

router.get('/list', (async (req, res) => {
  try {    
  
    // cast manuellement 
    const {
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      nonStop,
      maxPrice
    } = req.query;

    const flightOffers = (await getFlightOffers(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      adults,
      children,
      nonStop,
      maxPrice
    )) as typeof FlightOfferSchema;


    const parsedQuery = {
      originLocationCode: typeof originLocationCode === 'string' ? originLocationCode.toUpperCase() : undefined,
      destinationLocationCode: typeof destinationLocationCode === 'string' ? destinationLocationCode.toUpperCase() : undefined,
      departureDate: typeof departureDate === 'string' ? departureDate : undefined,
      returnDate: typeof returnDate === 'string' ? returnDate : undefined,
      adults: typeof adults === 'string' ? adults : '2',
      children: typeof children === 'string' ? children : undefined,
      nonStop: typeof nonStop === 'string' ? nonStop === 'true' : false,
      maxPrice: typeof maxPrice === 'string' && !isNaN(Number(maxPrice)) ? Number(maxPrice) : undefined
    };

    const validationResult = FlyParamsSchema.safeParse(parsedQuery);

    if (!validationResult.success) {
      return res.status(400).json({
        status: 'error',
        message: 'Paramètres de recherche invalides',
        errors: validationResult.error.format()
      });
    }
    const validatedOffers = z.array(FlightOfferSchema).parse(flightOffers);
    console.log('REQ QUERY', req.query);


    return res.status(200).json({
      status: 'success',
      results: validatedOffers.length,
      data: validatedOffers
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
}) as RequestHandler);


export default router;
