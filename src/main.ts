import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './services/prisma.service';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  try {
    const app = await NestFactory.create(AppModule);
    const prismaService = app.get(PrismaService);
    await prismaService.enableShutdownHooks(app);
    await app.listen(PORT, () => {
      console.log(`Server service is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
bootstrap();
