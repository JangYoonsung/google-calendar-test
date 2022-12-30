import { AuthService } from '@auth/application/auth.service';
import { CreateAccountDto, RequestLoginDto } from '@auth/dto';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  async register(@Body() dto: CreateAccountDto) {
    return await this.authService.register(dto);
  }

  @Post('/confirm')
  @UsePipes(ValidationPipe)
  async registerConfirmed(@Body() dto: { email: string; code: string }) {
    return await this.authService.registerConfirmed(dto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  async signIn(@Body() dto: RequestLoginDto) {
    return await this.authService.signIn(dto);
  }
}
