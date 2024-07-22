const User = require('../models/user')

exports.getLogin = (req, res) => {
  res.render('auth/login', {
      path: '/Login',
      pageTitle: 'ورود',
      isAuthenticated: false
  });
}
exports.postLogin = (req, res) => {
  User.findById('6629203517dd4a62202cb730')
  .then(user=>{
    req.session.isLoggedIn = true;
    req.session.user = user
    req.session.save(err=>{
      console.log(err)
      res.redirect('/');
    })
  })
  
 
}

exports.postLogOut = (req,res) =>{
   req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/')
   })
}