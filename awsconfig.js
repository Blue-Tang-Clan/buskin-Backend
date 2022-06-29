require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');

aws.config.update({
  secretAccessKey: process.env.KEY,
  accessKeyId: process.env.ID,
  region: process.env.REGION,
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

const uploadImage = (req, res) => (
  new Promise((resolve, reject) => {
    upload.single('image')(req, res, (err, some) => {
      if (err) {
        reject(err);
      } else {
        resolve(req.file.location);
      }
    });
  })
);

module.exports = uploadImage;
