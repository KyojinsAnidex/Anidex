class HttpError extends Error {
    constructor(message, errorCode) {
      super(message);
      this.code = errorCode;
      this.success = false;
    }
  }
  
  module.exports = HttpError;
  