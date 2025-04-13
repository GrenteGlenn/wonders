import { z } from 'zod';

// Schéma pour les segments de vol
const SegmentSchema = z.object({
  departure: z.object({
    iataCode: z.string(),
    terminal: z.string().optional(),
    at: z.string()
  }),
  arrival: z.object({
    iataCode: z.string(),
    terminal: z.string().optional(),
    at: z.string()
  }),
  carrierCode: z.string(),
  number: z.string(),
  aircraft: z
    .object({
      code: z.string()
    })
    .optional(),
  operating: z
    .object({
      carrierCode: z.string()
    })
    .optional(),
  duration: z.string().optional(),
  id: z.string().optional(),
  numberOfStops: z.number().optional(),
  blacklistedInEU: z.boolean().optional()
});

// Schéma pour les itinéraires
const ItinerarySchema = z.object({
  duration: z.string(),
  segments: z.array(SegmentSchema)
});

// Schéma pour les frais
const FeeSchema = z.object({
  amount: z.string(),
  type: z.string()
});

// Schéma pour le prix
const PriceSchema = z.object({
  currency: z.string(),
  total: z.string(),
  base: z.string(),
  fees: z.array(FeeSchema),
  grandTotal: z.string()
});

// Schéma pour les options de tarification
const PricingOptionsSchema = z.object({
  fareType: z.array(z.string()),
  includedCheckedBagsOnly: z.boolean()
});

// Schéma pour les informations de bagages
const BaggageAllowanceSchema = z.object({
  quantity: z.number().optional(),
  weight: z.number().optional(),
  weightUnit: z.string().optional()
});

// Schéma pour les détails de tarif par segment
const FareDetailsBySegmentSchema = z.object({
  segmentId: z.string(),
  cabin: z.string(),
  fareBasis: z.string().optional(),
  brandedFare: z.string().optional(),
  class: z.string().optional(),
  includedCheckedBags: BaggageAllowanceSchema.optional()
});

// Schéma pour les informations de tarification par voyageur
const TravelerPricingSchema = z.object({
  travelerId: z.string(),
  fareOption: z.string(),
  travelerType: z.string(),
  price: z.object({
    currency: z.string(),
    total: z.string(),
    base: z.string()
  }),
  fareDetailsBySegment: z.array(FareDetailsBySegmentSchema).optional()
});

// Schéma principal pour l'offre de vol
const FlightOfferSchema = z.object({
  type: z.literal('flight-offer'),
  id: z.string(),
  source: z.string(),
  instantTicketingRequired: z.boolean(),
  nonHomogeneous: z.boolean(),
  oneWay: z.boolean(),
  isUpsellOffer: z.boolean(),
  lastTicketingDate: z.string(),
  lastTicketingDateTime: z.string(),
  numberOfBookableSeats: z.number(),
  itineraries: z.array(ItinerarySchema),
  price: PriceSchema,
  pricingOptions: PricingOptionsSchema,
  validatingAirlineCodes: z.array(z.string()),
  travelerPricings: z.array(TravelerPricingSchema)
});

// Schéma pour une liste d'offres de vol
const FlightOffersSchema = z.array(FlightOfferSchema);

// Types inférés à partir des schémas
type FlightOffer = z.infer<typeof FlightOfferSchema>;
type FlightOffers = z.infer<typeof FlightOffersSchema>;

// Fonction utilitaire pour valider les données d'API
function validateFlightOffers(data: unknown): FlightOffers {
  try {
    return FlightOffersSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Erreur de validation:', error.format());
    }
    throw error;
  }
}

// Schéma Zod pour "geoCode"
const GeoCodeSchema = z.object({
  latitude: z.number(),
  longitude: z.number()
});

// Schéma Zod pour "address"
const AddressSchema = z.object({
  countryCode: z.string().length(2) // En supposant que le code pays est toujours de longueur 2 (ex: "FR")
});

// Schéma Zod pour "distance"
const DistanceSchema = z.object({
  value: z.number(),
  unit: z.enum(['KM', 'MILE']) // Je mets "KM" et "MILE" comme exemples d'unités possibles
});

// Schéma Zod pour l'objet principal (chaque hôtel)
const HotelSchema = z.object({
  chainCode: z.string(),
  iataCode: z.string().length(3), // Code IATA à 3 lettres
  dupeId: z.number(),
  name: z.string(),
  hotelId: z.string(),
  geoCode: GeoCodeSchema,
  address: AddressSchema,
  distance: DistanceSchema,
  lastUpdate: z.string()
});

const HotelOffersSchema = z.object({
  type: z.literal('hotel-offers'),
  hotel: z.object({
    type: z.literal('hotel'),
    hotelId: z.string(),
    chainCode: z.string(),
    dupeId: z.string(),
    name: z.string(),
    cityCode: z.string(),
    latitude: z.number(),
    longitude: z.number()
  }),
  available: z.boolean(),
  offers: z.array(
    z.object({
      id: z.string(),
      checkInDate: z.string(), // Peut être affiné avec z.string().refine(...) pour le format date
      checkOutDate: z.string(),
      rateCode: z.string(),
      boardType: z.string(),
      room: z.object({
        type: z.string(),
        typeEstimated: z.object({
          category: z.string(),
          beds: z.number(),
          bedType: z.string()
        }),
        description: z.object({
          text: z.string(),
          lang: z.string()
        })
      }),
      guests: z.object({
        adults: z.number()
      }),
      price: z.object({
        currency: z.string(),
        total: z.string(),
        variations: z.object({
          average: z.object({
            total: z.string()
          }),
          changes: z.array(
            z.object({
              startDate: z.string(),
              endDate: z.string(),
              base: z.string(),
              total: z.string()
            })
          )
        })
      }),
      policies: z.object({
        cancellations: z.array(
          z.object({
            numberOfNights: z.number(),
            deadline: z.string(),
            description: z.object({
              text: z.string()
            }),
            policyType: z.string()
          })
        ),
        holdTime: z.object({
          deadline: z.string()
        }),
        guarantee: z.object({
          acceptedPayments: z.object({
            creditCards: z.array(z.string()),
            methods: z.array(z.string()),
            creditCardPolicies: z.array(
              z.object({
                vendorCode: z.string()
              })
            )
          })
        }),
        paymentType: z.string(),
        refundable: z.object({
          cancellationRefund: z.string()
        })
      }),
      self: z.string().url()
    })
  ),
  self: z.string().url()
});

export {
  FlightOfferSchema,
  FlightOffersSchema,
  validateFlightOffers,
  HotelSchema,
  HotelOffersSchema,
  type FlightOffer,
  type FlightOffers
};
