// app/students/routes/index.js
const {
  getUsersList, 
  getUserByIdController, 
  createUserController,
  getStudentsList, 
  getStudentByIdController, 
  createStudentController,
  getAttendanceList, 
  markAttendanceController
} = require('../../../controllers/controller');

const {
  usersSchema, 
  studentsSchema, 
  attendanceSchema
} = require('../../../schema/schema');

module.exports = async function(fastify, options) {
  // User routes
  fastify.route({
    method: 'GET',
    url: '/users',
    schema: {
      response: {
        200: usersSchema.response
      }
    },
    handler: getUsersList
  });
  
  fastify.route({
    method: 'GET',
    url: '/users/:id',
    handler: getUserByIdController
  });
  
  fastify.route({
    method: 'POST',
    url: '/users',
    schema: usersSchema,
    handler: createUserController
  });
  
  // Student routes
  fastify.route({
    method: 'GET',
    url: '/students',
    handler: getStudentsList
  });
  
  fastify.route({
    method: 'GET',
    url: '/students/:id',
    handler: getStudentByIdController
  });
  
  fastify.route({
    method: 'POST',
    url: '/students',
    schema: studentsSchema,
    handler: createStudentController
  });
  
  // Attendance routes
  fastify.route({
    method: 'GET',
    url: '/attendance',
    handler: getAttendanceList
  });
  
  fastify.route({
    method: 'POST',
    url: '/attendance',
    schema: attendanceSchema,
    handler: markAttendanceController
  });
};