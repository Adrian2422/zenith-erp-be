import { Permissions, Roles } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserJwtPayload {
	@ApiProperty()
	sub: string;

	@ApiProperty()
	userId: number;

	@ApiProperty()
	role: Roles;

	@ApiProperty()
	permissions: Permissions[];

	constructor(partial: Partial<UserJwtPayload>) {
		Object.assign(this, partial);
	}
}
