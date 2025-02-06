import { Test, TestingModule } from '@nestjs/testing';
import { TaskController } from './task.controller';
import { CreateTaskUseCase } from '../../application/usecases/create-task.usecase';
import { FindAllTasksUseCase } from '../../application/usecases/find-all-tasks.usecase';
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from '../../application/interfaces/create-tasks.usecases.interface';
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from '../../application/interfaces/find-all-tasks.usecase.interface';
import { TaskStatusEnum } from '../../../../shared/enums/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';

describe('TaskController', () => {
  let taskController: TaskController;
  let createTaskUseCase: jest.Mocked<ICreateTasksUseCase>;
  let findAllTasksUseCase: jest.Mocked<IFindAllTasksUseCase>;

  beforeEach(async () => {
    createTaskUseCase = { execute: jest.fn() } as jest.Mocked<ICreateTasksUseCase>;
    findAllTasksUseCase = { execute: jest.fn() } as jest.Mocked<IFindAllTasksUseCase>;

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [
        {
          provide: CREATE_TASKS_USECASE_INTERFACE,
          useValue: createTaskUseCase,
        },
        {
          provide: FIND_ALL_TASKS_USECASE_INTERFACE,
          useValue: findAllTasksUseCase,
        },
      ],
    }).compile();

    taskController = module.get<TaskController>(TaskController);
  });

  it('should be defined', () => {
    expect(taskController).toBeDefined();
  });

  it('should call createTaskUseCase.execute when createTask is called', async () => {
    const createTaskDto: CreateTaskDto = {
      title: 'Test Task',
      description: 'Test Description',
      status: TaskStatusEnum.PENDING,
    };

    const result = { id: '1', ...createTaskDto }; 

    createTaskUseCase.execute.mockResolvedValue(result);

    const response = await taskController.createTask(createTaskDto);

    expect(createTaskUseCase.execute).toHaveBeenCalledWith(createTaskDto.title, createTaskDto.description, createTaskDto.status);
    expect(response).toEqual(result); 
  });

  it('should call findAllTasksUseCase.execute when findAll is called', async () => {
    const tasks = [
      { id: '1', title: 'Test Task 1', description: 'Test Description 1', status: TaskStatusEnum.PENDING },
      { id: '2', title: 'Test Task 2', description: 'Test Description 2', status: TaskStatusEnum.COMPLETED },
    ];

    findAllTasksUseCase.execute.mockResolvedValue(tasks); 

    const response = await taskController.findAll();

    expect(findAllTasksUseCase.execute).toHaveBeenCalled();
    expect(response).toEqual(tasks);
  });
});
