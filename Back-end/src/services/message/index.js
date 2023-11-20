const router = require('express').Router();

const Message = require('../../models/message');
const jwt = require('../../utils/jwt');
const vote_ = require('../../utils/constants');

router.get('/message/:discussionId/discussion', jwt.authenticateToken, async (req, res, next) => {
  const { id } = req.query;
  const { discussionId } = req.params;
  res.send(id ? await Message.find(id).populate('authorId', '_id username')
    : await Message.find({ discussionId: discussionId, isVisible: true })
      .populate('authorId', '_id username')
      .sort({ createdAt: "desc" }));
});

router.get('/message/:id/moderation', jwt.authenticateToken, async (req, res) => {
  const { id } = req.params;

  if (!id || (id && !id.match(/^[0-9a-fA-F]{24}$/))) {
    return res.status(409).send({ message: 'Id is missing or invalid' });
  }
  res.send(await Message.find({
    moderators: { $elemMatch: { $eq: id } }
  }).populate('authorId', '_id username'));
});

router.post('/message', jwt.authenticateToken, async (req, res, next) => {
  const { authorId, content, parentMessageId, ups, discussionId } = req.body;
  if (!authorId || !content || !ups || !discussionId) {
    return res.status(400).send('Arguments are missing');
  }
  const message = await Message.create({ authorId, content, parentMessageId, ups, discussionId });
  res.status(201).send(message);
});

router.put('/message/:id', jwt.authenticateToken, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send('Message id missing');
  }
  res.send(
    await Message.findOneAndUpdate({ _id: req.params.id },
      {
        $set: {
          content: req.body.message.content,
          parentMessageId: req.body.message.parentMessageId ? req.body.message.parentMessageId : undefined,
          votes: req.body.vote,
        }
      }, { new: true, omitUndefined: true })
  )
});

router.put('/message/:id/moderation', jwt.authenticateToken, async (req, res, next) => {
  if (!req.params.id) {
    return res.status(400).send('Message id missing');
  }
  const { vote, userId } = req.body;
  if (!vote || !userId) {
    return res.status(400).send('Vote is missing');
  }
  const message = await Message.findById(req.params.id);

  let value = {};
  if (vote === vote_.YES) {
    if (message.votes && message.votes.yes && message.votes.yes.length === 2) {
      value = {
        isFlagged: true,
        moderators: [],
        isVisible: false,
        $push: { "votes.yes": userId }
      };
    } else {
      value = { $push: { "votes.yes": userId } };
    }
  }
  if (vote === vote_.NO) {
    value = {
      isFlagged: true,
      moderators: [],
      $push: { "votes.no": userId }
    }
  }
  res.send(await Message.findOneAndUpdate({ _id: req.params.id }, value, { new: true, omitUndefined: true }));
});

router.delete('/message/:id', jwt.authenticateToken, async (req, res, next) => {
  req.params.id ? res.send(await Message.findByIdAndRemove(req.params.id)) : res.status(400).send('Message id missing');
});

module.exports = router;
