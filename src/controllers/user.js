const User = require('../models/user');
const { generateToken } = require('../utils/jwt');

async function register(req, res) {
  const { username, password } = req.body;
  // validation
  // check if username duplicate
  // add uniq index to username：在model里要先加一个参数配置
  const user = new User({ username, password }); // 把username和password传给User model，然后创建一个新的user
  // hash password
  await user.hashPassword();
  await user.save();
  const token = await generateToken({ username });

  // return res.json({ username });
  return res.json({ token }); // 可以直接返回token，或是再把username返回一次也可以
}

// 可以单独创建auth文件
// 也可以放在user里面
async function login(req, res) {
  const { username, password } = req.body;
  const existingUser = await User.findOne({ username }).exec();
  if (!existingUser) {
    return res.status(401).json({ error: "invalid username or password" });
  }

  const isPasswordValid = await existingUser.validatePassword(password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'invalid username or password '});
  }
  const token = await generateToken({ username, role: existingUser.role });
  // return res.json({ username });
  return res.json({ token });
}

module.exports = {
  register,
  login
}