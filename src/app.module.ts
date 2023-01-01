import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigurationModule } from '@config/configuration.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [ConfigurationModule, AuthModule],
  providers: [AppService],
})
export class AppModule {}
