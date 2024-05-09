import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { Permissions } from '@prisma/client';

@Injectable()
export class PermissionsGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const requiredPermission = this.reflector.getAllAndOverride<Permissions>(PERMISSIONS_KEY, [
			context.getHandler(),
			context.getClass(),
		]);
		if (!requiredPermission) {
			return true;
		}
		const { user } = context.switchToHttp().getRequest();
		return user.permissions.some((permission) => requiredPermission === permission);
	}
}
