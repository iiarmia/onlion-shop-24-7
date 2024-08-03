const Product = require('../models/product');
const Order = require('../models/order');
const cookieParse = require('../util/cookieparser');




exports.getProducts = (req, res) => {
    Product.find()
        .then(products => {
            res.render('shop/product-list', {
                prods: products,
                pageTitle: 'All Products',
                path: '/products',
                isAuthenticated: req.session.isLoggedIn,
            });
        })
}

exports.getIndex = (req, res) => {
   


    Product.find().then(products => {
        res.render('shop/index', {
            path: '/',
            pageTitle: 'Shop',
            prods: products,
            isAuthenticated:  req.session.isLoggedIn,
            csrfToken:req.csrfToken()
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
                path: '/products',
                isAuthenticated: req.session.isLoggedIn,
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
        products: user.cart.items,
        isAuthenticated: req.session.isLoggedIn,
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

exports.postOrder = (req, res) => {
    req.user.populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items.map(i => {
                return {
                    quantity: i.quantity,
                    product: {
                        ...i.productId._doc
                    }
                }
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            })
            return order.save();
        }).then(() => {
            return req.user.clearCart();
        }).then(() => {
            res.redirect('/orders');
        }).catch(err => {
            console.log(err);
        });
}



exports.getOrder = (req, res) => {

    Order.find({
            'user.userId': req.user._id
        })
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: "Orders",
                path: "/orders",
                orders: orders,
                isAuthenticated: req.session.isLoggedIn,
            });
        }).catch(err => {
            console.log(err);
        })

}