const express = require('express')
const router = express.Router()
const { Homepage, addCustomer, PostaddCustomer, ViewCustomers, EditCustomer, EditCustomerDetails, DeleteCustomer, SearchCustomer } = require('../Controller/customerController')

// Customer Routes

router.get('/', Homepage)
router.get('/add', addCustomer)
router.post('/add', PostaddCustomer)
router.get('/view/:id', ViewCustomers)
router.get('/edit/:id', EditCustomer)
router.put('/edit/:id', EditCustomerDetails)
router.delete('/edit/:id', DeleteCustomer)
router.post('/search', SearchCustomer)



module.exports = router