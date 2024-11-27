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

// Exemple
//
// const pageLength = 5; // number of objects per page
//
// const offset = 0; // offset from first object in the list
// let count; // total objects count
//
// const city = await apiOpenTrip('geoname', 'name= Paris');
//
// // @ts-ignore
// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const lon = city.lon;
// // @ts-expect-error
// // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
// const lat = city.lat;
//
// await apiGet('radius', `radius=1000&limit=${pageLength}&offset=${offset}&lon=${lon}&lat=${lat}&rate=2`).then(
//   (data) => {
//     // @ts-ignore
//     console.log('main', data.features);
//   }
// );
