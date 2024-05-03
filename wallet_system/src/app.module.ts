import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { WelcomeController } from './welcome/welcome.controller';
import { WelcomeModule } from './welcome/welcome.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}), 
    AuthModule,
    UserModule,
    WalletModule, 
    PrismaModule, 
    WelcomeModule],
})
export class AppModule { }
