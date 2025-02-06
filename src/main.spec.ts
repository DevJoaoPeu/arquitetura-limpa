import { Test, TestingModule } from '@nestjs/testing';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

describe('Main bootstrap', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should create the app successfully', async () => {
    const appInstance = await NestFactory.create(AppModule);
    await appInstance.init(); 

    expect(appInstance).toBeDefined(); 
  });
});