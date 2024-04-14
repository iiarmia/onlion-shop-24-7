const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRouter = require('./routes/admin');
const shopRouter = require('./routes/shop');



app.use(bodyParser.urlencoded({
    extended: false
}));



app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRouter);
app.use(shopRouter);


mongoose.connect('mongodb://localhost/Shop')
    .then(result => {
        app.listen(4005, () => {
            console.log('Listening on port 3000');
        });
        
    })
    .catch(
        err=>{
            console.log(err);
        }
    )