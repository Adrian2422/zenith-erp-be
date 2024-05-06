import { Exclude, Expose } from 'class-transformer';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { PaginatedDto } from "../../../common/dtos/paginated.dto";
import { Permissions, Roles, Status } from '@prisma/client';

export class UserResponseDto {
	@ApiProperty()
	id: number;
	@ApiProperty()
	firstName: string;
	@ApiProperty()
	lastName: string;
	@ApiProperty()
	email: string;
	@ApiProperty()
	phone: string;

	@ApiHideProperty()
	@Exclude()
	password: string;

	@ApiProperty({ enum: Roles })
	role: Roles;

	@ApiProperty({ enum: Permissions })
	permissions: Permissions[];

	@ApiProperty({ enum: Status })
	status: Status;

	@Exclude()
	createdAt: Date;

	@Exclude()
	updatedAt: Date;

	@Exclude()
	addressId: number;

	@Exclude()
	personalInfoId: number;

	constructor(partial: Partial<UserResponseDto>) {
		Object.assign(this, partial);
	}
}

export type PaginatedUserResponseDto = PaginatedDto<UserResponseDto>;
