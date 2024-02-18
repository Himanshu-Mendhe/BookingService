const { StatusCodes } = require('http-status-codes')

class ValidationError extends Error {
    constructor(error) {
        super();
        let explanation = [];
        error.errors.froEacf((err) => {
            explanation.push(err.message);
        })
        this.name = 'ValidationError';
        this.message = 'Not Able to validate data sent in the request';
        this.explanetion = explanation;
        this.statusCode = StatusCodes.BAD_REQUEST ;
    }
}

module.exports = ValidationError;