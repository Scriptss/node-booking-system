var express = require('express');
var router = express.Router();

const customer = require("../controllers/customer.controller.js");


/* GET customers on given date
 @params
 date:string (YYYY-MM-DD format)
 */
router.get('/total/single', customer.singleDate);



/* GET customers between given dates
 @params
 from:string (YYYY-MM-DD format)
 to:string (YYYY-MM-DD format)
 */
router.get('/total/range', customer.dateRange);


module.exports = router ;
