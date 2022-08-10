class HttpError extends Error {
    constructor(message, errorCode, success = false) {
      super(message);
      this.code = errorCode;
      this.success = success;
    }
  }
  
  module.exports = HttpError;
  