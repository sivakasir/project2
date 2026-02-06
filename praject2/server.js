// server.js
const fastify = require('fastify');
const routes = require('./routes');
const swagger = require('@fastify/swagger');
const swaggerUi = require('@fastify/swagger-ui');

(async () => {
  try {
    console.log('Starting server...');
    
    const server = fastify({
      logger: {
        level: 'info',
        // transport: {
        //   target: 'pino-pretty'
        // }
      }
    });

    // Swagger configuration - Register swagger first
    await server.register(swagger, {
      swagger: {
        info: {
          title: 'Student Management API',
          description: 'API documentation for Student Management System',
          version: '1.0.0'
        },
        host: 'localhost:1000',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        securityDefinitions: {
          ApiToken: {
            description: 'Authorization header token, sample: "Bearer #TOKEN#"',
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
          }
        }
      }
    });

    // Swagger UI configuration
    await server.register(swaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false
      },
      staticCSP: true
    });

    // Register routes - Fix the circular dependency
    server.register(routes);

    // Health check route
    server.get('/status', async (request, reply) => {
      return { status: 'OK', message: 'Server is running' };
    });

    // Start server
    await server.ready();
    server.swagger();
    
    await server.listen({ 
      port: 1000, 
      host: '127.0.0.1' 
    });
    
    console.log('Server is running on http://127.0.0.1:1000');
    console.log('Swagger docs available on http://127.0.0.1:1000/docs');
    
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
})();