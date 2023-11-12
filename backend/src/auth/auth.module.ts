import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, 
    PassportModule,
    JwtModule.register({
      secret: 'secret', // Secret for JWT signing
      signOptions: { expiresIn: '10d' }, // Token expiration time in 10 days
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService , LocalStrategy , JwtStrategy]
})
export class AuthModule {}
