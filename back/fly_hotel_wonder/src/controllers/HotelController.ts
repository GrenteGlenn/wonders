class HotelController {
  list() {
    const hotel = [
      {
        id: 1,
        name: 'Cruise Bar',
        place_id: 'ChIJi6C1MxquEmsR9-c-3O48ykI',
        rating: 4,
        price_level: 2,
        address: 'Level 1, 2 and 3, Overseas Passenger Terminal, Circular Quay W, The Rocks',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        id: 2,
        name: 'Sydney Harbour Dinner Cruises',
        place_id: 'ChIJM1mOVTS6EmsRKaDzrTsgids',
        rating: 4.8,
        price_level: null,
        address: '32 The Promenade, Sydney',
        created_at: new Date(),
        updated_at: new Date()
      }
    ];
    return hotel;
  }
}

export default HotelController;