// schema/schema.js
const usersSchema = {
  body: {
    type: 'object',
    required: ['username', 'password', 'role'],
    properties: {
      username: { type: 'string' },
      password: { type: 'string' },
      role: { type: 'string', enum: ['admin', 'teacher', 'student'] }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        username: { type: 'string' },
        role: { type: 'string' },
        created_at: { type: 'string' }
      }
    }
  }
};

const studentsSchema = {
  body: {
    type: 'object',
    required: ['name', 'roll_no'],
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      city: { type: 'string' },
      roll_no: { type: 'string' },
      section: { type: 'string' },
      branch: { type: 'string' }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        phone: { type: 'string' },
        city: { type: 'string' },
        roll_no: { type: 'string' },
        section: { type: 'string' },
        branch: { type: 'string' },
        created_at: { type: 'string' }
      }
    }
  }
};

const attendanceSchema = {
  body: {
    type: 'object',
    required: ['student_id', 'date', 'status'],
    properties: {
      student_id: { type: 'number' },
      date: { type: 'string', format: 'date' },
      status: { type: 'string', enum: ['Present', 'Absent'] }
    }
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        student_id: { type: 'number' },
        date: { type: 'string' },
        status: { type: 'string' },
        recorded_by: { type: 'number' },
        recorded_at: { type: 'string' }
      }
    }
  }
};

module.exports = {
  usersSchema,
  studentsSchema,
  attendanceSchema
};