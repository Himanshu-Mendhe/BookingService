const {StatusCodes} = require('http-status-codes');

const {Booking} = require('../models/index');
const { ValidationError, AppError } = require('../utils/errors/index');

class BookingRepository {
    async create() {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) { 
            if(error.name == 'SequelizeValidationError'){
                throw new ValidationError(error);
            }
            throw new AppError(
                'Repository Error',
                'cannot create booking',
                'there was some issue creating a booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
};

module.exports = BookingRepository;
