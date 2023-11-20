const router = require('express').Router();

const Message = require('../../models/message');
const User = require('../../models/user');
const jwt = require('../../utils/jwt');
const moderate = require('../../utils/moderation');

router.put('/report/:id/flag', jwt.authenticateToken, async (req, res, next) => {
    let message = await Message.findById(req.params.id);
    if (message.isFlagged) {
        res.status(403).send({ message: 'Message has already been moderated'})
        return;
    }
    if (await moderate(message)) {
        message = await Message.findByIdAndUpdate(req.params.id, { $set: { isVisible: false }}, {
            new: true,
            omitUndefined: true
        });
    } else {
        const users = await User.find().limit(3);
        message = await Message.findByIdAndUpdate(req.params.id, { $set: { moderators: users }})
    }
    res.json(message);
});

module.exports = router;
