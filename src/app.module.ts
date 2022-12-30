import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from '@config/configuration.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [ConfigurationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
