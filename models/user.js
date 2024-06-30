const createApplication = require('express/lib/express');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        minlength:3,
        maxlength:15
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    cart:{
        items:[{
            productId:{
                type:Schema.Types.ObjectId,
                ref:'Product',
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }]
    }
});

userSchema.methods.addTocart = function (product){
    const CartProductIndex = this.cart.items.findIndex(cp=>{
        return cp.productId.toString() === product._id.toString()
    })
    let newQuantity = 1;
    const updateCartItems = [...this.cart.items];
    if(CartProductIndex >= 0){
        newQuantity = this.cart.items[CartProductIndex].quantity + 1;
        updateCartItems[CartProductIndex].quantity=newQuantity
    }else{
        updateCartItems.push({
            productId:product._id,
            quantity:newQuantity
        })
    }
    const updateCart = {
        items:updateCartItems
    };
    this.cart = updateCart;
    return this.save()
},
userSchema.methods.removeFromCart = function (productId) {
    const updatedcartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString()
    });
    this.cart.items = updatedcartItems;
    return this.save();
};

userSchema.methods.clearCart = function () {
    this.cart = {
        items: []
    };
    return this.save();
}
module.exports = mongoose.model('User',userSchema)