// // controllers/controller.js
// const {
//   getUsers, getUserById, createUser,
//   getStudents, getStudentById, createStudent,
//   getAttendance, markAttendance
// } = require('../services/service');

// // User Controllers
// async function getUsersList(request, reply) {
//   try {
//     const result = await getUsers();
//     return reply.code(200).send(result);
//   } catch (error) {
//     console.error('Error in getUsersList:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// async function getUserByIdController(request, reply) {
//   try {
//     const { id } = request.params;
//     const result = await getUserById(parseInt(id));
//     if (!result) {
//       return reply.code(404).send({ error: 'User not found' });
//     }
//     return reply.code(200).send(result);
//   } catch (error) {
//     console.error('Error in getUserByIdController:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// async function createUserController(request, reply) {
//   try {
//     const result = await createUser(request.body);
//     return reply.code(201).send(result);
//   } catch (error) {
//     console.error('Error in createUserController:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// // Student Controllers
// async function getStudentsList(request, reply) {
//   try {
//     const result = await getStudents();
//     return reply.code(200).send(result);
//   } catch (error) {
//     console.error('Error in getStudentsList:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// async function getStudentByIdController(request, reply) {
//   try {
//     const { id } = request.params;
//     const result = await getStudentById(parseInt(id));
//     if (!result) {
//       return reply.code(404).send({ error: 'Student not found' });
//     }
//     return reply.code(200).send(result);
//   } catch (error) {
//     console.error('Error in getStudentByIdController:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// async function createStudentController(request, reply) {
//   try {
//     const result = await createStudent(request.body);
//     return reply.code(201).send(result);
//   } catch (error) {
//     console.error('Error in createStudentController:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// // Attendance Controllers
// async function getAttendanceList(request, reply) {
//   try {
//     const result = await getAttendance();
//     return reply.code(200).send(result);
//   } catch (error) {
//     console.error('Error in getAttendanceList:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// async function markAttendanceController(request, reply) {
//   try {
//     const recordedBy = 1; // Default admin user ID
//     const result = await markAttendance(request.body, recordedBy);
//     return reply.code(201).send(result);
//   } catch (error) {
//     console.error('Error in markAttendanceController:', error);
//     return reply.code(500).send({ error: 'Internal Server Error' });
//   }
// }

// module.exports = {
//   getUsersList,
//   getUserByIdController,
//   createUserController,
//   getStudentsList,
//   getStudentByIdController,
//   createStudentController,
//   getAttendanceList,
//   markAttendanceController
// };




// controllers/controller.js
const {
  // User functions
  getUsers, getUserById, createUser, updateUser, deleteUser,
  
  // Student functions
  getStudents, getStudentById, getStudentByRollNo, createStudent, updateStudent, deleteStudent,
  
  // Attendance functions
  getAttendance, getAttendanceByStudentId, getAttendanceByDate, markAttendance, bulkMarkAttendance, deleteAttendance,
  
  // Statistics functions
  getAttendanceStats, getMonthlyAttendance
} = require('../services/service');

// User Controllers
async function getUsersList(request, reply) {
  try {
    const result = await getUsers();
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getUsersList:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function getUserByIdController(request, reply) {
  try {
    const { id } = request.params;
    const result = await getUserById(parseInt(id));
    if (!result) {
      return reply.code(404).send({ error: 'User not found' });
    }
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getUserByIdController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function createUserController(request, reply) {
  try {
    const result = await createUser(request.body);
    return reply.code(201).send(result);
  } catch (error) {
    console.error('Error in createUserController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function updateUserController(request, reply) {
  try {
    const { id } = request.params;
    const result = await updateUser(parseInt(id), request.body);
    if (!result) {
      return reply.code(404).send({ error: 'User not found' });
    }
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in updateUserController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function deleteUserController(request, reply) {
  try {
    const { id } = request.params;
    const result = await deleteUser(parseInt(id));
    if (!result) {
      return reply.code(404).send({ error: 'User not found' });
    }
    return reply.code(200).send({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUserController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

// Student Controllers
async function getStudentsList(request, reply) {
  try {
    const result = await getStudents();
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getStudentsList:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function getStudentByIdController(request, reply) {
  try {
    const { id } = request.params;
    const result = await getStudentById(parseInt(id));
    if (!result) {
      return reply.code(404).send({ error: 'Student not found' });
    }
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getStudentByIdController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function createStudentController(request, reply) {
  try {
    const result = await createStudent(request.body);
    return reply.code(201).send(result);
  } catch (error) {
    console.error('Error in createStudentController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function updateStudentController(request, reply) {
  try {
    const { id } = request.params;
    const result = await updateStudent(parseInt(id), request.body);
    if (!result) {
      return reply.code(404).send({ error: 'Student not found' });
    }
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in updateStudentController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function deleteStudentController(request, reply) {
  try {
    const { id } = request.params;
    const result = await deleteStudent(parseInt(id));
    if (!result) {
      return reply.code(404).send({ error: 'Student not found' });
    }
    return reply.code(200).send({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error in deleteStudentController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

// Attendance Controllers
async function getAttendanceList(request, reply) {
  try {
    const result = await getAttendance();
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getAttendanceList:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function getAttendanceByStudentController(request, reply) {
  try {
    const { studentId } = request.params;
    const result = await getAttendanceByStudentId(parseInt(studentId));
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getAttendanceByStudentController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function markAttendanceController(request, reply) {
  try {
    const recordedBy = 1; // Default admin user ID (from JWT in real app)
    const result = await markAttendance(request.body, recordedBy);
    return reply.code(201).send(result);
  } catch (error) {
    console.error('Error in markAttendanceController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

async function bulkMarkAttendanceController(request, reply) {
  try {
    const recordedBy = 1; // Default admin user ID
    const result = await bulkMarkAttendance(request.body, recordedBy);
    return reply.code(201).send(result);
  } catch (error) {
    console.error('Error in bulkMarkAttendanceController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

// Statistics Controllers
async function getStatsController(request, reply) {
  try {
    const result = await getAttendanceStats();
    return reply.code(200).send(result);
  } catch (error) {
    console.error('Error in getStatsController:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
}

module.exports = {
  // User controllers
  getUsersList,
  getUserByIdController,
  createUserController,
  updateUserController,
  deleteUserController,
  
  // Student controllers
  getStudentsList,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController,
  
  // Attendance controllers
  getAttendanceList,
  getAttendanceByStudentController,
  markAttendanceController,
  bulkMarkAttendanceController,
  
  // Statistics controllers
  getStatsController
};