const bcrypt = require('bcryptjs');
const sendEmail = require('../util/email')
const User = require('../models/user');


exports.getLogin = (req, res) => {
    let message = req.flash('error')

    if (message.length > 0 ){
        message = message[0]
    }else{
        message = null
    }


    res.render('auth/login', {
        path: '/Login',
        pageTitle: 'ورود',
        errorMessage: message,
        successMessage:req.flash('success')
    });
}

exports.postLogin = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
        email: email
    }).then(
        user => {
            if (!user) {
                req.flash('error','ایمیل شما اشتباه است!');
                return res.redirect('/login');
            }
            bcrypt.compare(password, user.password).then(isMatch => {

                if (isMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        console.log(err);
                        res.redirect('/');
                    });
                }
                req.flash('error', 'پسورد شما اشتباه است !');
                res.redirect('/login');
            })

        }
    )
}

exports.postLogout = (req, res) => {

    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    })
}
exports.getSignup = (req, res) => {
    res.render('auth/singup', {
        path: '/singup',
        pageTitle: 'ثبت نام',
        errorMessage: req.flash('error')
    });
}

exports.postSignup = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email })
      .then(userDoc => {
        if (userDoc) {
          req.flash('error','ایمیل با همین نام در سایت ثبت نام کرده است لطفا با ایمیل دیگر ثبت نام کنید')
          return res.redirect('/signup');
        }
        return bcrypt
          .hash(password, 12)
          .then(hashedPassword => {
            const user = new User({
              email: email,
              password: hashedPassword,
              cart: { items: [] }
            });
            return user.save();
          })
          .then(result => {
            req.flash('success','ثبت نام شما با موفقیت انجام شد میتوانید وارد شوید');
            sendEmail({
             subject:'ثبت نام',
             text:'ثبت نام با موفقیت انجام شد',
             userEmail: email
            })
            res.redirect('/login');
          });
      })
      .catch(err => {
        console.log(err);
      });

}

exports.getReset = (req, res) => {

    res.render('auth/resetpp', {
        path: '/resetpp',
        pageTitle: 'بازیابی رمز عبور'
    })
}