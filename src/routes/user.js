const { Router } = require('express');
const { register, login } = require('../controllers/user');

const userRouter = Router();

userRouter.post('', register);
// POST /auth 登录也可以设计成这样
userRouter.post('/login', login);

module.exports = userRouter;