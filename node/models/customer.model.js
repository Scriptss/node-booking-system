//var mysql = require('mysql');

//customer total for a single date
exports.customerTotalSingleDate = (bookingDate, result) => {

    pool.query("SELECT SUM(partySize) total FROM tbl_bookings WHERE bookingDate = ?", bookingDate, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        //got valid response with no error
        result(null, {"message": res[0].total});
    });

};


//customer total for date range
exports.customerTotalDateRange = (dateFrom, dateTo, result) => {

    //TODO: add as stored procedure
    pool.query("select bookingDate,sum(partySize) as totalCustomers from tbl_bookings where bookingDate between ? and ? group by bookingDate", [dateFrom,dateTo], (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        //got valid response with no error
        result(null, {"message": res});
    });

};