import { ApiProperty } from "@nestjs/swagger";
import { PaginationMetaDto } from "./pagination-meta.dto";

export class PaginatedDto<T> extends PaginationMetaDto {

	@ApiProperty()
	result: T[];
}
