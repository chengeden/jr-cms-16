function sum(a,b) {
  return a + b;
}

// 描述测什么东西，第一个参数是测什么，第二个参数是callback function，它里写具体的测试用例
describe('sum function', () => {
  // 第一个参数是test scenario 测试场景，后面callback function是具体的测试逻辑
  // 这里可以用it()也可以用text('xxxx',()=>{})，it或是test两个都可以
  it('should return the correct sum of two numbers', () => {
    // 测试逻辑有三点：1. setup 初始化 - 这里没有。
    // 2. 具体执行测试对象：这里是调用sum
    const result = sum(1,2);

    // 3. 比较：结果是否等于我们的预期值
    expect(result).toBe(3);
  });

  // error case
  // eg. undefined
});