import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private userService: UsersService){}

  @Get()
  public getUsers(){
    return this.userService.getUsers();
  }

  @Get(':id')
  public getUserById(@Param() id:any){
    return this.userService.getUserById(id);
  }

  @Post('create')
  public createUser(@Body() user:UserDto){
    return this.userService.createUser(user);
  }

  @Patch('edit/:id')
  public updateUser(@Param() id:any, @Query() query){
    const propertyName = query.property_name;
    const propertyValue = query.property_value;
    return this.userService.updateUser(id, propertyName, propertyValue);
  }

  @Delete('delete/:id')
  public deleteUser(@Param() id:any){
    return this.userService.deleteUser(id);
  }
}
