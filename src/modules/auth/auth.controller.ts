import { Body, ClassSerializerInterceptor, Controller, Get, Post, Request, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { Public } from '../../common/decorators/public.decorator';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
	constructor(private authService: AuthService) {}
	@Public()
	@Post('login')
	async login(@Body() credentials: LoginDto): Promise<LoginResponseDto> {
		return this.authService.login(credentials);
	}
}
