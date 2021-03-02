var payloadChecker = require('payload-validator');
const Booking = require("../models/booking.model.js");


//create new booking
exports.create = (req, res) => {

    //validate the post params
    let expectedPost = {
        "surname" : "",
        "phoneNumber" : "",
        "partySize" : 0,
        "bookingDate" : ""
    };
    let result = payloadChecker.validator(req.body,expectedPost,["surname","phoneNumber", "partySize", "bookingDate"],false);
    if(!result.success) {
        res.json({"message" : result.response.errorMessage});
        return;
    }

    //check if bookingDate is invalid
    if (!isValidDate(req.body.bookingDate)) {
        res.json({"message" : "invalid booking date, YYYY-MM-DD format required"});
        return;
    }

    //if party size is above 4
    if (req.body.partySize > 4) {
        res.json({"message" : "max table size is 4"});
        return;
    }

    // Create the booking obj
    const booking = new Booking({
        surname: req.body.surname,
        phoneNumber: req.body.phoneNumber,
        partySize: req.body.partySize,
        bookingDate: req.body.bookingDate
    });

    //create the booking
    Booking.create(booking, (err, data) => {
        if (err) {
            res.json({"message" : err.message});
        } else {
            res.send(data);
        }
    });

};



//edit existing booking
exports.edit = (req, res) => {

    //validate the post params
    let expectedPost = {
        "phoneNumber" : "",
        "partySize" : 0
    };
    let result = payloadChecker.validator(req.body,expectedPost,[],false);
    if(!result.success) {
        res.json({"message" : result.response.errorMessage});
        return;
    }


    //convert bookingId to int and make sure its valid
    let bookingRef = req.params.bookingId;
    if (!isNumber(bookingRef)) {
        res.json({"message": "Booking reference isnt number"});
        return;
    }


    //if phoneNumber and partySize arent specified return err
    if (!(req.body.phoneNumber) && !(req.body.partySize)) {
        res.json({"message": "must provide party size or phone number"});
        return;
    }


    //check partySize isnt 0 or above 4 if its defined (optional param)
    if (req.body.partySize) {
        if (req.body.partySize === 0 || req.body.partySize > 4) {
            res.json({"message": "party size has to be between 1 and 4"});
            return;
        }
    }

    //already have a booking obj so might as well use it
    const booking = new Booking({
        ID: bookingRef,
        phoneNumber: req.body.phoneNumber || undefined,
        partySize: req.body.partySize || undefined
    });

    Booking.edit(booking, (err, data) => {
        if (err) {
            res.json({"message" : err.message});
        } else {
            res.send(data);
        }
    });




};



//delete existing booking
exports.delete = (req, res) => {

    let bookingRef = req.params.bookingId;
    if (!isNumber(bookingRef)) {
        res.json({"message": "Booking reference isnt number"});
        return;
    }

    Booking.delete(bookingRef, (err, data) => {
        if (err) {
            res.json({"message" : err.message});
        } else {
            res.send(data);
        }
    });

};



//fetch booking list
exports.bookingList = (req, res) => {

    //make sure booking date was passed as param
    if (!(req.query.date)) {
        res.json({"message" : "you must provide a booking date"});
        return
    }

    //check its a valid date
    if (!isValidDate(req.query.date)) {
        res.json({"message" : "invalid booking date, YYYY-MM-DD format required"});
        return;
    }

    Booking.bookingList(req.query.date, (err, data) => {
        if (err) {
            res.json({"message" : err.message});
        } else {
            res.send(data);
        }
    });

};



/*
 * checks if a given value is a number
 */
function isNumber(num) {
    let _num = Number(num);
    return Number.isInteger(_num);
}


/*
 * checks if a given YYYY-MM-DD date is valid
 */
function isValidDate(dateString) {
    let regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false;  // Invalid format
    let d = new Date(dateString);
    let dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
    return d.toISOString().slice(0,10) === dateString;
}
