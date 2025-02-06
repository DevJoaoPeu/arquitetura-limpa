import { Test, TestingModule } from '@nestjs/testing';
import { TaskModule } from './task.module';
import { TaskController } from './presentation/controller/task.controller';
import { CreateTaskUseCase } from './application/usecases/create-task.usecase';
import { FindAllTasksUseCase } from './application/usecases/find-all-tasks.usecase';
import { TaskRepository } from './infra/repositories/task.repository';
import { TASK_REPOSITORY_INTERFACE } from './domain/repositories/task.repository.interface';
import { CREATE_TASKS_USECASE_INTERFACE } from './application/interfaces/create-tasks.usecases.interface';
import { FIND_ALL_TASKS_USECASE_INTERFACE } from './application/interfaces/find-all-tasks.usecase.interface';

describe('TaskModule', () => {
  let app: TestingModule;
  let taskController: TaskController;
  let createTaskUseCase: CreateTaskUseCase;
  let findAllTasksUseCase: FindAllTasksUseCase;
  let taskRepository: TaskRepository;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [TaskModule],
    }).compile();

    taskController = app.get<TaskController>(TaskController);
    createTaskUseCase = app.get<CreateTaskUseCase>(CREATE_TASKS_USECASE_INTERFACE);
    findAllTasksUseCase = app.get<FindAllTasksUseCase>(FIND_ALL_TASKS_USECASE_INTERFACE);
    taskRepository = app.get<TaskRepository>(TASK_REPOSITORY_INTERFACE);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
    expect(createTaskUseCase).toBeDefined();
    expect(findAllTasksUseCase).toBeDefined();
    expect(taskRepository).toBeDefined();
  });

  it('should check TaskRepository methods', () => {
    expect(taskRepository).toHaveProperty('create');
    expect(taskRepository).toHaveProperty('findAll');
  });

  it('should check CreateTaskUseCase methods', () => {
    expect(typeof createTaskUseCase.execute).toBe('function');
  });

  it('should check FindAllTasksUseCase methods', () => {
    expect(typeof findAllTasksUseCase.execute).toBe('function');
  });
});
