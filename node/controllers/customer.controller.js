const Customer = require("../models/customer.model.js");


//fetch total customers on given date
exports.singleDate = (req, res) => {

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

    Customer.customerTotalSingleDate(req.query.date, (err, data) => {
        if (err) {
            res.json({"message" : err.message});
        } else {
            res.send(data);
        }
    });

};



//fetch total customers between date range
exports.dateRange = (req, res) => {

    //make sure both dates are provided
    if (!(req.query.from) || !(req.query.to)) {
        res.json({"message" : "date range not specified"});
        return;
    }

    //make sure both dates are valid
    if (!isValidDate(req.query.from) || !isValidDate(req.query.to)) {
        res.json({"message" : "invalid booking date, YYYY-MM-DD format required"});
        return;
    }


    Customer.customerTotalDateRange(req.query.from,req.query.to, (err, data) => {
        if (err) {
            res.json({"message" : err.message});
        } else {
            res.send(data);
        }
    });


};



/* TODO: duplicate of booking.controller.js function, create class with function instead of duplicate code
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
