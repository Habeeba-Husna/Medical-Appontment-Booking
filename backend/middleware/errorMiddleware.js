// export const notFound = (req, res, next) => {
//     const error = new Error(`Not Found - ${req.originalUrl}`);
//     res.status(404);
//     next(error);
//   };
  

  
// export const errorHandler = (err, req, res, next) => {
//     const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
//     res.status(statusCode);
//     res.json({ message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : null });
//   };
  

const errorHandler = (err, req, res, next) => {
  console.error("❌ Error:", err.message);
  
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ error: `File upload error: ${err.message}` });
  }

  if (err.message.includes('Invalid file format')) {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal server error" });
};

export default errorHandler;
