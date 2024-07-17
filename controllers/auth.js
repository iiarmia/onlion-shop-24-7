exports.getLogin = (req, res) => {

  req.session.isLoggedIn;

  res.render('auth/login', {
      path: '/Login',
      pageTitle: 'ورود',
      isAuthenticated: false
  });
}
exports.postLogin = (req, res) => {
  req.session.isLoggedIn = true;
  res.redirect('/');
}

exports.postLogOut = (req,res) =>{
   req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/')
   })
}