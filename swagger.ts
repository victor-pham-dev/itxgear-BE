import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const createSwaggerDocument = (app: any) => {
  const options = new DocumentBuilder()
    .setTitle('API EXAMPLE')
    .setDescription('todo APP API description')
    .setVersion('1.0')
    .addTag('TODO APP')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);
};
