// export const handleError = (res, error) => {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   };
  

export const handleError = (res, error) => {
  console.error(error);
  res.status(500).json({ 
    success: false,
    message: error.message,
    error: process.env.NODE_ENV === 'development' ? error.stack : undefined,
  });
};

export class ApiError extends Error {
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}