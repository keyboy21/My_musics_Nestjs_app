import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    const config = new DocumentBuilder()
      .setTitle('My music')
      .setDescription('The My music API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/doc', app, document);
    app.enableCors();
    await app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
