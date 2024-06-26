const { path } = require('express/lib/application');
const Product = require('../models/product');
const Order = require('../models/order')



exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products'
            });
        })
}


exports.getIndex = (req, res) => {

    Product.find().then(products => {
        res.render('shop/index', {
            path: '/',
            pageTitle: 'Shop',
            prods: products
        });
    }).catch(err => {
        console.log(err);
    })
};


exports.getProduct = (req, res) => {

    const prodId = req.params.productId;

    Product.findById(prodId).then(
        product => {
            res.render('shop/product-details', {
                product: product,
                pageTitle: product.title,
                path: '/products'
            });
        }
    ).catch(
        err => {
            console.log(err);
        }
    )
}

exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            req.user.addTocart(product);
            res.redirect('/cart');
        });
}

exports.getCart = async (req, res) => {
    const user = await req.user.populate('cart.items.productId');
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products: user.cart.items
    });
}

exports.postCartDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    req.user.removeFromCart(prodId)
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        }).catch(err => {
            console.log(err);
        })
}

exports.PostOrder = (req,res)=>{
    req.user.populate('cart.items.productId')
    .then(user=>{
        const Products = user.cart.items.map(i=>{
            return {quantity:i.quantity,product:i.productId}
        });
        const order = new Order({
            user:{
                name:req.user.name,
                userIde:req.user
            },
            products:Products
        })
        return order.save()
    })
}