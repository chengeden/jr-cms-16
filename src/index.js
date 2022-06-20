const app = require('./app');
const logger = require('./utils/logger');
const connectToDB = require('./utils/db');

const PORT = process.env.PORT || 3000; 

connectToDB();

app.listen(PORT, () => {
  logger.info(`server listening on port: ${PORT}`); 
});