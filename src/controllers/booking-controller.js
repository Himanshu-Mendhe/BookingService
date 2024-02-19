const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../services/index');
const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const response = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'succesfully created booking',
            success: true,
            data: response,
            error: {}
        })
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.message,
            success: false,
            data: {},
            error: error.message
        });
    }
}


module.exports = {
    create
}