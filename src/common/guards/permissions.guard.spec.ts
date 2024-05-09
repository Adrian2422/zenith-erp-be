import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsGuard } from './permissions.guard';
import { Permissions } from '@prisma/client';

describe('PermissionsGuard', () => {
	let guard: PermissionsGuard;
	let context: ExecutionContext;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			providers: [ PermissionsGuard, Reflector ],
		}).compile();

		guard = moduleRef.get<PermissionsGuard>(PermissionsGuard);
		context = {
			switchToHttp: () => ({
				getRequest: () => ({
					user: {
						permissions: [ Permissions.USER_READ, Permissions.USER_CREATE ],
					},
				}),
			}),
			getHandler: jest.fn(),
			getClass: jest.fn(),
		} as any;
	});

	it('should be defined', () => {
		expect(guard).toBeDefined();
	});

	it('should return true if no required permissions', () => {
		jest.spyOn(guard['reflector'], 'getAllAndOverride').mockReturnValue(undefined);
		expect(guard.canActivate(context)).toBe(true);
	});

	it('should return true if user has required permissions', () => {
		jest.spyOn(guard['reflector'], 'getAllAndOverride').mockReturnValue(Permissions.USER_READ);
		expect(guard.canActivate(context)).toBe(true);
	});

	it('should return false if user does not have required permissions', () => {
		jest.spyOn(guard['reflector'], 'getAllAndOverride').mockReturnValue('permission3');
		expect(guard.canActivate(context)).toBe(false);
	});
});
