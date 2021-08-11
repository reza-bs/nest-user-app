import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LoggingInterceptor } from './shared/logging.interceptor';


@Module({
  // imports: [UsersModule],
  imports: [

  UsersModule,
    MongooseModule.forRoot('mongodb://localhost/users_manager'),
    AuthModule
    
  ],
  providers:[
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ]
})

export class AppModule {}
