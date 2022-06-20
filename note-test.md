unit test 单元测试：就是测一个单元。一个函数就是一个单元，一个函数独立存在就是一个独立的单元。如果只测这一个函数的逻辑但它会调用其他函数就是存在依赖项，就要做模拟mock，mock就是要模拟所有的依赖项，只要是非这个单元之内的逻辑就全都要做模拟，从而保证我们的测试只专注于这个函数里面/单元本身的逻辑，否则就变成集成测试了。用到的最基本测试框架：jest(常用), jasmine, mocha
integration test 集成测试：把多个单元连接在一起测试。一个函数以及它的依赖项一起测试；或是一个请求的测试eg.addStudent请求，先是authGuard然后addStudent函数，函数里面还有数据库。测试框架：supertest
End to End (E2E) test 端到端测试：多个server互相联动的测试或是前端到后端的测试。测试框架：selenium(老牌), cypress(新颖)

mock可能存在于unit test也可能存在于integration test，只要不是测试的对象，就要把它进行mock处理。就是想要返回什么样的结果，就把它模拟成什么样的结果。
测试其实就是为了检测 expected value === result value
每一个测试都有一个Scenario场景，每一个场景都会检测说是有一个预期值，看这个预期值是否是得到的值，如果是检测成功。

测试步骤：
1. setup (initialize, mock). 初始化一些变量还有模拟
2. execute test unit/logic. test unit可以是你执行的这个函数，test logic是一系列的逻辑要处理
3. compare/expect.

black box test 黑盒测试：不知道测试的具体逻辑是什么，只知道应该得到什么返回。尽量要测试edge case，一般出现在传入参数上eg.传入参数可不可以是undefined，字符串长度有无限制
white box test 白盒测试：明确的知道要测试对象的具体逻辑是什么。

两种写test的方式：
1. 放在根目录下，所有测试放在一起
/__tests__/unit/authGuard.test.js (命名时加不加test都可以)
/__tests__/integration/xxxx

2. 跟着逻辑走，把测试文件放在逻辑边上
src/middleware/authGuard.js ->
src/middleware/authGuard/authGuard.js
src/middleware/authGuard/tests/authGuard.test.js
/integration/xxxx

src/services/user/__tests__/integration

写测试的原因是让我们改动代码的时候更自信/放心一些

单元测试：
安装jest package：npm i -D jest -> jest的默认配置是找当前项目下 __tests__ 文件夹或是以 test.js/spec.js 结尾的文件，然后执行这些文件，从而运行里面的测试用例。

部署前也要进行测试
CI是持续集成
CD是部署

在nodejs后端里写unit test的情况只有：
测middleware或是utils function的时候，utils function也只是会测有具体的逻辑，在这里db.js和logger.js就没有测unit test的必要，而jwt.js里也只会测validateToken里面的try catch部分和上面时间部分的问题。只有这两部分是可以当成unit来测试的逻辑，因为他们就是一个函数。
integration test：
controllers的逻辑，这里不用做模拟，连接模拟的数据库，然后返回相应的数据，我们可以检测它是否真实添加了，或是没有添加成功等。

集成测试：
安装supertest package：npm i -D supertest -> 导入supertest 
-> 测试最核心的部分是application，pp里面有哪一些路由，分别连接了哪些逻辑。所以要把入口文件做一个拆分，把app做导出。module.exports = app;
-> 把原本的入口文件改为app.js，然后创建新的入口文件index.js。做测试不需要连接真实数据库和监听端口，所以把连接数据库和端口监听放到新的入口文件里
connectToDB(); app.listen(PORT, () => {logger.info(`server listening on port: ${PORT}`);});
-> 安装模拟数据库jest-mongodb package：npm i @shelf/jest-mongodb -D (https://www.npmjs.com/package/@shelf/jest-mongodb)-> 根目录下创建jest.config.js文件 -> 创建jest-mongodb-config.js文件

如果只运行一个测试文件：npm test 路径

beforeAll,afterAll,beforeEach,afterAll 相关资料：https://jestjs.io/docs/setup-teardown