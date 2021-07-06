const swaggerUi = require('swagger-ui-express');
const swaggereJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'Beaver Block Express Service with Swagger',
            version: '1.0.0',
            description: 'a Rest Api usting swagger and express',
        },
        host: 'localhost:8080',
        basePath: '/'
    },
    apis: ['./router/*.js', './model/*.js']
};

const specs = swaggereJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};