// import express from 'express';
// import { upload } from '../config/cloudinaryConfig.js';
// // import errorHandler from '../middleware/errorMiddleware.js';
// import { registerPatient, 
//          registerDoctor, 
//          loginUser ,
//          refreshToken ,
//          forgotPassword, 
//          resetPassword,
//          adminLogin,
//          } from '../controllers/authController.js';



// const router = express.Router();

// // Patient and Doctor 

// router.post('/patient-register', registerPatient);

// router.post('/doctor-register',upload.array('documents'),(req, res, next) => {
//       // console.log("Files after multer:", req.files);
//       next();
//  }, registerDoctor);
 
// router.post('/login', loginUser);
// // router.post('/refreshtoken', refreshToken);
// router.post('/auth/refresh', refreshToken);

// router.post('/forgot-password', forgotPassword);
// router.post('/reset-password', resetPassword);

// // Admin

// router.post('/admin-login', adminLogin);
// export default router;













import express from 'express';
import {
  registerPatient,
  loginUser,
  refreshToken,
  logoutUser
} from '../controllers/authController.js';

const router = express.Router();

router.post('/register', registerPatient);
router.post('/login', loginUser);
router.post('/refresh', refreshToken);
router.post('/logout', logoutUser);

export default router;