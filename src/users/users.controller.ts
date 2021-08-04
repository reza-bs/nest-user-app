import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  @Get(':id')
  public getUserById(@Param() id: any) {
    return this.userService.getUserById(id);
  }

  @Post()
  public createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Patch(':id')
  public updateUser(@Param() id: any, @Body() user: any) {
    // const propertyName = query.property_name;
    // const propertyValue = query.property_value;
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  public deleteUser(@Param() id: any) {
    return this.userService.deleteUser(id);
  }
}
