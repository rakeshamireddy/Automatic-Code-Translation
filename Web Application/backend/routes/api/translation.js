const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');

// @route  PUT /api/translation
// @Desc   start translation
// @access Private

router.put('/', [auth, [
  check('sourceLang', 'Please enter language of the source program').not().isEmpty(),
  check('targetLang', 'Please enter language of the target program').not().isEmpty(),
]], async(req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  const {
    sourceLang,
    targetLang,
  } = req.body;

  const newTranslation = {
    sourceLang,
    targetLang,
  };
  try {
      // console.log("req", req)
      const user = await User.findOne({ _id: req.user.id });
      // console.log(user)
      user.translations.unshift(newTranslation);
      await user.save();
      res.json(user);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});



module.exports = router

