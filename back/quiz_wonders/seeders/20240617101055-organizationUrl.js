'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('OrganizationUrl', [{
       url: 'https://www.getyourguide.fr',
       OrganizationId: false
     }], {});
      await queryInterface.bulkInsert('OrganizationUrl', [{
       name: 'https://www.booking.com/searchresults.fr.html?ss=Ostende%2C+Flandre-Occidentale%2C+Belgique&efdco=1&label=en-fr-booking-desktop-Akb7DsuMl_04Kj1fagYeEgS652796016858%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056528%3Ali%3Adec%3Adm&aid=2311236&lang=fr&sb=1&src_elem=sb&src=index&dest_id=-1966651&dest_type=city&ac_position=0&ac_click_type=b&ac_langcode=fr&ac_suggestion_list_length=5&search_selected=true&search_pageview_id=d54248260745014e&ac_meta=GhBkNTQyNDgyNjA3NDUwMTRlIAAoATICZnI6Bm9zdGVuZEAASgBQAA%3D%3D&checkin=2024-06-27&checkout=2024-06-28&group_adults=2&no_rooms=1&group_children=0',
       OrganizationId: false
     }], {});
      await queryInterface.bulkInsert('OrganizationUrl', [{
       name: 'https://flights.booking.com/flights/PAR.CITY-NCE.AIRPORT/?type=ROUNDTRIP&adults=1&cabinClass=ECONOMY&children=&from=PAR.CITY&to=NCE.AIRPORT&fromCountry=FR&toCountry=FR&fromLocationName=Paris&toLocationName=A%C3%A9roport+de+Nice-C%C3%B4te+d%27Azur&depart=2024-07-20&return=2024-07-27&sort=BEST&travelPurpose=leisure&ca_source=flights_index_sb&aid=2311236&label=en-fr-booking-desktop-Akb7DsuMl_04Kj1fagYeEgS652796016858%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-65526620%3Alp9056528%3Ali%3Adec%3Adm',
       OrganizationId: false
     }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
