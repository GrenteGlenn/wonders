const apiKey = process.env.SECRET_KEY_OPEN_TRIP_MAP;

export function apiOpenTrip(method: string, query: string) {
  return new Promise((resolve) => {
    let otmAPI = 'https://api.opentripmap.com/0.1/en/places/' + method;
    if (query !== undefined) {
      otmAPI += '?' + query + '&apikey=' + apiKey;
    } else {
      return 'query undefined';
    }
    fetch(otmAPI)
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((err) => {
        console.log('Fetch Error :-S', err);
      });
  });
}
