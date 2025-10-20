const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

// Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

module.exports.upload = (req, _, next) => {
  if (req.file) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { folder: 'personal-one' }, 
          (error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      try {
        let result = await streamUpload(req);
        console.log(result);  // Để debug
        req.body[req.file.fieldname] = result.secure_url;
        next();  // Next sau success
      } catch (error) {
        console.error('Upload error:', error);
        next(error);  // Hoặc res.status(500).json({ error }); nếu là handler
      }
    }
    upload(req);
  } else {
    next();  
  }
};