const router = require('express').Router();

const Zone = require('../../models/zone');
const jwt = require('../../utils/jwt');

router.get('/zone', jwt.authenticateToken, async (req, res, next) => {
  const { id } = req.query;
  res.send(id ? await Zone.findById(id) : await Zone.find());
});

router.post('/zone', jwt.authenticateToken, async (req, res, next) => {
  const { name, topX, topY, bottomX, bottomY } = req.body;
  if (!name || !topX || !topY || !bottomX || !bottomY) {
    res.status(400).send('Arguments are missing');
  }
  res.status(201).send(await Zone.create({ name, topX, topY, bottomX, bottomY }));
});

router.put('/zone/:id', jwt.authenticateToken, async (req, res, next) => {
  if (!req.params.id) {
    res.status(400).send('Zone id missing');
  } else {
    res.send(
      await Zone.findByIdAndUpdate(req.params.id,
        {
          $set: {
            name: req.body.name,
            topX: req.body.topX,
            topY: req.body.topY,
            bottomX: req.body.bottomX,
            bottomY: req.body.bottomY
          }
        })
    )
  }
});

router.delete('/zone/:id', jwt.authenticateToken, async (req, res, next) => {
  req.params.id ? res.send(await Zone.findByIdAndRemove(req.params.id)) : res.status(400).send('Zone id missing');
});

module.exports = router;