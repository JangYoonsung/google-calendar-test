import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigurationModule } from '@config/configuration.module';
import { AuthModule } from '@auth/auth.module';
import { shopModule } from '@shops/shop.module';

@Module({
  imports: [ConfigurationModule, AuthModule, shopModule],
  providers: [AppService],
})
export class AppModule {}
