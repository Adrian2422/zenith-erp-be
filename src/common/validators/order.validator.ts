import { isString, registerDecorator, ValidationArguments, ValidatorOptions } from 'class-validator';
import { enumToArray } from '../utils/enumToArray';
import { Order } from '../dtos/pagination-query.dto';

export function IsValidOrder(property: string, validationOptions: ValidatorOptions) {
	return function (object: object, propertyName: string) {
		registerDecorator({
			name: 'isValidOrder',
			target: object.constructor,
			propertyName,
			constraints: [property],
			options: validationOptions,
			validator: {
				validate(value: any, args: ValidationArguments) {
					if (!isString(value)) {
						return false;
					}

					const parts = value.split(',');
					if (parts.length !== 2) {
						return false;
					}

					const direction = parts[1].toLowerCase();
					return enumToArray(Order).includes(direction);
				},
			},
		});
	};
}
