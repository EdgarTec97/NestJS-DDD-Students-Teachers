import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from './config';
import { DocumentationRoles } from './transactions/shared/services/jwt/infrastructure/JwtAuthGuard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const options = new DocumentBuilder()
  .setTitle('Students - Teachers')
  .setDescription('This project is a hands-on on how you can use hex architecture, DDD: Domain Driven Design and TDD: Test Driven Development in your future backend applications')
  .setVersion('1.0')
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Student JWT' },
    DocumentationRoles.STUDENT_JWT
  )
  .addBearerAuth(
    { type: 'http', scheme: 'bearer', bearerFormat: 'JWT', description: 'Manager JWT' },
    DocumentationRoles.MANAGER_JWT
  )
  .build();

  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('api', app, document);

  await app.listen(config.port);
}
bootstrap();
