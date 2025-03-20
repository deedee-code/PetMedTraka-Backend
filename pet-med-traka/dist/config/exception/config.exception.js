"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConflictException = exports.AuthorizationException = exports.AuthenticationException = exports.NotFoundException = exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.HttpException {
    constructor(errors) {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: 'Validation failed',
            errors,
        }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.ValidationException = ValidationException;
class NotFoundException extends common_1.HttpException {
    constructor(resource, id) {
        super({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: `${resource} with id ${id} not found`,
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.NotFoundException = NotFoundException;
class AuthenticationException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            message: 'Authentication failed',
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.AuthenticationException = AuthenticationException;
class AuthorizationException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            message: 'Permission denied',
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.AuthorizationException = AuthorizationException;
class ConflictException extends common_1.HttpException {
    constructor(message) {
        super({
            statusCode: common_1.HttpStatus.CONFLICT,
            message,
        }, common_1.HttpStatus.CONFLICT);
    }
}
exports.ConflictException = ConflictException;
//# sourceMappingURL=config.exception.js.map