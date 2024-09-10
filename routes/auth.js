const express = require("express");

const router = express.Router();

const authController = require('../controllers/auth');

const {check} = require('express-validator')


router.get('/login', authController.getLogin);

router.post('/login', authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/signup',authController.getSignup);

router.post('/signup',
    check('email')
    .isEmail()
    .withMessage('لطفا یک ایمیل معتبر رو وارد کنید ')
    .custom((value , {req})=>{
        if(value === 'test@gmail.com'){
            throw new Error('شما حق ورود به وب سایت رو به وب سایت رو ندارید')
        }

        return true
    })
    ,authController.postSignup);

router.get('/reset',authController.getReset);

router.post('/reset',authController.postReset);

router.get('/reset/:token',authController.getResetPassword);

router.post('/new-password',authController.postResetPassword);





module.exports = router;