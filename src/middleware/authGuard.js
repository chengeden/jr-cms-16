const { validateToken } = require("../utils/jwt")

module.exports = (req, res, next) => {
  // token 是放在 Authorization header里，格式是：Bearer {token}
  // 我们想要验证用户的请求是否携带token： 1.先把authorization这个header的值取出来 2.取到这个值之后要检查关键字是否是Bearer 3.验证token是否有效
  const authorizationHeader = req.header('Authorization'); // 取 Authorization 这个header
  if (!authorizationHeader) { // 如果完全没有这个Authorization header
    return res.sendStatus(401);
  }

  const tokenArray = authorizationHeader.split(' '); // 把 Bearer {token} 用空格进行拆分，看第0位是否是关键字Bearer，第1位是否是有效的token
  if (tokenArray.length !== 2 || tokenArray[0] !== 'Bearer') {
    return res.sendStatus(401);
  }

  const payload = validateToken(tokenArray[1]); // 调用validateToken把payload取出来
  if (!payload) { // 如果payload是一个falsy value
    return res.sendStatus(401);
  }
  req.user = payload; // 把user的信息就是payload赋值到req.user上
  return next(); // 如果payload有值调用next()
};