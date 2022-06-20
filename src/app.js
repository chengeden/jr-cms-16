require('dotenv').config();
const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const v1Router = require('./routes');
// const logger = require('./utils/logger'); // 放在新的入口文件里
// const connectToDB = require('./utils/db'); // 放在新的入口文件里
const errorHandler = require('./middleware/errorHandler');
const validationErrorHandler = require('./middleware/validationErrorHandler');

// const PORT = process.env.PORT || 3000; // 放在新的入口文件

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.get('', (req, res) => {
  res.sendStatus(200)
}); // 为了AWS elastic beanstalk health check 通过，它需要检测到根路径有200的返回信息

app.use('/v1', v1Router);

app.use(validationErrorHandler);
app.use(errorHandler);

// 做测试不需要连接真实数据库和监听端口，最核心的部分是application，pp里面有哪一些路由，分别连接了哪些逻辑。所以要把入口文件做一个拆分，把app做导出。
module.exports = app;

// 把原本的这个入口文件改为app.js，然后创建新的入口文件index.js
// connectToDB();

// app.listen(PORT, () => {
//   logger.info(`server listening on port: ${PORT}`);
// });