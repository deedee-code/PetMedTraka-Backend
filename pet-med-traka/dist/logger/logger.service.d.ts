import { LoggerService } from '@nestjs/common';
export declare class CustomLogger implements LoggerService {
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
}
