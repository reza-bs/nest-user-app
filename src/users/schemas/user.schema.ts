// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// @Schema()
// export class User {
//   @Prop()
//   firstName: string;

//   @Prop()
//   lastName: string;

//   @Prop()
//   email: string;

//   @Prop()
//   password: string;
// }

// export const CatSchema = SchemaFactory.createForClass(User);

import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    dropDups: true
  },
  password: String,
});
