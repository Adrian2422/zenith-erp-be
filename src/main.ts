import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const port = process.env.PORT || 3000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			transform: true,
			forbidNonWhitelisted: true,
			transformOptions: {
				enableImplicitConversion: true,
			},
		}),
	);
	app.setGlobalPrefix('api/v1');

	const options = new DocumentBuilder()
		.setTitle('ZenithERP')
		.setDescription('ZenithERP application')
		.setExternalDoc('API JSON', `http://localhost:${port}/api-json`)
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);

	SwaggerModule.setup('api', app, document);

	await app.listen(process.env.PORT || 3000);
}

bootstrap().then(() => {
	console.info(`Zenith app served at http://localhost:${port}`);
	console.info(`Api available at http://localhost:${port}/api`);
});
