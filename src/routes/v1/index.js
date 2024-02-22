const express = require('express');

const {BookingController}  = require('../../controllers/index');
//const { createChannel } = require('../../utils/messageQueue');

//const channel = await createChannel();
const bookingController = new BookingController();

const router = express.Router();

router.post('/bookings', bookingController.create);
router.post('/publish', bookingController.sendMessageToQueue);

router.get('/routes', async(req,res) => {
    res.status(200).json ({
        message:'inside routes v1 index to verify morgan gateway service'
    })
})

module.exports = router; 