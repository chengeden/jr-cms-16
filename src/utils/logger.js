const winston = require('winston');

const logger = winston.createLogger({ // 创建日志logger
  level: process.env.LOGGER_LEVEL || 'info', // level -> 打印的时候打印哪个层级
  // winston.format.simple()
  format: winston.format.combine( // format -> 打印的时候打印哪些格式， combine -> 使用多个不同的格式
    winston.format.colorize(), // 打印不同的颜色区分不同的部分
    winston.format.timestamp({ // 指定打印时间戳的方式
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf( // printf -> 日志想写成什么样子/日志格式
      (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
  ),
  transports: [new winston.transports.Console()] // 日志往哪个渠道进行输出，这里是打印在console
});

module.exports = logger;