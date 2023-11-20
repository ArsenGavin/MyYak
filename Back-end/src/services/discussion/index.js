const router = require('express').Router();
const { omit } = require('lodash');
const jwt = require('../../utils/jwt');
const Discussion = require('../../models/discussion');
const Message = require('../../models/message');
const redditAlgo = require('../../utils/redditAlgo');


router.get('/discussion/:zoneId/zone/hot', jwt.authenticateToken, async (req, res, next) => {
  const hotMessages = await new Promise((res) => Discussion.mapReduce(redditAlgo, function (err, results) {
    if (err) throw err;
    res(results.results)
  }))

  res.status(200).send(JSON.stringify(hotMessages.map(message => ({
    ...omit(message, '_id'),
    score: message._id,
  }))));
});

router.get('/discussion/:zoneId/zone', jwt.authenticateToken, async (req, res, next) => {
  const { id } = req.query;
  const { zoneId } = req.params;

  res.send(id ? await Discussion.findById(id).populate('authorId', '_id username').populate('messages', '_id')
    : await Discussion.find({ zoneId: zoneId }).populate('authorId', '_id username')
      .populate('messages', '_id')
      .sort({ createdAt: "desc" }));
});

router.post('/discussion', jwt.authenticateToken, async (req, res, next) => {
  const { title, zoneId, firstMessageContent } = req.body;
  const authorId = req.authenticatedUser.id;

  if (!title) {
    res.status(400).send('Not title provided');
  }

  try {
    let firstMessage = '';

    if (firstMessageContent) {
      firstMessage = await Message.create({
        authorId,
        content: firstMessageContent,
        ups: [authorId],
      });

      console.log('Message created:', firstMessage);
    }

    const discussion = await Discussion.create({
      authorId,
      title,
      zoneId,
      ups: [authorId],
      ...(firstMessage && { messages: [firstMessage._id] }),
    });

    console.log('Discussion created:', discussion);
  } catch (err) {
    console.error(res.json(err.errors.message));
    res.status(500).send();
  }

  res.status(201).send();
});

router.put('/discussion/:id', jwt.authenticateToken, async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send('Discussion id missing');
  } else {
    const { discussion, type, userId } = req.body;
    res.send(
      await Discussion.findByIdAndUpdate(req.params.id, {
        $set: {
          title: req.body.title,
          vote: req.body.vote
        }
      }, {
        new: true,
        omitUndefined: true
      })
    )
  }

});

router.patch('/discussion', async (req, res, next) => { });

router.delete('/discussion/:id', jwt.authenticateToken, async (req, res, next) => {
  req.params.id ? res.send(await Discussion.findByIdAndRemove(req.params.id)) : res.status(400).send('Discussion id missing');
});

module.exports = router;
