const product = require('../models/product');
const Product = require('../models/product');
const {
    validationResult
} = require('express-validator');

exports.getProducts = (req, res) => {

    Product.find({
            userId: req.user._id
        })
        .then(
            products => {
                res.render('admin/products', {
                    prods: products,
                    pageTitle: 'Admin Products',
                    path: '/admin/products',
                    isAuthenticated: req.session.isLoggedIn,
                });
            }
        ).catch(
            err => {
                console.log(err);
            }
        )

};

exports.getAddProduct = (req, res) => {
    res.render('admin/add-product', {
        path: '/admin/add-product',
        pageTitle: 'Add Product',
        editing: false,
        isAuthenticated: req.session.isLoggedIn,
        hasError: false

    });
};

exports.postAddProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);


    if (!errors.isEmpty()) {

        console.log(errors.array());


        return res.render('admin/add-product', {
            path: '/admin/add-product',
            pageTitle: 'Add Product',
            editing: false,
            isAuthenticated: req.session.isLoggedIn,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg,
            hasError: true,
            validationErrors:errors.array()
        });


    }







    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product.save()
        .then(result => {
            res.redirect('/');
        });

}

exports.getEditProduct = (req, res) => {
    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const prodId = req.params.productId;

    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/add-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                editing: editMode,
                product: product,
                isAuthenticated: req.session.isLoggedIn,
                hasError: false,
                validationErrors:[],
            });
        }).catch(
            err => {
                console.log(err);
            }
        );


}

exports.postEditProduct = (req, res) => {

    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    const errors = validationResult(req);




    if (!errors.isEmpty()) {

        console.log(errors.array());


        return res.render('admin/add-product', {
            path: '/admin/add-product',
            pageTitle: 'Add Product',
            editing: true,
            isAuthenticated: req.session.isLoggedIn,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDesc,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors:errors.array(),
            hasError: true
        });


    }







    Product.findById(prodId)
        .then(product => {

            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }

            product.title = updatedTitle;
            product.price = updatedPrice;
            product.imageUrl = updatedImageUrl;
            product.description = updatedDesc;
            return product.save().then(result => {
                console.log("Updated Product...");
                res.redirect('/');
            });;
        }).catch(err => {
            console.log(err);
        })

}

exports.postDeleteProduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteOne({
        _id: prodId,
        userId: req.user._id
    }).then(() => {
        console.log("Product Removed");
        res.redirect('/admin/products');
    }).catch(err => {
        console.log(err);
    })
}