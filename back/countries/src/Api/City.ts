interface Ville {
  activity: Array<string>;
  pays: Array<string>;
}

interface City {
  name: string;
  pays: string;
  activity: Array<string>;
}

const cities = [
  {
    name: 'Paris',
    pays: 'France',
    activity: ['Tourisme', 'Culture', 'Sport']
  },
  {
    name: 'London',
    pays: 'Royaume-Uni',
    activity: ['Tourisme', 'Culture', 'Sport']
  }
];

export const get_city_fake = ({ activity, pays }: Ville) => {
  const result: City[] = [];
  cities.forEach((city) => {
    if (pays.includes(city.pays))
      city.activity.forEach((act) => {
        if (activity.includes(act)) {
          result.push(city);
        }
      });
  });

  return result;
};
