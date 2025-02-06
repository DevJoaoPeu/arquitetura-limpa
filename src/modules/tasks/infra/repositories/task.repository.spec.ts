import { Test, TestingModule } from "@nestjs/testing";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../../application/interfaces/create-tasks.usecases.interface";
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from "../../application/interfaces/find-all-tasks.usecase.interface";
import { ITaskRepository } from "../../domain/repositories/task.repository.interface";
import { TaskRepository } from "./task.repository";
import { TaskEntity } from "../../domain/entities/task.entity";
import { TaskStatusEnum } from "../../../../shared/enums/task-status.enum";

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'e1d71121-2ff8-4f58-98a7-4cc8afd5b193'),
}));

describe('TaskRepository', () => {
    let taskRepository: ITaskRepository;
    let findAllTasksUseCase: jest.Mocked<IFindAllTasksUseCase>;
    let createTaskUseCase: jest.Mocked<ICreateTasksUseCase>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TaskRepository,
                {
                    provide: CREATE_TASKS_USECASE_INTERFACE,
                    useValue: createTaskUseCase
                },
                {
                    provide: FIND_ALL_TASKS_USECASE_INTERFACE,
                    useValue: findAllTasksUseCase
                }
            ],
        }).compile();

        taskRepository = module.get<ITaskRepository>(TaskRepository);
    })

    it('should be defined', () => {
        expect(taskRepository).toBeDefined();
    })

    it('should create a task', async () => {
        const task = new TaskEntity(
            'e1d71121-2ff8-4f58-98a7-4cc8afd5b193',
            'Test Task',
            'This is a test task',
            TaskStatusEnum.PENDING
        );

        const result = await taskRepository.create(task);

        expect(result).toEqual(task);
    });

    it('should return all tasks', async () => {
        const task1 = new TaskEntity(
            'e1d71121-2ff8-4f58-98a7-4cc8afd5b193',
            'Task 1',
            'First task description',
            TaskStatusEnum.PENDING
        );
        const task2 = new TaskEntity(
            'f2d71121-2ff8-4f58-98a7-4cc8afd5b194',
            'Task 2',
            'Second task description',
            TaskStatusEnum.COMPLETED
        );

        await taskRepository.create(task1);
        await taskRepository.create(task2);

        const tasks = await taskRepository.findAll();

        expect(tasks).toHaveLength(2);
        expect(tasks).toEqual([task1, task2]);
    });

    it('should return an empty array if no tasks are created', async () => {
        const tasks = await taskRepository.findAll();
        expect(tasks).toEqual([]);
    });
})