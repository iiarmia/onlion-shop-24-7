function CookieParser(req){
  const List=[];
  const cookieHeader = req.get('cookie')
  if(!cookieHeader)return List
  cookieHeader.split(';').forEach(cookie=>{
    let[name , ...rest] = cookie.split('=');
    name = name.trim();
    if(!name)return;
    const value = rest.join('=').trim();
    if(!value)return;
    List[name] = decodeURIComponent(value);
  });
  return List
}

module.exports = CookieParser