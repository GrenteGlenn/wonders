const viator_key = process.env.SECRET_KEY_VIATOR;

export function apiViator(query: string, destId?: number | null, method?: string) {
  let body;
  return new Promise((resolve) => {
    let otmAPI = 'https://api.sandbox.viator.com/partner/v1/taxonomy/';
    if (query !== undefined) {
      otmAPI += query;
    } else {
      return 'query undefined';
    }

    console.log(viator_key);

    if (method === 'POST') {
      body = {
        destId: destId,
        topX: '1-3',
        sortOrder: 'RECOMMENDED'
      };

      fetch(otmAPI, {
        method: `${method}`,
        headers: {
          'exp-api-key': `${viator_key}`,
          'Accept-Language': 'fr',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    } else {
      fetch(otmAPI, {
        method: `${method}`,
        headers: {
          'exp-api-key': `${viator_key}`,
          'Accept-Language': 'fr',
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    }
  });
}

// const result = await apiViator('destinations', null, 'GET');
// console.log(result);

/*const attraction = await apiViator('attractions', 24414, 'POST');
console.log(attraction);*/
