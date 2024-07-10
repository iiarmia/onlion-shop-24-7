const { path } = require("express/lib/application")

exports.getlogin = (req,res)=>{
  res.render('auth/login',{
    path:'/Login',
    pageTitle:'ورود',
    isAuthenticated: req.isLoggedIn
  })
};

exports.postlogin = (req,res)=>{
  res.setHeader('Set-Cookie','loggedIn=true')
  res.redirect('/')
}