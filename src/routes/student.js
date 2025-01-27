const express = require('express');
const { 
  getAllStudents, 
  getStudentById, 
  updateStudentById, 
  deleteStudentById, 
  addStudent, 
  addStudentToCourse, 
  removeStudentFromCourse 
} = require('../controllers/student');
const adminGuard = require('../middleware/adminGuard');

const studentRouter = express.Router();

// curring function 
// high order function
// function tryCatch(routeHandler) {
//   return async (req, res, next) => {
//     try {
//       await routeHandler(req, res, next);
//     } catch (e) {
//       res.json(e);
//       // next(e);
//     }
//   };
// }

studentRouter.get('', getAllStudents);
studentRouter.get('/:id', getStudentById);
studentRouter.put('/:id', updateStudentById);
studentRouter.delete('/:id', deleteStudentById);
// studentRouter.post('', tryCatch(addStudent));
// studentRouter.post('', adminGuard, addStudent);
studentRouter.post('', addStudent); // 为了测试方便，先把adminGuard去掉
studentRouter.post('/:id/courses/:code', addStudentToCourse); // 这里的变量(id/code)一定要和controller里提取出来的变量一致
studentRouter.delete('/:id/courses/:code', removeStudentFromCourse);

module.exports = studentRouter;