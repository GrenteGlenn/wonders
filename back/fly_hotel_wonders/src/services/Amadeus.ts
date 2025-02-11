export function apiOpenTrip(method: string, query: string) {
  return new Promise((resolve) => {
    let otmAPI = 'https://test.api.amadeus.com/v1/shopping' + method;
    if (query !== undefined) {
      otmAPI += '?' + query;
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
