const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const path = require('path');
const multer = require('multer');
const { ObjectId } = require('mongodb');

const filestorage = multer.diskStorage({
  destination: `${path.join(__dirname, '../../../frontend/src/files')}/public/uploads`,
  filename: (req, file, cb) => {
      cb(
          null, file.originalname,
      );
  },
});

const fileUpload = multer ( {
storage: filestorage,
limits: {fileSize: 1000000000},
fileFilter: function(req, file, cb) {
  console.log('file filter');
  var filetypes = /py/;
  var mimetype = filetypes.test(file.mimetype);

  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  console.log('mimetype', mimetype);
  console.log('extname', extname);

  if (mimetype && extname) {
      console.log('mimetype && extname');
      return cb(null, true);
  }
  cb(
      'Error: File upload only supports the following filetypes - ' + filetypes,
  );
}
}
).single('File') // this name has to be consistent with the arg name of file

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// POST : /api/uploadFile
router.post('/',auth, async (req,res)=> {
    console.log ("inside /api/uploadFile")
    console.log ("req is ", req)
    console.log ("req.body is, ",req.body)
    // console.log (req.body.File)
    // console.log ("inside /api/uploadFile, req.File.filename is ", req.File.filename)
    //console.log ("inside /api/uploadFile, req.body is ", req.body)
    console.log ("request user id is", req.user.id)
    await sleep (10000)
    fileUpload (req, res, async (err) => {
      console.log ("req backend", req);
      if (!err) {
        try {
        console.log('inside fileupload, req.File.filename is ', req.file.originalname);
        const user = User.findOneAndUpdate({ _id: req.user.id }, { $set: { 'translations.0.sourceFile': req.file.originalname }}) //{ new: true }
        console.log('query result is', user)
        if (!user) {
          return res.status(400).json({ msg: 'file upload failed'})
        }
        res.json (user)
        } catch (error) {
          console.log ("caught error",error)
          res.status(500).send ("file save error")
        }
      } else {
        console.log ("hit error ",err)
        res.status (500).send ("Server Error")
      }
    });
  });

// /uploadFile - new

// router.post('/',auth, async (req,res)=> {
//   try {
//     console.log('inside backend upload file: ', req.body)
//     console.log('all data: ', req.body)
//     fileUpload(req, res, async(err) => {
//       if (err) {
//         console.log ("uploading file error: ",err)
//         res.status (400).send ('couldnt upload file')
//       } else { 
//         console.log ('file name: ', res.req.File.filename)

//         var data = {
//           file: res.req.File.filename,
//           isPrimary: false,
//         }

//         const user = await User.findByIdAndUpdate({ _id: req.user.id }, { $push: {sourceFile: req.File.filename }}, { new: true },)

//         if (!user) {
//           res.status (400).send ("couldnt upload file")
//         } else { 
//           res.status (200).send (user)
//         }
//       }

//     })
//   } catch (err) {
//     console.error (err.message)
//     res.status (500).send ("Server Error")
//   } 
// })

// router.post('/sourcefile/:id', auth, async (req, res) => {
//     try {
//       let user = await User.findOne({ email: req.user.id });
  
//       if (user) {
//         let newSourceFile = { file, format };
//         newSourceFile.file = req.body.file;
//         newSourceFile.format = req.body.format;
//         user.translations.unshift(newSourceFile);
//         await job.save();
//         res.json('resume added');
//       }
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   });

//   var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       console.log('call back');
//       cb(null, `${path.join(__dirname, '../..')}/public/uploads/files`);
//     },
//     filename: function (req, file, cb) {
//       console.log('cb file name: ', file);
//       cb(null, Date.now() + '_' + file.originalname);
//     },
//   });
  
//   const maxSize = 1 * 10000 * 10000;
  
//   var upload = multer({
//       storage: storage,
//       limits: { fileSize: maxSize },
//       fileFilter: function(req, file, cb) {
//           console.log('file filter');
//           var filetypes = /py/;
//           var mimetype = filetypes.test(file.mimetype);
  
//           var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//           console.log('mimetype', mimetype);
//           console.log('extname', extname);
  
//           if (mimetype && extname) {
//               console.log('mimetype && extname');
//               return cb(null, true);
//           }
//           cb(
//               'Error: File upload only supports the following filetypes - ' + filetypes,
//           );
//       },
//   }).single('sourceFile');


module.exports = router;