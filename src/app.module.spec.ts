import { Test, TestingModule } from '@nestjs/testing';
import { TaskModule } from './modules/tasks/task.module';
import { AppModule } from './app.module';

describe('AppModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule], 
    }).compile();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should import TaskModule correctly', async () => {
    const taskModule = app.get(TaskModule);
    expect(taskModule).toBeDefined();
  });
});
