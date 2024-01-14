import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { createSwaggerDocument } from 'swagger'
import { ValidationPipe } from '@nestjs/common'
import corsOptions from 'configs/cors'
import * as bodyParser from 'body-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug'],
  })

  app.enableCors(corsOptions)
  app.useGlobalPipes(new ValidationPipe())
  createSwaggerDocument(app)

  app.use(bodyParser.json({ limit: '50mb' }))
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
  await app.listen(8888)
}
bootstrap()
