const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);
  
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

