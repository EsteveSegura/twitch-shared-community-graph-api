const ApplicationError = require('../../application-error');

class InvalidTwitchFollowerError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidTwitchFollowerError';
  }
}

module.exports = InvalidTwitchFollowerError;
