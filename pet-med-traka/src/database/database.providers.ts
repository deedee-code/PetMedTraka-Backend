import { ConfigType } from '@nestjs/config';
import { Connection, createConnection } from 'mongoose';
import databaseConfig from '../config/database.config';

export const DatabaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (
      dbConfig: ConfigType<typeof databaseConfig>,
    ): Promise<Connection> => {
      const retryConnect = async (attempt = 1): Promise<Connection> => {
        try {
          const connection = createConnection(dbConfig.uri, dbConfig.options);
          await connection.asPromise(); // Wait for the connection to0 be readyy
          console.log('Successfully connected to MongoDB.');
          return connection;
        } catch (error: unknown) {
          if (attempt === dbConfig.retry.retries) {
            const errorMessage =
              error instanceof Error ? error.message : 'Unknown error';
            throw new Error(
              `Failed to connect to MongoDB after ${attempt} attempts: ${errorMessage}`,
            );
          }
          console.log(
            `Connection attempt ${attempt} failed. Retrying in ${dbConfig.retry.delay}ms...`,
          );
          await new Promise((resolve) =>
            setTimeout(resolve, dbConfig.retry.delay),
          );
          return retryConnect(attempt + 1);
        }
      };

      return retryConnect();
    },
    inject: [databaseConfig.KEY],
  },
];
