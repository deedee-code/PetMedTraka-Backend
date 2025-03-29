// database/schemas/user.schema.provider.ts
import { Connection } from 'mongoose';
import { User, UserSchema } from './schemas/user.schema';

export const userModelProvider = {
  provide: 'USER_MODEL',
  useFactory: (connection: Connection) => {
    // Check if model already exists to prevent OverwriteModelError
    if (connection.models['User']) {
      return connection.models['User'];
    }
    return connection.model<User>('User', UserSchema);
  },
  inject: ['DATABASE_CONNECTION'],
};
