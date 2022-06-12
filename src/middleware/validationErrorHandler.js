const logger = require("../utils/logger");

module.exports = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json(error);
  }
  next(error);
};

// 自己定义错误类型
// next(new Error(''))
// next(new CustomError('')) 
// class CustomError extends Error {

// }

// if(error instanceof CustomError) {

// }