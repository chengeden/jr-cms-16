module.exports = {
  preset: '@shelf/jest-mongodb',
  // globalSetup: '路径' // setup 和 teardown 放在单独的文件里，整体的测试前开数据库结束后关闭数据库，可以不用在每一个文件里beforeAll afterAll了
};