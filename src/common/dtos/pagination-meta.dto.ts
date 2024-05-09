import { ApiProperty } from "@nestjs/swagger";

export class PaginationMetaDto {
	@ApiProperty()
	count: number;

	@ApiProperty()
	pageIndex: number;

	@ApiProperty()
	pageSize: number;

	@ApiProperty()
	order: string;
}
