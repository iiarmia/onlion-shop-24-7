const { path } = require("express/lib/application")
const CookieParser = require('../util/cookieParser')

exports.getlogin = (req,res)=>{

   const isLoggendin = CookieParser(req)

  res.render('auth/login',{
    path:'/Login',
    pageTitle:'ورود',
    isAuthenticated:isLoggendin['loggedIn']
  })
};

exports.postlogin = (req,res)=>{
  res.setHeader('Set-Cookie','loggedIn=true')
  res.redirect('/')
}