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

  console.log (req.body)
  const {
    sourceLang,
    targetLang,
    sourceFile,
  } = req.body;

  const newTranslation = {
    sourceLang,
    targetLang,
    sourceFile,
  };
  // var child;
  // console.log (child)
  // cmd1 = 'python3 TransCoder/translate.py --src_lang python --tgt_lang java --BPE_path TransCoder/data/BPE_with_comments_codes --model_path model_2.pth < fibo.py'
  // cmd1 = 'python3 TransCoder/translate.py --src_lang '+sourceLang+' --tgt_lang '+targetLang+' --BPE_path TransCoder/data/BPE_with_comments_codes --model_path model_2.pth < cat ../frontend/src/files/public/uploads/'+ sourceFile
  //cmd1 = 'cat ../frontend/src/files/public/uploads/'+sourceFile
  //cmd1 = 'python3 /home/gcloud/TransCoder/translate.py --src_lang '+sourceLang+' --tgt_lang '+targetLang+ ' --BPE_path /home/gcloud/TransCoder/data/BPE_with_comments_codes --model_path /home/gcloud/model_2.pth < ../frontend/src/files/public/uploads/'+sourceFile //Python to Java
  cmd1 = 'python3 /home/gcloud/TransCoder/translate.py --src_lang '+sourceLang+' --tgt_lang '+targetLang+ ' --BPE_path /home/gcloud/TransCoder/data/test_dataset/python-r-.with_comments/codes --model_path /output_folder_path/bt_with_comments_sa_final_modif_test/4llv5eegzl/checkpoint.pth < ../frontend/src/files/public/uploads/'+sourceFile   //Python to R
  // var cmdout
  // const util = require('util');
  // const exec = util.promisify(require('child_process').exec);
  // async function getOut(cmd) {
  //   try {
  //     const { stdout, stderr } = await exec(cmd);
  //     console.log('stdout:', stdout);
  //     console.log('stderr:', stderr);
  //     return stdout
  //   } catch (err) {
  //     console.error(err);
  //  };
  // }
  // cmdout = getOut(cmd1)
  // const { spawn } = require('child_process');
  // const child = spawn('ls', );
  // child.stdout.pipe(cmdout)
  // const exec = require('child_process').exec
  // console.log (exec)
  // child = exec (cmd1,
  //                     function (error,stdout,stderr) {
  //                       console.log ('stdout: '+stdout)
  //                       console.log ('stderr: '+stderr)
  //                       if (error != null) {
  //                         console.log ("exec error: "+error)
  //                       }
  //                       // setTranslatedContent(stdout)
  //                     }
  // )
  // // res.json (stdout)
  // console.log ('cmdout is',cmdout)
  try {
      // console.log("req", req)
      const user = await User.findOne({ _id: req.user.id });
      // console.log(user)
      user.translations.unshift(newTranslation); 
      await user.save();
      // res.json(user);
      const exec = require('child_process').exec
      console.log (exec)
      child = exec (cmd1,
                      function (error,stdout,stderr) {
                        console.log ('stdout: '+stdout)
                        console.log ('stderr: '+stderr)
                        if (error != null) {
                          console.log ("exec error: "+error)
                        }
                        res.json(stdout)
                      }
      )
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});



module.exports = router

