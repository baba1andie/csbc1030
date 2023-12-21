const express = require('express');
const router = express.Router();
const fs = require('fs');

const usersData = JSON.parse(fs.readFileSync('users.json', 'utf-8'));

router.get('/', (req, res, next) => {
  try {
    res.json(usersData);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = usersData.find((user) => user.id === userId);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;