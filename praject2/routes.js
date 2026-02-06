// routes.js
const studentRoutes = require('./app/students/routes');

module.exports = async function(fastify, options) {
    fastify.register(studentRoutes, { prefix: '/api/v1' });
};