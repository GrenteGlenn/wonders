const country = [
  {
    name: 'France',
    code: 'FR',
    langue: ['francais', 'anglais'],
    climat: 'tempéré',
    paysage: ['plage', 'montagne'],
    activity: ['tourisme', 'nage', 'randonné'],
    populaire: true
  },
  {
    name: 'Italie',
    code: 'IT',
    langue: ['italien', 'anglais'],
    climat: 'méditerranéen',
    paysage: ['plage', 'montagne'],
    activity: ['tourisme', 'nage', 'randonné'],
    populaire: true
  },
  {
    name: 'Algérie',
    code: 'DZ',
    langue: ['algerien', 'arabe', 'francais'],
    climat: 'méditerranéen',
    paysage: ['plage', 'montagne', 'desert'],
    activity: ['tourisme', 'nage', 'randonné'],
    populaire: true
  }
];

interface Pays {
  langue: Array<string>;
  climat: string;
  paysage: string;
  activity: Array<string>;
  populaire: boolean;
}

interface Result {
  name: string;
  langue: Array<string>;
  climat: string;
  paysage: string[];
  activity: Array<string>;
  populaire: boolean;
}

export const get_country_fake = ({ langue, climat, paysage, activity, populaire }: Pays) => {
  const result: Result[] = [];

  country.forEach((element) => {
    if (element.climat === climat && element.paysage.includes(paysage) && element.populaire === populaire)
      langue.forEach((language) => {
        if (element.langue.includes(language)) {
          activity.forEach((act) => {
            if (element.activity.includes(act)) {
              result.push(element);
            }
          });
        }
      });
  });
  return result;
};
