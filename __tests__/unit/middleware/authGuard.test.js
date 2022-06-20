const authGuard = require('../../../src/middleware/authGuard');
const { validateToken } = require('../../../src/utils/jwt');
jest.mock('../../../src/utils/jwt');

describe('authentication guard middleware', () => {
  it('should return 401 if authorization header is missing', () => {
    // req,res,next是依赖项，要做模拟
    const req = {header: jest.fn()}; 
    // jest.fn()就是创造了一个普通函数function foo(){}但里面什么也没做，它还给这个函数加了一系列的监控器
    // 监控器：当我们调用这个函数的时候，可以检测这个函数被调用的时候传入了哪些参数。还可以检测这个函数是否被调用，总共被调用了多少次。还可以模拟这个函数进行什么样的返回，还可以模拟当它接收什么样的参数进行什么样的返回
    const res = {sendStatus: jest.fn()};
    const next = jest.fn(); // 直接调用它

    authGuard(req, res, next);

    expect(req.header).toHaveBeenCalledWith('Authorization');
    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it('should call next when token is valid', () => {
    const token = 'xxxxxx';
    const req = {header: jest.fn().mockReturnValue(`Bearer ${token}`)}; 
    const res = {sendStatus: jest.fn()};
    const next = jest.fn();
    const payload = {};
    validateToken.mockImplementation((token) => {
      return payload;
    });

    authGuard(req, res, next);

    expect(validateToken).toHaveBeenCalledWith(token); // 这个可以写在专门测validateToken的测试里
    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalled();
  });
});