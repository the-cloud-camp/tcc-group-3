import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { AppConfig } from './config';

let { getStage, getPort, getBaseUrl } = AppConfig;
const baseUrl = getBaseUrl();
const port = getPort();
const stage = getStage();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('Lotto Service').setDescription('The lotto API for issued lottery').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  // SwaggerModule.setup(`${baseUrl}/swagger`, app, document);
  await app.listen(port);
  console.log(`Server listening on port: '${port}' stage '${stage}'`);
}

(async () => {
  await bootstrap();
})();
