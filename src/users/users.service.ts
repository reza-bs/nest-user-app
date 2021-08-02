import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './interfaces/user.interface';



@Injectable()
export class UsersService {

  constructor(@InjectModel("User") private readonly userModel: Model<IUser>){

  }

  public async getUsers() {
    const users = await this.userModel.find().exec();
    if(!users){
      // throw new HttpException("No user available", 404)
      return "No users"
    }
    return users
  }


  public async getUserById(id) {
    console.log(id.id)
    const user = await this.userModel.findOne({ _id:id.id }).exec();
    console.log("result:",user);
    if (!user) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }
    
    return user;
  }


  public async createUser(newUser) {
    const user = await new this.userModel(newUser);
    return user.save();
  }

  public async updateUser(id, propertyName, propertyValue) {
    const user = await this.userModel
      .findOneAndUpdate(
        { _id: id.id },
        {
          [propertyName]: propertyValue,
        },
      )
      .exec();
    if (!user) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }
    return user;
  }


  public async deleteUser(id) {
    const user = await this.userModel.deleteOne({ _id: id.id }).exec();
    if (user.deletedCount === 0) {
      // throw new HttpException("No user available", 404)
      return 'No users';
    }
    return user;
  }
}
