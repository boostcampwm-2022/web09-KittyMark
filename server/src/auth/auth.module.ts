import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [HttpModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
