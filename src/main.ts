import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppDataSource from './helpers/dbConnect';
import * as express from 'express';

// Database connect

AppDataSource.initialize()
  .then(() => {
    console.log('Database connect success')
  })
  .catch((err) => {
    console.log('Database connect error')
    console.error(err)
  })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.use('/public', express.static('public'));
  await app.listen(3000);

  console.log('Server is starting..')
}

bootstrap();
