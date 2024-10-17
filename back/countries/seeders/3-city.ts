
module.exports = {
  up: async (queryInterface) => {
    const france = [
      "Paris",
      "Marseille",
      "Lyon",
      "Toulouse",
      "Nice",
      "Nantes",
      "Strasbourg",
      "Montpellier",
      "Bordeaux",
      "Lille",
      "Rennes",
      "Reims",
      "Le Havre",
      "Saint-Étienne",
      "Toulon",
      "Grenoble",
      "Dijon",
      "Angers",
      "Nîmes",
      "Villeurbanne"
  ];

  const usa = [
    "New York",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Phoenix",
    "Philadelphia",
    "San Antonio",
    "San Diego",
    "Dallas",
    "San Jose",
    "Austin",
    "Jacksonville",
    "Fort Worth",
    "Columbus",
    "Charlotte",
    "San Francisco",
    "Indianapolis",
    "Seattle",
    "Denver",
    "Washington D.C."
];

const thailand = [
    "Bangkok",
    "Nonthaburi",
    "Nakhon Ratchasima",
    "Chiang Mai",
    "Hat Yai",
    "Udon Thani",
    "Pak Kret",
    "Khon Kaen",
    "Nakhon Pathom",
    "Pattaya",
    "Phuket",
    "Rayong",
    "Surat Thani",
    "Samut Prakan",
    "Trang",
    "Nakhon Si Thammarat",
    "Saraburi",
    "Songkhla",
    "Lampang",
    "Chonburi"
];

const norway = [
    "Oslo",
    "Bergen",
    "Stavanger",
    "Trondheim",
    "Drammen",
    "Fredrikstad",
    "Kristiansand",
    "Sandnes",
    "Tromsø",
    "Sarpsborg",
    "Skien",
    "Ålesund",
    "Tønsberg",
    "Haugesund",
    "Moss",
    "Porsgrunn",
    "Bodø",
    "Arendal",
    "Hamar",
    "Gjøvik"
];


await queryInterface.bulkInsert('cities', 
  france.map((fr) => ({
      name: fr,
      country: 74,
      created_at: new Date(),
      updated_at: new Date()
  })),
  usa.map((us) => ({
    name: us,
    country: 230,
    created_at: new Date(),
    updated_at: new Date()
  })),
  thailand.map((th) => ({
    name: th,
    country: 215,
    created_at: new Date(),
    updated_at: new Date()
  })),
  {});
  },

down: async (queryInterface) => {
  await queryInterface.bulkDelete('cities', {}, {});
}
};
