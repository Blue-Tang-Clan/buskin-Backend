require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: '2YovbvDUXPh/QsajS7z0r6ulxDUz7KLlVYKFRchM',
  accessKeyId: 'AKIAVN3TKKT7IWKYWDQ5',
  region: 'us-east-1',
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'imagesbluetang',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
});

// const uploadImage = new Promise((resolve, reject) => {
//   upload.single('image')(req, res, (err, some) => {
//     if (err) {
//       reject(err);
//     } else {
//       resolve('');
//     }
//   })
// })

module.exports = upload;
