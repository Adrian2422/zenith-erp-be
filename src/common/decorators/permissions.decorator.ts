import { SetMetadata } from '@nestjs/common';
import { Permissions as PermissionsEnum } from '@prisma/client';

export const PERMISSIONS_KEY = 'permissions';
export const Permissions = (permission: PermissionsEnum) => SetMetadata(PERMISSIONS_KEY, permission);
