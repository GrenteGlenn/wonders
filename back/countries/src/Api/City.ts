interface Ville {
  activity: Array<string>;
  pays: Array<string>;
}

interface Result {
  pays: string;
  city: string;
  img_full: string;
}

interface City {
  data: Result[];
}

const cities = [
  {
    name: 'Paris',
    pays: 'France',
    activity: ['Tourisme', 'Culture', 'Sport'],
    img_full:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/a4/ef/memorial-interallies.jpg?w=500&h=500&s=1'
  },
  {
    name: 'London',
    pays: 'Royaume-Uni',
    activity: ['Tourisme', 'Culture', 'Sport'],
    img_full:
      'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/bb/a4/ef/memorial-interallies.jpg?w=500&h=500&s=1'
  }
];

export const get_city_fake = ({ activity, pays }: Ville) => {
  const result: City = {
    data: []
  };
  cities.forEach((city) => {
    if (pays.includes(city.pays))
      city.activity.forEach((act) => {
        if (activity.includes(act)) {
          const value = {
            pays: city.pays,
            city: city.name,
            img_full: city.img_full
          };
          result.data.push(value);
          return;
        }
      });
  });

  return result;
};
