class HttpError extends Error {
    constructor(message, errorCode, successStatus = false) {
      super(message);
      this.code = errorCode;
      this.success = false;
    }
  }
  
  module.exports = HttpError;
  