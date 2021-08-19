import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserSchema } from './../../schemas/user.schema';
import { closeInMongodConnection, rootMongooseTestModule } from './../../utils/MongooseTestModule';
import { UsersService } from './users.service';

// class UserModel {
//   constructor(private data){}
//   getUsers = jest.fn().mockResolvedValue(this.data);
// }

describe('UsersService', () => {
  let service: UsersService;

  const fakeProductModel = jest.fn();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        // JwtModule.register({
        //   secret: 'secret',
        //   signOptions: { expiresIn: '1d' },
        // }),
      ],
      providers: [
        {
          provide: getModelToken('User'),
          useValue: fakeProductModel,
        },
        {
          provide: APP_GUARD,
          useClass: JwtAuthGuard,
        },
        UsersService,
        JwtService,
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async ()=>{
    await closeInMongodConnection();
  })
});
