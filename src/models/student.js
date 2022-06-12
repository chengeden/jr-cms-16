const { Schema, model } = require('mongoose');
const Joi = require('joi');

// firstName, lastName, email, courses(array)

const schema = new Schema({
  // _id: { // 建议不自定义id，会自动生成objectId
  //   type: Number,
  // } 
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 10,
  },
  lastName: {
    type: String,
    required: true,
  },
  // lastName: String, // 如果只想设置类型，其他都不配置，可以简写成这样。要配置其他就要写成object形式，但建议写object
  email: {
    type: String,
    required: true,
    // mongoose的数据验证在默认情况下只有在调用.save()的时候才进行验证。如果是findByIdAndUpdate()它是会跳过mongoose的验证，除非是添加runValidators: true
    // 所以建议使用Joi在mongoose的外部做数据验证，在数据没有传给mongoose之前或没有通过mongoose创建document之前，先对数据进行验证，只有验证通过了，再把数据交给mongoose，创建document从而进行保存
    validate: { // 设定自定义的验证规则 
      validator: (email) => { // 验证规则就是传一个validator函数，接收一个参数：当前的字段
        // regex 正则表达式
        // Joi
        // validator.js
        // express-validator

        // const validation = Joi.string().email().validate(email);
        // const { error } = validation;
        // if (error) {
        //   return false;
        // }
        // return true;

        // 如果返回false，才是验证失败。如果error有值，就是true，!转化成false
        return !Joi.string().email().validate(email).error;
      },
      msg: 'Invalid email format',
    },
  },
  courses: [
    {
      type: String,
      ref: 'Course',
    }
  ]
});

const Model = model('Student', schema);

module.exports = Model;