import Trip from '../models/trip';
export default class TripController {
    async list() {
        return await Trip.findAll()
    }
    async one() {

    }
    async new() {

    }
    async update() {

    }
    async delete() {

    }
}