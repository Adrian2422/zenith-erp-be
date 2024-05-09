import { IsEnum, IsNumber, IsOptional, IsPositive, IsString, Validate } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";
import { IsValidOrder } from '../validators/order.validator';

export enum Order {
	ASC = 'asc',
	DESC = 'desc',
}

export class PaginationQueryDto {

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	pageIndex?: number;

	@ApiProperty()
	@IsOptional()
	@IsNumber()
	pageSize?: number;

	@ApiProperty({required: false})
	// @IsEnum(Order)
	@Validate(IsValidOrder)
	@IsOptional()
	order?: Order;
}
