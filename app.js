const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const User = require('./models/user')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');
const authRouter = require('./routes/auth')



app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(express.static(path.join(__dirname, 'public')));

 app.use((req,res,next)=>{
    User.findById('6629203517dd4a62202cb730').then(user=>{
        req.user=user;
        next()
    }).catch(err=>{
        console.log(err);
    })
 })
app.use('/admin', adminRouter);
app.use(shopRouter);
app.use(authRouter)


mongoose.connect('mongodb://localhost/Shop')
    .then(result => {
  
        User.findOne().then(user =>{
            if(!user){
                const user = new User({
                    name: 'Max',
                    email: 'max@max.com',
                    cart: {
                        items: []
                    }
                })
                user.save();
            }
        })

        app.listen(4005, () => {
            console.log('Listening on port 3000');
        });
        
    })
    .catch(
        err=>{
            console.log(err);
        }
    )