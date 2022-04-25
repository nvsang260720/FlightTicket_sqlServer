const express = require('express');
const router = express.Router();
const ProductController = require('../../controller/Backend/ProductsController')
const CategoryController = require('../../controller/Backend/CategoryController')
const AuthController = require('../../controller/Backend/AuthController')
const PersonnelController = require('../../controller/Backend/PersonnelControler')
const CustomerController = require('../../controller/Backend/CustomerController')


router.get('/login', AuthController.getLogin)

router.get('/personnel', PersonnelController.getPersonnel)

router.post('/personnel', PersonnelController.postAddPersonnel)

router.post('/personnel/:id',PersonnelController.deletePersonnel)

router.get('/edit-personnel/:id',PersonnelController.getEditPersonnel)

router.post('/edit-personnel/',PersonnelController.postEditPersonnel)

// customer

router.get('/customer', CustomerController.getCustomer)

router.post('/customer/:id',CustomerController.deleteCustomer)

router.get('/edit-customer/:id', CustomerController.getEditCustomer)

router.post('/edit-customer/', CustomerController.postEditCustomer)
//

router.get('/get-category', CategoryController.getCategory);

router.get('/get-product', ProductController.getProducts)

router.get('/add-product',ProductController.getAddProducts)

router.post('/add-product',ProductController.addProducts)

router.get('/edit-product',ProductController.getEditProducts)

router.post('/edit-product/:id',ProductController.postEditProducts)



module.exports = router;