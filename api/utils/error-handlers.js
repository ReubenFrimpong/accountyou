exports.globalErrorHandler = (err, req, res, next) => {
  if(err.isOperational){
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    // TODO log error to file
    console.error('Error: ', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong'
    });
  }
}