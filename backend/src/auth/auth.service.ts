import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService, private jwtService: JwtService,) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findbyEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(dto: LoginDto) {
        const user = await this.usersService.findbyEmail(dto.email);
        const payload = { email: user.email, sub: user.id };
        return {
            userId : user.id,
            token: this.jwtService.sign(payload),
        };
    }

    async register(dto: CreateUserDto) {
        // Check if the user already exists
        const existingUser = await this.usersService.findbyEmail(dto.email);
        if (existingUser) {
            throw new UnauthorizedException('User with this email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        // Create a new user
        const newUser = await this.usersService.create({
            ...dto,
            password: hashedPassword,
        });

        const payload = { email: newUser.email, sub: newUser.id };
        // Exclude password from the result
        const { password, ...result } = newUser;
        return {
            message: 'User registration successful',
            user: result,
            token: this.jwtService.sign(payload),
        };
    }
}