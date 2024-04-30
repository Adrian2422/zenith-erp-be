import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Delete,
	Get,
	Param,
	ParseIntPipe,
	Patch,
	Post,
	Query,
	UseInterceptors,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { Permissions as PermissionsEnum, Roles as RolesEnum } from '@prisma/client';
import { Roles } from '../../common/decorators/roles.decorator';
import { PaginationQueryDto } from '../../common/dtos/pagination-query.dto';
import { UserResponseDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('User')
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
	constructor(private readonly userService: UsersService) {}

	@Get(':id')
	@Permissions(PermissionsEnum.USER_READ)
	@ApiOkResponse({ type: UserResponseDto })
	async findOne(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.findOne(userId);
	}

	@Get()
	// @Permissions(PermissionsEnum.USER_READ)
	@ApiOkResponse({ type: UserResponseDto })
	async findAll(@Query() paginationQuery: PaginationQueryDto) {
		return this.userService.findAll(paginationQuery);
	}

	@Post()
	@Permissions(PermissionsEnum.USER_CREATE)
	@ApiCreatedResponse({ type: UserResponseDto })
	async create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Delete(':id')
	@Roles(RolesEnum.ADMIN, RolesEnum.SUPERUSER)
	@Permissions(PermissionsEnum.USER_DELETE)
	@ApiOkResponse({ type: UserResponseDto })
	async delete(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.delete(userId);
	}

	@Patch(':id/block')
	@Roles(RolesEnum.ADMIN, RolesEnum.SUPERUSER)
	@Permissions(PermissionsEnum.USER_BLOCK)
	@ApiOkResponse({ type: UserResponseDto })
	async block(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.block(userId);
	}

	@Patch(':id/unblock')
	@Roles(RolesEnum.ADMIN, RolesEnum.SUPERUSER)
	@Permissions(PermissionsEnum.USER_UNBLOCK)
	@ApiOkResponse({ type: UserResponseDto })
	async unblock(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.unblock(userId);
	}
}
