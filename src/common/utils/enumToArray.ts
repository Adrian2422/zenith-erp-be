/**
 * Get enum keys as string[]
 * @param myEnum
 * @returns string[]
 */
export function enumToArray(myEnum: any): string[] {
	return Object.keys(myEnum).filter((key) => isNaN(parseInt(key)));
}
