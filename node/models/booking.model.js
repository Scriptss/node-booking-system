


const Booking = function(booking) {
    this.ID = booking.ID || 0;
    this.surname = booking.surname || undefined;
    this.phoneNumber = booking.phoneNumber || undefined;
    this.partySize = booking.partySize|| undefined;
    this.bookingDate = booking.bookingDate|| undefined;
};


//create a new booking
Booking.create = (newBooking, result) => {

    //select any free tables on a given date
    //TODO: add as a stored procedure
    pool.query("SELECT tableNumber FROM tbl_tables WHERE tbl_tables.tableNumber NOT IN (SELECT tbl_bookings.tableNumber FROM tbl_bookings where tbl_bookings.bookingDate = ?) LIMIT 1", newBooking.bookingDate, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        //if it returns a free tables lets book it, if not return a message saying we have no tables
        if (res.length === 0) {
            //return no tables available if length isnt above 0
            result(null, {"message": "no tables available for that date"});
            return;
        }

        //assign the free table number
        newBooking.tableNumber = res[0].tableNumber;

        //insert booking with available table number
        pool.query("INSERT INTO tbl_bookings SET ?", newBooking, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            //got valid response with no error, send booking confirmation
            let response = "booking created for " + newBooking.surname + " with a party size of " + newBooking.partySize + " on " + newBooking.bookingDate + ", booking reference: " + res.insertId + " table number: " + newBooking.tableNumber;
            result(null, {"message": response});
        });

    });

};


//edit existing booking
Booking.edit = (existingBooking, result) => {

    //make sure booking exists
    let recordCheck = checkBookingExists(existingBooking.ID);
    recordCheck.then(function(response) {


        if (response === false) {
            result(null, {"message": "booking does not exist"});
            return;
        }

        //booking exists, set the params for the update query
        let params = {};
        if (existingBooking.partySize !== undefined) {
            params.partySize = existingBooking.partySize;
        }
        if (existingBooking.phoneNumber !== undefined) {
            params.phoneNumber = existingBooking.phoneNumber;
        }

        pool.query("UPDATE tbl_bookings SET ? WHERE ID = ?", [params,existingBooking.ID], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            //got valid response with no error
            result(null, {"message": "booking updated"});
        });


    });

};


//delete a booking
Booking.delete = (bookingId, result) => {

    //check if the record exists
    let recordCheck = checkBookingExists(bookingId);
    recordCheck.then(function(response) {

        if (response === false) {
            result(null, {"message": "booking does not exist"});
            return;
        }

        //booking exists so delete it
        pool.query("DELETE FROM tbl_bookings WHERE ID = ?", bookingId, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }

            //got valid response with no error
            result(null, {"message": "booking deleted"});
        });


    }, function(err) {
        result(err, null);
    })

};


//get booking list for given date
Booking.bookingList = (bookingDate, result) => {

    //TODO: turn into stored procedure
    pool.query("SELECT T.tableNumber, B.surname, B.phoneNumber from tbl_tables T left join tbl_bookings B on T.tableNumber = B.tableNumber AND B.bookingDate = ? or B.bookingDate is null ORDER BY T.tableNumber asc", bookingDate, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }

        //got valid response with no error
        result(null, {"message": res});
    });


};


//check if a booking exists within tbl_bookings
function checkBookingExists(bookingId) {
    return new Promise(function(resolve, reject) {

        pool.query("SELECT * FROM tbl_bookings where ID = ?", bookingId, (err, res) => {
            if (err) {
                reject(err);
                return;
            }

            //make sure the booking exists, if not return false
            if (res.length === 0) {
                resolve(false);
            }
            resolve(true);
        });
    });
}


module.exports = Booking;
