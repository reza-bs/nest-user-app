import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private jwtService: JwtService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const cookie = request.cookies['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException('no data available');
      }

      const user = await this.userModel.findOne({ _id: data['id'] });

      if (user.role === 'admin') {
        return true;
      }

      return false;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
