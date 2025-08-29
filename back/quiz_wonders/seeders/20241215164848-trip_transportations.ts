module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      'trip_transportations',
      [
        {
          from_date: new Date(),
          to_date: new Date(),
          price: 175,
          status: 'APayer',
          url: 'https://wwws.airfrance.fr/?utm_medium=SEA&utm_source=GOO&utm_campaign=FR_BRD_CNV_BrandName&utm_content=9254315150_34971934_3461728324_Brandname%20-%20Pure%20Brand&utm_term=air%20france&gad_source=1&gclid=Cj0KCQiAvP-6BhDyARIsAJ3uv7Y94UkihKlzPQft45eYY_mCeDC0Siai0Hr-b8TgSxAcCr_2lctXTb0aAojKEALw_wcB&gclsrc=aw.ds',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'trip_transportations',
      [
        {
          from_date: new Date(),
          to_date: new Date(),
          price: 225,
          status: 'ProblemeDeReservation',
          url: 'https://wwws.airfrance.fr/?utm_medium=SEA&utm_source=GOO&utm_campaign=FR_BRD_CNV_BrandName&utm_content=9254315150_34971934_3461728324_Brandname%20-%20Pure%20Brand&utm_term=air%20france&gad_source=1&gclid=Cj0KCQiAvP-6BhDyARIsAJ3uv7Y94UkihKlzPQft45eYY_mCeDC0Siai0Hr-b8TgSxAcCr_2lctXTb0aAojKEALw_wcB&gclsrc=aw.ds',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
    await queryInterface.bulkInsert(
      'trip_transportations',
      [
        {
          from_date: new Date(),
          to_date: new Date(),
          price: 95,
          status: 'EnAttenteDeReservation',
          url: 'https://wwws.airfrance.fr/?utm_medium=SEA&utm_source=GOO&utm_campaign=FR_BRD_CNV_BrandName&utm_content=9254315150_34971934_3461728324_Brandname%20-%20Pure%20Brand&utm_term=air%20france&gad_source=1&gclid=Cj0KCQiAvP-6BhDyARIsAJ3uv7Y94UkihKlzPQft45eYY_mCeDC0Siai0Hr-b8TgSxAcCr_2lctXTb0aAojKEALw_wcB&gclsrc=aw.ds',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('trips', 'transportation_id');
    await queryInterface.bulkDelete('trips', null, {});
  }
};
