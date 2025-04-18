// // middlewares/localMulter.js
// import multer from 'multer';
// import path from 'path';
// import fs from 'fs';

// // Upload directory
// const uploadDir = 'uploads/profile-photos';
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir, { recursive: true });
// }

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     cb(null, `${Date.now()}-${file.fieldname}${ext}`);
//   },
// });

// const localUpload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
//   fileFilter: (req, file, cb) => {
//     const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!validTypes.includes(file.mimetype)) {
//       return cb(new Error('Only JPEG, PNG, and WEBP images are allowed.'));
//     }
//     cb(null, true);
//   },
// });

// export { localUpload };
// import multer from 'multer';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import cloudinary from '../utils/cloudinary.js'

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'profile-photos',
//     allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
//     transformation: [{ width: 500, height: 500, crop: 'limit' }],
//   },
// });

// const cloudinaryUpload = multer({ storage });

// export default cloudinaryUpload;
