import {
	IsString,
	IsNotEmpty,
	IsEmail,
	Matches,
	MinLength,
	IsEnum,
	MaxLength,
	IsOptional,
	IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Permissions, PersonalInfo, Roles } from '@prisma/client';

export class CreateUserDto {
	@ApiProperty()
	@IsString()
	@IsOptional()
	@MaxLength(20)
	firstName: string;

	@ApiProperty()
	@IsString()
	@IsOptional()
	@MaxLength(20)
	lastName: string;

	@ApiProperty()
	@IsEmail()
	@IsString()
	@IsNotEmpty()
	email: string;

	@ApiProperty({ required: false })
	@IsString()
	@Matches(/^(?:\d{3}\-){2}\d{3}$/, {
		message: 'phone must be a valid number separated by dashes (e.g. 111-222-333)',
	})
	phone: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password: string;

	@ApiProperty({ enum: Roles })
	@IsOptional()
	@IsEnum(Roles)
	role: Roles;

	@ApiProperty({ enum: Permissions, isArray: true })
	@IsArray()
	@IsOptional()
	@IsEnum(Permissions, { each: true })
	permissions: Permissions[];

	@ApiProperty()
	@IsNotEmpty()
	addressId: number;

	@ApiProperty()
	@IsNotEmpty()
	personalInfoId: number;

	@ApiProperty()
	@IsNotEmpty()
	settingId: number;
}
