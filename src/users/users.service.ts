import { HttpException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async getUsers() {
    try {
      const users = await this.userModel.find().select('-password').exec();
      if (!users && !users[0]) {
        throw new HttpException('No user available', 404);
      }
      return users;
    } catch (err) {
      throw err;
    }
  }

  public async getUserById(id) {
    try{
      const user = await this.userModel
      .findOne({ _id: id.id })
      .select('-password')
      .exec();
      if (!user) {
        throw new HttpException("No user available", 404)
      }

      return user;
    }
    catch (err) {
      throw err;
    }
    
  }

  public async createUser(newUser) {

    try{
      const { firstName, lastName, email, password } = newUser;
      const newPassword = await bcrypt.hash(password, 10);

      const emailExists = await this.userModel.find({ email });

      if (emailExists && emailExists[0]) {
        throw new NotAcceptableException();
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
    }

    catch(err){
      throw new NotAcceptableException("Email already exists");
    }
      
  }

  public async updateUser(id, newUser) {

    try{
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
      throw new HttpException("No user available", 404)
    }
    return user;
    }
    catch (err) {
      throw err;
    }
    
  }

  public async deleteUser(id) {

    try {
      const user = await this.userModel
        .deleteOne({ _id: id.id })
        .select('-password')
        .exec();
      if (user.deletedCount === 0) {
        throw new HttpException('No user available', 404);
      }
      return user;
    } catch (err) {
      throw err;
    }
  }
}
