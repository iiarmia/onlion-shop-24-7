const express = require("express");

const router = express.Router();


const shopController=require('../controllers/shop');

const isAuth = require('../middleware/is.auth')


router.get('/',isAuth,shopController.getIndex);

router.get('/products', isAuth,shopController.getProducts);

router.get('/products/:productId',isAuth,shopController.getProduct);

router.post('/cart',isAuth,shopController.postCart);

router.get('/cart',isAuth,shopController.getCart);

router.post('/cart-delete-item',isAuth,shopController.postCartDeleteProduct);

router.post('/create-order',isAuth,shopController.PostOrder)

router.get('/orders',isAuth,shopController.getOrder)

module.exports = router;