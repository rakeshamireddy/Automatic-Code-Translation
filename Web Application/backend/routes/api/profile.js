const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route GET /api/translations/me
// @desc Get current profile translations
// @access Private Route

router.get('/me', auth, async (req, res) => {
  try{
    const user = await (await User.findOne({_id: req.user.id})).populated('user', ['name', 'avatar'])
    const translations = await user.translations
    if (translations.length === 0) return res.status(400).json({msg: 'There are no translations doen yet'})

    // if(!user){
    //   return res.status(500).json({msg : "There is no userdetails"})
    // }
    res.json(translations)
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

module.exports = router