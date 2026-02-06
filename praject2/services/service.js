// services/services.js
const pool = require('./db');

// User Services
async function getUsers() {
  try {
    const result = await pool.query("SELECT id, username, role, created_at FROM users ORDER BY id");
    return result.rows;
  } catch (error) {
    console.error("Error in getUsers:", error);
    throw error;
  }
}

async function getUserById(id) {
  try {
    const result = await pool.query(
      "SELECT id, username, role, created_at FROM users WHERE id = $1",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in getUserById:", error);
    throw error;
  }
}

async function createUser(userData) {
  try {
    const { username, password, role } = userData;
    const result = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING id, username, role, created_at",
      [username, password, role]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
}

async function updateUser(id, userData) {
  try {
    const { username, password, role } = userData;
    const result = await pool.query(
      "UPDATE users SET username = $1, password = $2, role = $3 WHERE id = $4 RETURNING id, username, role, created_at",
      [username, password, role, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in updateUser:", error);
    throw error;
  }
}

async function deleteUser(id) {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteUser:", error);
    throw error;
  }
}

// Student Services
async function getStudents() {
  try {
    const result = await pool.query("SELECT * FROM students ORDER BY id");
    return result.rows;
  } catch (error) {
    console.error("Error in getStudents:", error);
    throw error;
  }
}

async function getStudentById(id) {
  try {
    const result = await pool.query("SELECT * FROM students WHERE id = $1", [id]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in getStudentById:", error);
    throw error;
  }
}

async function getStudentByRollNo(rollNo) {
  try {
    const result = await pool.query("SELECT * FROM students WHERE roll_no = $1", [rollNo]);
    return result.rows[0];
  } catch (error) {
    console.error("Error in getStudentByRollNo:", error);
    throw error;
  }
}

async function createStudent(studentData) {
  try {
    const { name, phone, city, roll_no, section, branch } = studentData;
    const result = await pool.query(
      `INSERT INTO students (name, phone, city, roll_no, section, branch) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [name, phone, city, roll_no, section, branch]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in createStudent:", error);
    throw error;
  }
}

async function updateStudent(id, studentData) {
  try {
    const { name, phone, city, roll_no, section, branch } = studentData;
    const result = await pool.query(
      `UPDATE students SET name = $1, phone = $2, city = $3, roll_no = $4, section = $5, branch = $6 
       WHERE id = $7 RETURNING *`,
      [name, phone, city, roll_no, section, branch, id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in updateStudent:", error);
    throw error;
  }
}

async function deleteStudent(id) {
  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteStudent:", error);
    throw error;
  }
}

// Attendance Services
async function getAttendance() {
  try {
    const result = await pool.query(`
      SELECT a.*, s.name as student_name, s.roll_no, u.username as recorded_by_name 
      FROM attendance a 
      LEFT JOIN students s ON a.student_id = s.id 
      LEFT JOIN users u ON a.recorded_by = u.id
      ORDER BY a.date DESC, a.id DESC
    `);
    return result.rows;
  } catch (error) {
    console.error("Error in getAttendance:", error);
    throw error;
  }
}

async function getAttendanceByStudentId(studentId) {
  try {
    const result = await pool.query(`
      SELECT a.*, s.name as student_name, s.roll_no, u.username as recorded_by_name 
      FROM attendance a 
      LEFT JOIN students s ON a.student_id = s.id 
      LEFT JOIN users u ON a.recorded_by = u.id
      WHERE a.student_id = $1
      ORDER BY a.date DESC
    `, [studentId]);
    return result.rows;
  } catch (error) {
    console.error("Error in getAttendanceByStudentId:", error);
    throw error;
  }
}

async function getAttendanceByDate(date) {
  try {
    const result = await pool.query(`
      SELECT a.*, s.name as student_name, s.roll_no, u.username as recorded_by_name 
      FROM attendance a 
      LEFT JOIN students s ON a.student_id = s.id 
      LEFT JOIN users u ON a.recorded_by = u.id
      WHERE a.date = $1
      ORDER BY s.name
    `, [date]);
    return result.rows;
  } catch (error) {
    console.error("Error in getAttendanceByDate:", error);
    throw error;
  }
}

async function markAttendance(attendanceData, recordedBy) {
  try {
    const { student_id, date, status } = attendanceData;
    
    // Check if attendance already exists for this student on this date
    const existingRecord = await pool.query(
      "SELECT id FROM attendance WHERE student_id = $1 AND date = $2",
      [student_id, date]
    );
    
    if (existingRecord.rows.length > 0) {
      // Update existing record
      const result = await pool.query(
        `UPDATE attendance SET status = $1, recorded_by = $2, recorded_at = CURRENT_TIMESTAMP 
         WHERE student_id = $3 AND date = $4 RETURNING *`,
        [status, recordedBy, student_id, date]
      );
      return result.rows[0];
    } else {
      // Insert new record
      const result = await pool.query(
        `INSERT INTO attendance (student_id, date, status, recorded_by) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [student_id, date, status, recordedBy]
      );
      return result.rows[0];
    }
  } catch (error) {
    console.error("Error in markAttendance:", error);
    throw error;
  }
}

async function bulkMarkAttendance(attendanceArray, recordedBy) {
  try {
    const results = [];
    
    for (const record of attendanceArray) {
      const { student_id, date, status } = record;
      
      // Check if attendance already exists
      const existingRecord = await pool.query(
        "SELECT id FROM attendance WHERE student_id = $1 AND date = $2",
        [student_id, date]
      );
      
      if (existingRecord.rows.length > 0) {
        // Update existing
        const result = await pool.query(
          `UPDATE attendance SET status = $1, recorded_by = $2, recorded_at = CURRENT_TIMESTAMP 
           WHERE student_id = $3 AND date = $4 RETURNING *`,
          [status, recordedBy, student_id, date]
        );
        results.push(result.rows[0]);
      } else {
        // Insert new
        const result = await pool.query(
          `INSERT INTO attendance (student_id, date, status, recorded_by) 
           VALUES ($1, $2, $3, $4) RETURNING *`,
          [student_id, date, status, recordedBy]
        );
        results.push(result.rows[0]);
      }
    }
    
    return results;
  } catch (error) {
    console.error("Error in bulkMarkAttendance:", error);
    throw error;
  }
}

async function deleteAttendance(id) {
  try {
    const result = await pool.query(
      "DELETE FROM attendance WHERE id = $1 RETURNING id",
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in deleteAttendance:", error);
    throw error;
  }
}

// Dashboard/Statistics Services
async function getAttendanceStats() {
  try {
    const totalStudents = await pool.query("SELECT COUNT(*) FROM students");
    const totalAttendance = await pool.query("SELECT COUNT(*) FROM attendance");
    const todayAttendance = await pool.query(
      "SELECT COUNT(*) FROM attendance WHERE date = CURRENT_DATE"
    );
    
    return {
      totalStudents: parseInt(totalStudents.rows[0].count),
      totalAttendanceRecords: parseInt(totalAttendance.rows[0].count),
      todayRecords: parseInt(todayAttendance.rows[0].count)
    };
  } catch (error) {
    console.error("Error in getAttendanceStats:", error);
    throw error;
  }
}

async function getMonthlyAttendance(month, year) {
  try {
    const result = await pool.query(`
      SELECT 
        date,
        COUNT(*) as total_records,
        COUNT(CASE WHEN status = 'Present' THEN 1 END) as present_count,
        COUNT(CASE WHEN status = 'Absent' THEN 1 END) as absent_count
      FROM attendance 
      WHERE EXTRACT(MONTH FROM date) = $1 AND EXTRACT(YEAR FROM date) = $2
      GROUP BY date
      ORDER BY date
    `, [month, year]);
    
    return result.rows;
  } catch (error) {
    console.error("Error in getMonthlyAttendance:", error);
    throw error;
  }
}

module.exports = {
  // User functions
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  
  // Student functions
  getStudents,
  getStudentById,
  getStudentByRollNo,
  createStudent,
  updateStudent,
  deleteStudent,
  
  // Attendance functions
  getAttendance,
  getAttendanceByStudentId,
  getAttendanceByDate,
  markAttendance,
  bulkMarkAttendance,
  deleteAttendance,
  
  // Statistics functions
  getAttendanceStats,
  getMonthlyAttendance
};