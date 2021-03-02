var express = require('express');
var router = express.Router();
const booking = require("../controllers/booking.controller.js");


/* new booking
 @params
 surname:string
 phoneNumber:string
 partySize:int
 bookingDate: date YYYY-MM-DD format
 */
router.post('/new', booking.create);


/* edit booking
 @params
 bookingId:int
 partySize:int (optional)
 phoneNumber:string (optional)
 */
router.patch('/edit/:bookingId', booking.edit);


/* delete booking
 @params
 bookingId:int
 */
router.delete('/delete/:bookingId', booking.delete)


/* GET a booking list for a specified day
 @params
 date:string (YYYY-MM-DD)
 */
router.get('/list', booking.bookingList)





module.exports = router ;
