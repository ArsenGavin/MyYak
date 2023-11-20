const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');

const documentation = require('./swagger.json');

router.use('/swagger', swaggerUi.serve);
router.get('/swagger', swaggerUi.setup(documentation));

module.exports = router;