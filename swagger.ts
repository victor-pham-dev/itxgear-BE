import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const createSwaggerDocument = (app: any) => {
  const options = new DocumentBuilder()
    .setTitle('API ITX GEAR')
    .setDescription('ITX GEAR SWAGGER DOCUMENTS')
    .setVersion('1.0')
    .addTag('ITX_GEAR')
    .addBearerAuth(
      {
        name: 'X-access-token',
        // bearerFormat: 'WJT',
        // scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'X-access-token',
    )
    .build()

  const document = SwaggerModule.createDocument(app, options)

  SwaggerModule.setup('api', app, document)
}
