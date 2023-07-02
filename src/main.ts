import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { createLogger } from 'winston';
import * as winston from 'winston';
import { utilities, WinstonModule } from 'nest-winston';
import 'winston-daily-rotate-file';
import { AllExceptionFilter } from './filters/all-exception.filter';

async function bootstrap() {
  // const logger = new Logger();
  // createLogger of Winston
  const instance = createLogger({
    // options of Winston
    transports: [
      new winston.transports.Console({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp(),
          utilities.format.nestLike(),
        ),
      }),
      // events - archive rotate
      new winston.transports.DailyRotateFile({
        level: 'warn',
        dirname: 'logs',
        filename: 'application-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
      new winston.transports.DailyRotateFile({
        level: 'info',
        dirname: 'logs',
        filename: 'info-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.simple(),
        ),
      }),
    ],
  });
  const logger = WinstonModule.createLogger({
    instance,
  });
  const app = await NestFactory.create(AppModule, {
    // 关闭整个nestjs日志
    // logger: false,
    // logger: ['error', 'warn'],
    // bufferLogs: true,
    logger,
  });
  app.setGlobalPrefix('api/v1');

  const httpAdapter = app.get(HttpAdapterHost);
  // 全局Filter只能有一个
  // app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalFilters(new AllExceptionFilter(logger, httpAdapter));
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
