import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string) {
    console.log(`LOG: ${message}`);
  }
  error(message: string, trace: string) {
    console.error(`ERROR: ${message}`, trace);
  }
  warn(message: string) {
    console.warn(`WARN: ${message}`);
  }
  // Add more methods as needed
}
