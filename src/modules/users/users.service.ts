import * as bcrypt from 'bcryptjs';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationQueryDto } from '../../common/dtos/pagination-query.dto';
import { PaginatedUserResponseDto, UserResponseDto } from './dto/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Status } from '@prisma/client';

@Injectable()
export class UsersService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(paginationQuery: PaginationQueryDto): Promise<PaginatedUserResponseDto> {
		const { pageIndex, pageSize, order = 'id,desc' } = paginationQuery;
		const [orderField, orderDir] = order.split(',');

		const offset = pageSize * pageIndex;

		const count = await this.prismaService.user.count();
		const result = (
			await this.prismaService.user.findMany({
				skip: offset,
				take: pageSize,
				orderBy: {
					[orderField]: orderDir,
				},
			})
		).map((user) => new UserResponseDto(user));

		return {
			result,
			count,
			pageIndex,
			pageSize,
			order,
		};
	}

	async findOne(id: number): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				userId: id,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return new UserResponseDto(user);
	}

	async findOneByEmail(email: string): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return new UserResponseDto(user);
	}

	async create({ email, password, ...rest }: CreateUserDto): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (user) {
			throw new ConflictException('This email is already taken.');
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		return this.prismaService.user
			.create({
				data: {
					email,
					password: hashedPassword,
					...rest,
				},
			})
			.then((newUser) => new UserResponseDto(newUser));
	}

	async delete(id: number): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				userId: id,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		return this.prismaService.user
			.delete({
				where: {
					userId: id,
				},
			})
			.then((deletedUser) => new UserResponseDto(deletedUser));
	}

	async block(id: number): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				userId: id,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		if (user.status === Status.BLOCKED) {
			throw new ConflictException('Account is already banned');
		}

		return this.prismaService.user
			.update({
				where: {
					userId: id,
				},
				data: {
					status: Status.BLOCKED,
				},
			})
			.then((blockedUser) => new UserResponseDto(blockedUser));
	}

	async unblock(id: number): Promise<UserResponseDto> {
		const user = await this.prismaService.user.findUnique({
			where: {
				userId: id,
			},
		});

		if (!user) {
			throw new NotFoundException();
		}

		if (user.status !== Status.BLOCKED) {
			throw new ConflictException('Account is not banned');
		}

		return this.prismaService.user
			.update({
				where: {
					userId: id,
				},
				data: {
					status: Status.ACTIVE,
				},
			})
			.then((unblockedUser) => new UserResponseDto(unblockedUser));
	}
}
