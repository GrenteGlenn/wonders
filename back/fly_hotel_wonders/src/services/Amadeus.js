import Amadeus from 'amadeus';

const amadeus = new Amadeus({
  clientId: process.env.AMADEUS_CLIENT_ID,
  clientSecret: process.env.AMADEUS_CLIENT_SECRET
});

export async function getFlightOffers(
  originLocationCode,
  destinationLocationCode,
  departureDate,
  returnDate,
  adults,
  children,
  nonStop,
  maxPrice
) {
  try {
    const response = await amadeus.shopping.flightOffersSearch.get({
      originLocationCode,
      destinationLocationCode,
      departureDate,
      returnDate,
      children,
      adults,
      nonStop,
      maxPrice,
      currencyCode: 'EUR'
    });
    return response.data;
  } catch (e) {
    return e;
  }
}

export async function getHotelOffers(latitude, longitude, radius = 5, hotelScore, ratings) {
  try {
    const response = await amadeus.referenceData.locations.hotels.byGeocode.get({
      latitude,
      longitude,
      hotelScore,
      radius,
      ratings
    });

    return response.data;
  } catch (e) {
    return e;
  }
}

export async function checkHotelOffers(hotelIds, adults) {
  try {
    // Hotel Search API V3
    // Get list of available offers in specific hotels by hotel ids
    const response = await amadeus.shopping.hotelOffersSearch.get({
      hotelIds,
      adults
    });

    return response.data;
  } catch (e) {
    return e;
  }
}
