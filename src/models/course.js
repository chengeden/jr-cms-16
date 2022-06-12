const { Schema, model } = require('mongoose');

// const schema = new Schema({});
// const Model = model('Course', schema);
// module.exports = Model;
// 下面的代码是上面的缩写
module.exports = model('Course', new Schema({
  _id: {
    type: String,
    uppercase: true,
    alias: 'code',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: 'this is a description',
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    // {
    //   _id: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Student',
    //   },
    //   firstName: String,
    // }
  ]
}));