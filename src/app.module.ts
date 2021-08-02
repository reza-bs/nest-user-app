import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';


@Module({
  // imports: [UsersModule],
  imports: [
    UsersModule,
    MongooseModule.forRoot('mongodb://localhost/users_manager')
    
  ],
})

export class AppModule {}
