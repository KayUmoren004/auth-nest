import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 1000 * 60 * 60;

@Injectable()
export class AuthService {
  // Constructor
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Login Function
  async login(dto: LoginDto) {
    // Validate user
    const user = await this.validateUser(dto);

    // Create payload for JWT
    const payload = {
      email: user.email,
      sub: {
        name: user.name,
        schoolId: user.schoolId,
      },
    };

    // Return user and tokens
    return {
      user,
      backendToken: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  // Validate User Function
  async validateUser(dto: LoginDto) {
    // Destructure the email and password from the dto
    const { email, password } = dto;

    // Find user by email
    const user = await this.userService.findByEmail(email);

    // Check if user exists and password is correct
    if (user && (await compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    // Throw an error if user is not found
    throw new UnauthorizedException('Invalid credentials');
  }

  // Refresh Token Function
  async refreshToken(user: any) {
    // Create payload for JWT
    const payload = {
      email: user.email,
      sub: user.sub,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '1h',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
      expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
    };
  }
}
