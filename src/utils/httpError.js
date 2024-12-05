// import { NODE_ENV } from "../config/common.mjs";

export class HttpError extends Error {
  /**
   * Creates an instance of HttpError.
   * @param {number} status
   * @param {string} message
   * @memberof HttpError
   */
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
    // if (NODE_ENV === 'development') this.stack = "";
  }
}
