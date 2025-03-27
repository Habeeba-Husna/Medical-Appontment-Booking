// import cloudinaryPkg from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';
// import multer from 'multer';
// import dotenv from 'dotenv';

// // Use the correct v2 instance
// const cloudinary = cloudinaryPkg.v2;

// dotenv.config();

// // Cloudinary Configuration with Error Handling
// try {
//   if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
//     throw new Error("Cloudinary configuration missing. Please check your .env file.");
//   }

//   cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//   });

//   console.log("Cloudinary connected successfully.");
// } catch (error) {
//   console.error("Cloudinary Configuration Error:", error.message);
//   process.exit(1); // Exit the process if configuration fails
// }

// // Cloudinary Storage Setup with Error Handling
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const validFormats = ['jpg', 'jpeg', 'png', 'webp'];
//     const extension = file.mimetype.split('/')[1];

//     if (!validFormats.includes(extension)) {
//       throw new Error('Invalid file format. Allowed formats: jpg, jpeg, png, webp');
//     }

//     return {
//       folder: 'documents',
//       format: extension,
//       public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
//     };
//   },
// });

// // Multer Upload Setup with Error Handling
// const upload = multer({ 
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
//   fileFilter: (req, file, cb) => {
//     const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!validFormats.includes(file.mimetype)) {
//       return cb(new Error('Invalid file format. Please upload JPG, JPEG, PNG, or WEBP files.'));
//     }
//     cb(null, true);
//   },
// });

// export { cloudinary, upload };


import cloudinaryPkg from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
import path from 'path';

const cloudinary = cloudinaryPkg.v2;
dotenv.config();

try {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    throw new Error("Cloudinary configuration missing. Check your .env file.");
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  console.log("Cloudinary connected successfully.");
} catch (error) {
  console.error("Cloudinary Configuration Error:", error.message);
  process.exit(1);
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const validFormats = ['jpg', 'jpeg', 'png', 'webp'];
    const extension = file.mimetype.split('/')[1];

    if (!validFormats.includes(extension)) {
      throw new Error('Invalid file format. Allowed formats: jpg, jpeg, png, webp');
    }

    return {
      folder: 'documents',
      format: extension,
      public_id: `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`,
    };
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }, // 5 files max, 5 MB each
  fileFilter: (req, file, cb) => {
    const validFormats = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validFormats.includes(file.mimetype)) {
      return cb(new Error('Invalid file format. Please upload JPG, JPEG, PNG, or WEBP files.'));
    }
    cb(null, true);
  },
});

export { cloudinary, upload };



// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });
  
//   // Create upload middleware
//   const upload = multer({ 
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       // Accept only certain file types
//       const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
//       if (allowedTypes.includes(file.mimetype)) {
//         cb(null, true);
//       } else {
//         cb(new Error('Invalid file type'));
//       }
//     },
//     limits: { fileSize: 10 * 1024 * 1024 } // 10MB
//   });