const jwt = require('jsonwebtoken');

const { JWT_KEY } = process.env; // JWT_KEY就是secret，JWT_KEY放在环境变量里？是希望它在不同的环境里面是随机生成的值，让机器自动生成。

function generateToken(payload) {
  return jwt.sign(payload, JWT_KEY, { expiresIn: '1h'}); // jwt.sign是签发token
}

function validateToken(token) { // 验证token是否是我们签发的以及用户访问权限
  try {
    return jwt.verify(token, JWT_KEY); // return payload
  } catch(e) { // 在这里写try catch是因为正常情况下抛出错误是因为token过期了针对正常登录的用户
    return null;
  }
  // return jwt.verify(token, JWT_KEY); // 只写这一行，然后验证错误在外面写try catch。或是直接像上面那样在这里写try catch
}
// try {
//   // validateToken()
// } catch() {

// }

module.exports = { generateToken, validateToken };