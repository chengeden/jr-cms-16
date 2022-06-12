// 如果有service层，model不会暴露在service层以外的地方，只会暴露在service里
const Course = require('../models/course');

// typescript. injection
// class CourseService {

//   addStudentToCourse() {

//   }
// }

async function addStudentToCourse(studentId, courseId) {
  const course = await Course.findByIdAndUpdate(courseId, {
    student: { $push: studentId }
  }, { new: true });
  if (!course) {
    throw new Error('course not found')
  }
  return course;
}

module.exports = {
  addStudentToCourse
}