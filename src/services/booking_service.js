const axios = require('axios');
const {BookingRepository} = require('../repository/index');
const {FLIGHT_SERVICE_PATH} = require('../config/seerver-config');
const ServiceError = require('../utils/errors/service-errors');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository(); 
    }
    async createBooking(data) {
        try {
            const flightId = data.flightId;
            const getFlightRequestURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`
            const response = await axios.get(getFlightRequestURL);
            const flightData = response.data.data;
            let priceOfTheFlight = flightData.price;
            if(data.noOfSeats > flightData.totalSeats){
                throw new ServiceError ('something went wrong in service', 'insufficient seats');
            }
            const totalCost = priceOfTheFlight * data.noOfSeats;
            const bookingPayload = {...data, totalCost};
            const booking = await this.bookingRepository.create(bookingPayload);
            const updateFlightBookingURL = `${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            //await axios.patch(updateFlightBookingURL, {totalSeats: flightData.totalSeats - booking.noOfSeats});
            const updatedTotalSeats = flightData.totalSeats - data.noOfSeats;
            await axios.patch(updateFlightBookingURL, {totalSeats: updatedTotalSeats});

            const finalBooking = await this.bookingRepository.update(booking.id, {status: 'Booked'})
            return finalBooking;

        } catch (error) {
            if(error.name == 'RepositoryError' || error.name == 'ValidationError'){
                throw error;
            }
            throw new ServiceError()
        }
    }
};

module.exports = BookingService;