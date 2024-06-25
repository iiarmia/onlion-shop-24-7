const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');
const schema = mongoose.Schema();

const orderSchma = new schema({
    products:[
        {
            product:{
             Type:Object,
             required:true
            },
            quantity:{
             Type:Number,
             required:true
            }
        }
    ],

    user:
      {
        name:{
            type:String,
            required:true
        },
        UserId:{
            type:this.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        }
      },
})

module.exports = mongoose,model('order', orderSchma )
