import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { Permissions, PrismaClient, Roles, Status } from '@prisma/client';

const randomUsersCount = 100;
const prisma = new PrismaClient();

function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
	await prisma.user.deleteMany();

	console.log('Seeding...');

	generateAdmin()
		.then(() => generateEmployees())
		.catch((error) => console.log(error.message));
}

async function generateAdmin() {
	await prisma.user.upsert({
		where: { email: 'admin@zenith.com' },
		update: {},
		create: {
			firstName: 'Admin',
			lastName: 'Nimda',
			email: 'admin@zenith.com',
			password: await hashPassword('P0klik4$'),
			phone: '111-222-333',
			status: Status.ACTIVE,
			role: Roles.ADMIN,
			permissions: [Permissions.USER_CREATE, Permissions.USER_READ, Permissions.USER_DELETE, Permissions.USER_EDIT],
		},
	});
}

async function generateEmployees() {
	await prisma.user.create({
		data: {
			firstName: 'John',
			lastName: 'Doe',
			email: 'user@zenith.com',
			password: await hashPassword('P0klik4$'),
			phone: faker.phone.number(),
			status: Status.ACTIVE,
			role: Roles.EMPLOYEE,
			permissions: [Permissions.USER_READ],
		},
	});

	for (let i = 0; i < randomUsersCount; i++) {
		await prisma.user.create({
			data: {
				firstName: faker.person.firstName(),
				lastName: faker.person.lastName(),
				email: faker.internet.email(),
				password: await hashPassword('P0klik4$'),
				phone: faker.phone.number(),
				status: Status.INACTIVE,
			},
		});
	}
}

function randomIntFromInterval(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEnum<T extends object>(targetEnum: T, numerical = false): T[keyof T] {
	const enumValues = Object.keys(targetEnum)
		.map((n) => (numerical ? Number.parseInt(n) : n))
		.filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
	const randomIndex = Math.floor(Math.random() * enumValues.length);
	const randomEnumValue = enumValues[randomIndex];
	return randomEnumValue;
}

// EXECUTE
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});