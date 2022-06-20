const supertest = require('supertest');
const mongoose = require('mongoose');
const Student = require('../../src/models/student'); // 也可以不使用mongoose，使用mongo-client的数据获取、添加操作
const app = require('../../src/app');
const { generateToken } = require('../../src/utils/jwt');

const Token = generateToken({ id: 'fake_id'});

const request = supertest(app); // 用supertest创建一个对象，然后在supertest里把application传给它

const createStudentRequest = async (body) => {
  return request.post('/v1/students').send(body).set('Authorization', `Bearer ${Token}`);
}

describe('/v1/students', () => {
  // hooks -> life cycle method
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('Create', () => {
    beforeEach(async () => {
      await Student.deleteMany({}).exec();
    });
    it('should save the student if request is valid', async () => { // 先测成功的情况，再测错误情况
      const validStudent = {
        firstName: 'xxx',
        lastName: 'yyy',
        email: 'xxx@example.com'
      };
      // const res = await request.post('/v1/students').send(validStudent);
      const res = await createStudentRequest(validStudent); // 通过help function，少写重复代码
      expect(res.statusCode).toBe(201);
      const student = await Student.findOne(validStudent).exec(); // 找不到会返回null
      expect(student).toBeTruthy();
    });

    // it('should return 400 when request is invalid', async () => {
    //   const invalidStudent = {
    //     lastName: 'yyy', // 在json里面什么都不写就是undefined值，所以firstName: undefined;可以不用写
    //     email: 'xxx@example.com'
    //   };
    //   const res = await request.post('/v1/students').send(invalidStudent);
    //   expect(res.statusCode).toBe(400);      
    // });
    // 检测错误的情况，代码只有小部分是不一样的，所以为了不重复代码，可以用package里面的function
    it.each`
      field | value
      ${'firstName'} | ${undefined}
      ${'email'} | ${'abc'}
      ${'firstName'} | ${'a'}
      ${'firstName'} | ${'abcdefghijk'}
    `('should return 400 when $field is $value', async ({field, value}) => {
      const validStudent = {
        firstName: 'xxx',
        lastName: 'yyy',
        email: 'xxx@example.com'
      };
      // 通过一个有效的对象构建一个无效的对象
      const invalidStudent = {
        ...validStudent, 
        [field]: value, // field是一个变量，我们想要这个变量实际的值，不是本身field这个名字。如果直接写field不加[]是意味着给invalidStudent加一个属性叫field然后它的值是实际的值。实际我们是想要的是field它的value作为key，所以要给field加[]。
      };
      // const res = await request.post('/v1/students').send(invalidStudent);
      const res = await createStudentRequest(invalidStudent);
      expect(res.statusCode).toBe(400);      
    });
  });
});