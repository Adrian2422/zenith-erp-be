import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { AuthRequest, UserJwtPayload } from './dto/jwt-response.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async validateUser(email: string, pass: string): Promise<Partial<User>> {
		const user = await this.usersService.findOneByEmail(email);
		const isPasswordCorrect = bcrypt.compareSync(pass, user.password);
		if (user && isPasswordCorrect) {
			const { password, ...result } = user;
			return result;
		}
		return null;
	}

	async login(credentials: LoginDto) {
		const user = await this.usersService.findOneByEmail(credentials.email);
		if (!user) {
			throw new UnauthorizedException();
		}

		const { userId, email, role, permissions, ...rest } = user;

		const payload: UserJwtPayload = {
			sub: email,
			userId,
			role,
			permissions,
		};
		return {
			accessToken: this.jwtService.sign(payload),
		};
	}

	async getProfile(req: AuthRequest) {
		return req.user;
	}
}
