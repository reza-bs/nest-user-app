import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({

  firstName: String,
  lastName: String,
  email: {
    type: String,
  },
  password: String,
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});
