// const jwt = require('jsonwebtoken');


// exports.generateAccessToken=(user)=>{
//     const payload={id:user._id,email:user.email,role:user.role}
//     return jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'15m'}) //15 minutes short-lived
// }

// exports.generateRefreshToken=(user)=>{
//     const payload={id:user._id}
//     return jwt.sign(payload,process.env.JWT_REFRESH_SECRET,{expiresIn:"7d"}) //7 days issue new access token
// }

// exports.verifyToken=(token,secret)=>{
//     try{
//         return jwt.verify(token,secret)
//     }
//     catch(error){
//         return null
//     }
// }

// import jwt from 'jsonwebtoken';

// const generateAccessToken = (user) => {
//     const role = user instanceof Admin ? 'admin' : user instanceof Patient ? 'patient' : 'doctor';
//     return jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '15m' });
//   };
  
//   // Generate Refresh Token
  
//   const generateRefreshToken = (user) => {
//     const role = user instanceof Admin ? 'admin' : user instanceof Patient ? 'patient' : 'doctor';
//     return jwt.sign({ id: user._id, role }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
//   };
  