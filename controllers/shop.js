const { path } = require('express/lib/application');
const Product = require('../models/product');



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

exports.postCart =(req,res)=>{
  const prodId = req.body.productId

  Product.findById(prodId)
  .then(product=>{
   req.user.addTocart(product)
   res.redirect('/')
  })
}

exports.getcart = async (req, res)=>{
  const userPrducts = await req.user.populate('cart.items.productId')

  res.render('shop/cart',{
    pageTitle:'cart',
    path:'/cart',
    products:userPrducts
  })
}