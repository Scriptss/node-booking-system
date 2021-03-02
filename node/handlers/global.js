var mysql = require('mysql');

function startMySQL() {
    console.log("starting MySQL connection pool");
    pool = mysql.createPool({
        host            : 'freedb.tech',
        user            : 'freedbtech_callum',
        password        : 'Abc123',
        database        : 'freedbtech_theidol',
        queueLimit : 50, // big queue in case of mass bookingz
        connectionLimit : 10 // 10 so we dont overwhelm the MySQL server
    });

    pool.getConnection(function(err, connection) {
        if (err) {
            console.log("MySQL startup error - " + err);
        } else {
            console.log("MySQL connection pool started");
            pool.on('error', function (error) {
                console.log('pool error: ' + error);
            });
        }

        try {
            connection.release();
            pool_loaded = true;
        } catch(error) {
            //if creating the pool throws an error (connection/threading issue) restart the pool
            pool = null;
            console.log("error starting MySQL connection pool: " + error);
            console.log("restarting MySQL connection pool");
            startMySQL();
        }
    });
}




module.exports = {
    startMySQL
};
