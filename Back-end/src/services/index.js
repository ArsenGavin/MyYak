const router = require('express').Router();

const user = require('./user');
const zone = require('./zone');
const discussion = require('./discussion');
const message = require('./message');
const auth = require('./auth');
const documentation = require('./documentation');
const report = require('./report');

router.use(user);
router.use(zone);
router.use(discussion);
router.use(message);
router.use(auth);
router.use(documentation);
router.use(report);

module.exports = router;
