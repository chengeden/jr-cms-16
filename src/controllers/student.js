const Student = require('../models/student');
const Course = require('../models/course')

async function getAllStudents(req, res) {
  // db.student.find() mongo shell的方法，这里就把db.student变成model名字Student
  // find() 是一个 query
  // query chain 就可以在后面加别的东西了 Student.find().sort().limit()
  // .sort().limit() -> 可以用来做 pagination
  const students = await Student.find().select('firstName lastName').exec(); // 官方建议结尾加exec()，表示前面的query已经串联完毕可以被执行了
  // 这是异步操作所以加上await，还要function前面加async
  // const query = Student.find();
  // if (process.env.NODE_ENV === 'production') {
  //   query.select('firstName lastName');
  // }
  // const students = await query.exec();

  /** 所有的数据返回要有一个标准的格式
   * {
   *  data: [],
   *  error: "",
   *  message: ""
   * }
   * -->
   * res.json({ data: students })
   */
  return res.json(students);
}

async function getStudentById(req, res) {
  const { id } = req.params;
  // const student = await Student.findOne({_id:id});
  const student = await Student.findById(id).exec();
  if (!student) {
    return res.status(404).json({ error: "student not found" });
  }
  return res.json(student);
}

async function addStudent(req, res) {
  const { firstName, lastName, email } = req.body;
  // data validation
  const student = new Student({ firstName, lastName, email }) // 通过Student model创建一个新的document
  // try {
    await student.save();
    return res.status(201).json(student);
  // } catch(e) {
  //   return res.status(400).json(e);
  //   // next(e); // 也可以写在next()
  // }
}

async function updateStudentById(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  // data validation
  const student = await Student.findByIdAndUpdate(
    id, 
    { firstName, lastName, email }, 
    { new: true } // new: true 返回更新后的数据，不加它就返回更新前的数据
    // { new: true,  runValidators: true } 
  ).exec();
  if (!student) {
    // return next(new DocumentNotFound('student', '_id')); // 自己创建的error middleware
    return res.status(404).json({ error: "student not found" });
  }
  return res.json(student);
}

async function deleteStudentById(req, res) {
  const { id } = req.params;
  const student = await Student.findByIdAndDelete(id).exec();
  if (!student) {
    return res.status(404).json({ error: "student not found" });
  }
  // 删除学生后，要把和他相关联的课程更新
  await Course.updateMany({ students: id }, { $pull: { students: id } }).exec();
  return res.sendStatus(204);
}

async function addStudentToCourse(req, res) {
  const { id, code } = req.params;
  const course = await Course.findById(code).exec();
  let student = await Student.findById(id).exec();
  if (!student || !course) {
    return res.status(404).json({ error: "student or course not found" });
  }
  // student.courses.addToSet(code);
  // await student.save();
  student = await Student.findByIdAndUpdate( // 把student改成let，修改student内容
    id,
    { $push: { courses: code } },
    { new: true }
  ).exec();

  course.students.addToSet(id);
  await course.save();
  // 可以把上面的逻辑抽到 course service里，然后调用
  // 上面的代码除了从params里面取值以外，其他的都应该写去service里去，student的写在student service里，course的在course service
  // controller里除了取数据和发数据以外，其他都可以放在service层。有时有service层存在，很有可能controller被省略不写把controller和router层合并，但还是叫controller

  return res.json(student);
}

async function removeStudentFromCourse(req, res) {
  const { id, code } = req.params;
  const course = await Course.findById(code).exec();
  let student = await Student.findById(id).exec();
  if (!student || !course) {
    return res.status(404).json({ error: "student or course not found" });
  }
  // student.courses.includes(code) // 要检查下学生是否包含课程，如果两者没有联系，就不需要后面执行了
  student = await Student.findByIdAndUpdate(
    id,
    { $pull: { courses: code } },
    { new: true }
  ).exec();
  await Course.findByIdAndUpdate(code, { $pull: { students: id } }).exec();

  return res.json(student);
}

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudentById,
  deleteStudentById,
  addStudentToCourse,
  removeStudentFromCourse
};