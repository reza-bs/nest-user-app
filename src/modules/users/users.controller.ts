import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Res,
  UseGuards
} from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { RolesGuard } from '../../guards/roles.guard';
import { AuthDto } from '../auth/auth.dto';
import { UserDto } from './user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  public getUsers() {
    return this.userService.getUsers();
  }

  // @Get('fjdagad')
  // public getUsersonly() {
  //   return this.userService.getUsers();
  // }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  public getUserById(@Param() id: any) {
    return this.userService.getUserById(id);
  }

  @Post()
  public createUser(@Body() user: UserDto) {
    return this.userService.createUser(user);
  }

  @Post('login')
  async login(
    @Body() auth: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.userService.login(auth, response);
  }

  @Post('dashboard')
  @UseGuards(RolesGuard)
  async dashboard() {
    return this.userService.dashboard();
  }

  @Patch(':id')
  @ApiParam({ name: 'id', required: true })
  public updateUser(@Param() id: any, @Body() user: UserDto) {
    return this.userService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', required: true })
  public deleteUser(@Param() id: any) {
    return this.userService.deleteUser(id);
  }
}
