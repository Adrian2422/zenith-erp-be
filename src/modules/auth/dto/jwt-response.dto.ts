import { Request as HttpRequest } from 'express';
import { Permissions, Roles } from '@prisma/client';

export interface UserJwtPayload {
	sub: string;
	userId: number;
	role: Roles;
	permissions: Permissions[];
}
export type AuthRequest = HttpRequest & { user: UserJwtPayload };
