import { HttpException } from '@nestjs/common';
export declare class ValidationException extends HttpException {
    constructor(errors: any);
}
export declare class NotFoundException extends HttpException {
    constructor(resource: string, id: string);
}
export declare class AuthenticationException extends HttpException {
    constructor();
}
export declare class AuthorizationException extends HttpException {
    constructor();
}
export declare class ConflictException extends HttpException {
    constructor(message: string);
}
