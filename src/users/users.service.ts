import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async getUsers() {
    const users = await this.userModel.find().select('-password').exec();
    if (!users && !users[0]) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }
    return users;
  }

  public async getUserById(id) {
    console.log(id.id);
    const user = await this.userModel
      .findOne({ _id: id.id })
      .select('-password')
      .exec();
    console.log('result:', user);
    if (!user) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }

    return user;
  }

  public async createUser(newUser) {

    try{
      const { firstName, lastName, email, password } = newUser;
      const newPassword = await bcrypt.hash(password, 10);

      const emailExists = await this.userModel.find({ email });
      // console.log(emailExists)

      if (emailExists && emailExists[0]) {
        throw new NotAcceptableException();
        // return 'mail already exists';
      }

      const user = await new this.userModel({
        firstName,
        lastName,
        email,
        password: newPassword,
      });

      await user.save();
      return {
        firstName,
        lastName,
        email,
      };
      // return "nice"
    }

    catch(err){
      throw new NotAcceptableException("Email already exists");
    }
      
  }

  public async updateUser(id, newUser) {
    let updatedUser = newUser
    if(newUser.password){
      const newPassword = await bcrypt.hash(newUser.password, 10);
      updatedUser={...newUser, password: newPassword}
    }
    const user = await this.userModel
      .findByIdAndUpdate({ _id: id.id }, updatedUser, {
        useFindAndModify: false,
      })
      .select('-password')
      .exec();
    if (!user) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }
    return user;
    // return {
    //   ...user._id,
    //   firstName,
    //   lastName,
    //   email,
    // };
  }

  public async deleteUser(id) {
    const user = await this.userModel
      .deleteOne({ _id: id.id })
      .select('-password')
      .exec();
    if (user.deletedCount === 0) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }
    return user;
  }
}
