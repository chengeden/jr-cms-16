const mongoose = require('mongoose');
const logger = require('./logger');

function connectToDB() {
  const connectionString = process.env.CONNECTION_STRING;
  if(!connectionString) {
    logger.error('connection string not defined');
    // 正常退出：代码运行完了
    // 非正常退出：代码运行出现错误，导致server/代码无法正常进行
    // 人为正常退出 process.exit(0)
    // 非人为正常退出 process.exit(任何非0数字)
    process.exit(1); // 把当前进程关闭
  }
  const db = mongoose.connection;
  db.on('connected', () => {
    logger.info(`DB connected, ${connectionString}`);
  });

  db.on('error', (error) => {
    logger.error(error.message);
    process.exit(2);
  });

  db.on('disconnected', () => {
    logger.info('db connection lost');
  });

  return mongoose.connect(connectionString);
}

module.exports = connectToDB;