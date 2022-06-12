const logger = require("../utils/logger");

module.exports = (error, req, res, next) => {
  logger.error(error); // 最后抓取从未见过的错误，并把它记录
  return res.status(500).json({error: 'something unexpected happened, please try again later'});
};