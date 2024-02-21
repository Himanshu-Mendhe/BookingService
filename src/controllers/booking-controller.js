const { StatusCodes } = require('http-status-codes');
const {BookingService} = require('../services/index');
const bookingService = new BookingService();
const {createChannel, publishMessage} = require('../utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('../config/seerver-config');


class BookingController {

    constructor() {

    }

    async sendMessageToQueue(req,res) {
        const channel = await createChannel();
        const data = {message: 'success'};
        publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
        return res.status(200).json({
            message: 'successfully published event'
        });
    }

    async create(req, res) {
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
                error: error.explanation
            });
        }
    }
}


module.exports = BookingController;