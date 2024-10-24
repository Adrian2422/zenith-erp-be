import { ApiProperty } from '@nestjs/swagger';
import { Language, Theme } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class SettingsDto {
	@ApiProperty({ enum: Theme })
	@IsEnum(Theme)
	theme: Theme;

	@ApiProperty({ enum: Language })
	@IsEnum(Language)
	language: Language;

	constructor(partial: Partial<SettingsDto>) {
		Object.assign(this, partial);
	}
}
