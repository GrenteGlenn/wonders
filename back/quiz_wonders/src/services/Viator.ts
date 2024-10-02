const viator_key = process.env.SECRET_KEY_VIATOR;

interface BodyType {
  destId: number;
  topX: string;
  sortOrder: string;
}

export function apiViator(query: string, destId?: number) {
  return new Promise((resolve) => {
    let otmAPI = 'https://api.sandbox.viator.com/partner/v1/taxonomy/';
    if (query !== undefined) {
      otmAPI += query;
    } else {
      return 'query undefined';
    }

    console.log(viator_key);

    if (destId !== undefined) {
      const body: BodyType = {
        destId,
        topX: '100-400',
        sortOrder: 'SEO_ALPHABETICAL'
      };

      fetch(otmAPI, {
        headers: {
          'exp-api-key': `${viator_key}`,
          'Accept-Language': 'fr'
        },
        body: body as unknown as BodyInit
      })
        .then((response) => response.json())
        .then((data) => resolve(data))
        .catch((err) => {
          console.log('Fetch Error :-S', err);
        });
    } else {
      fetch(otmAPI, {
        headers: {
          'exp-api-key': `${viator_key}`,
          'Accept-Language': 'fr'
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
