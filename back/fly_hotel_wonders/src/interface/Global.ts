import { z } from 'zod';

const airportSchema = z.object({
  iataCode: z.string(),
  terminal: z.string().optional(),
  at: z.string()
});

const segmentSchema = z.object({
  departure: airportSchema,
  arrival: airportSchema,
  carrierCode: z.string(),
  number: z.string(),
  aircraft: z.object({ code: z.string() }),
  operating: z
    .object({
      carrierCode: z.string().optional()
    })
    .optional(),
  duration: z.string(),
  id: z.string(),
  numberOfStops: z.number(),
  blacklistedInEU: z.boolean()
});

const itinerarySchema = z.object({
  duration: z.string(),
  segments: z.array(segmentSchema)
});

const feeSchema = z.object({ amount: z.string(), type: z.string() });

const priceSchema = z.object({
  currency: z.string(),
  total: z.string(),
  base: z.string(),
  fees: z.array(feeSchema),
  grandTotal: z.string(),
  additionalServices: z.array(feeSchema).optional()
});

const pricingOptionsSchema = z.object({
  fareType: z.array(z.string()),
  includedCheckedBagsOnly: z.boolean()
});

const bagSchema = z.object({ quantity: z.number().optional() });

const amenitySchema = z.object({
  description: z.string(),
  isChargeable: z.boolean(),
  amenityType: z.string(),
  amenityProvider: z.object({ name: z.string() })
});

const fareDetailSchema = z.object({
  segmentId: z.string(),
  cabin: z.string(),
  fareBasis: z.string(),
  brandedFare: z.string().optional(),
  brandedFareLabel: z.string().optional(),
  class: z.string(),
  includedCheckedBags: bagSchema.optional(),
  includedCabinBags: bagSchema.optional(),
  amenities: z.array(amenitySchema).optional()
});

const travelerPriceSchema = z.object({
  currency: z.string(),
  total: z.string(),
  base: z.string()
});

const travelerPricingSchema = z.object({
  travelerId: z.string(),
  fareOption: z.string(),
  travelerType: z.string(),
  price: travelerPriceSchema,
  fareDetailsBySegment: z.array(fareDetailSchema)
});

const flightOfferSchema = z.object({
  type: z.string(),
  id: z.string(),
  source: z.string(),
  instantTicketingRequired: z.boolean(),
  nonHomogeneous: z.boolean(),
  oneWay: z.boolean(),
  isUpsellOffer: z.boolean(),
  lastTicketingDate: z.string(),
  lastTicketingDateTime: z.string(),
  numberOfBookableSeats: z.number(),
  itineraries: z.array(itinerarySchema),
  price: priceSchema,
  pricingOptions: pricingOptionsSchema,
  validatingAirlineCodes: z.array(z.string()),
  travelerPricings: z.array(travelerPricingSchema)
});

// const resultFlightOfferSchema = z.array(
//   z.object({
//     success: z.boolean(),
//     data: z.array(flightOfferSchema).optional(),
//     error: z.string().optional(),
//     details: z.string()
//   })
// );

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
  // FlightOfferSchema,
  // FlightOffersSchema,
  // validateFlightOffers,
  flightOfferSchema,
  HotelSchema,
  HotelOffersSchema
  // type FlightOffer,
  // type FlightOffers
};

export interface ResponseMe {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  birth_date: string;
  language_id: number;
  country_id: number;
  role_id: number;
  img: string | null;
  created_at?: string;
  updated_at?: string;
  role: Role;
}

export interface Role {
  id?: number;
  role: string;
}
