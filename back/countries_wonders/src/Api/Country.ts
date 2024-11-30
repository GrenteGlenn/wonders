const country = [
  {
    name: 'France',
    code: 'FR',
    langue: ['francais', 'anglais'],
    climat: 'tempéré',
    paysage: ['plage', 'montagne'],
    activity: ['tourisme', 'nage', 'randonné'],
    img_full:
      'https://www.tourisme-en-hautsdefrance.com/app/uploads/crt-hautsdefrance/2020/12/thumbs/eric-gatineau-flickrcassel-crt-hauts-de-france-eric-gatineau-640x320.jpg',
    populaire: true
  },
  {
    name: 'Italie',
    code: 'IT',
    langue: ['italien', 'anglais'],
    climat: 'méditerranéen',
    paysage: ['plage', 'montagne'],
    activity: ['tourisme', 'nage', 'randonné'],
    img_full:
      'https://www.tourisme-en-hautsdefrance.com/app/uploads/crt-hautsdefrance/2020/12/thumbs/eric-gatineau-flickrcassel-crt-hauts-de-france-eric-gatineau-640x320.jpg',
    populaire: true
  },
  {
    name: 'Algérie',
    code: 'DZ',
    langue: ['algerien', 'arabe', 'francais'],
    climat: 'méditerranéen',
    paysage: ['plage', 'montagne', 'desert'],
    activity: ['tourisme', 'nage', 'randonné'],
    img_full:
      'https://www.tourisme-en-hautsdefrance.com/app/uploads/crt-hautsdefrance/2020/12/thumbs/eric-gatineau-flickrcassel-crt-hauts-de-france-eric-gatineau-640x320.jpg',
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

interface Data {
  data: Result[];
}

interface Result {
  pays: string;
  img_full: string;
}

export const get_country_fake = ({ langue, climat, paysage, activity, populaire }: Pays) => {
  const result: Data = {
    data: []
  };

  country.forEach((element) => {
    if (element.climat === climat && element.paysage.includes(paysage) && element.populaire === populaire)
      langue.forEach((language) => {
        if (element.langue.includes(language)) {
          activity.forEach((act) => {
            if (element.activity.includes(act)) {
              const value: Result = {
                pays: element.name,
                img_full: element.img_full
              };
              result.data.push(value);
            }
          });
        }
      });
  });
  return result;
};
