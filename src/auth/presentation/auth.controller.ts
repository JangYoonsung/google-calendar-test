import { AuthService } from '@auth/application/auth.service';
import { CreateAccountDto } from '@auth/dto';
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
}