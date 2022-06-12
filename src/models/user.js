const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new Schema({
  username: {
    type: String,
    required: true,
    // 数据验证：最小长度
  },
  password: {
    type: String,
    required: true,
    // 最少一个大写字母，小写字母，数字，字符
  },
  role: {
    type: String,
  }
});

// hashPassword存在于所有的mongoose object (mongoose user object)上面。
// controllers user.js 里的 const user = new User({ username, password }); 这里的user对象是mongoose user object，它通过mongoose的user model 生成出来的对象就是一个user object。
// 调用这个函数：user.hashPassword();
schema.methods.hashPassword = async function () { 
  this.password = await bcrypt.hash(this.password, 12); 
  // 后面this指向实际调用hashPassword函数的对象，所以没有用箭头函数。因为这个对象上是一个user的object，所以user里会有password这个属性，想要访问到这个属性，然后把hash过后的结果注回给这个password属性
};

// 验证password的逻辑
schema.methods.validatePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Model = model('User', schema);

module.exports = Model;