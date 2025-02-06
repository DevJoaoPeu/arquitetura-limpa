import { Test, TestingModule } from "@nestjs/testing";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../interfaces/create-tasks.usecases.interface"
import { CreateTaskUseCase } from "./create-task.usecase";
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from "../interfaces/find-all-tasks.usecase.interface";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../../domain/repositories/task.repository.interface";
import { TaskStatusEnum } from "../../../../shared/enums/task-status.enum";

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'e1d71121-2ff8-4f58-98a7-4cc8afd5b193'),
}));

describe('CreateTaskUseCase', () => {
    let createTaskUseCase: ICreateTasksUseCase;
    let findAllTasksUseCase: jest.Mocked<IFindAllTasksUseCase>;
    let taskRepository: jest.Mocked<ITaskRepository>;

    beforeEach(async () => {
        taskRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn()
        } as jest.Mocked<ITaskRepository>;

        findAllTasksUseCase = { execute: jest.fn() } as jest.Mocked<IFindAllTasksUseCase>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CreateTaskUseCase,
                {
                    provide: FIND_ALL_TASKS_USECASE_INTERFACE,
                    useValue: findAllTasksUseCase
                },
                {
                    provide: TASK_REPOSITORY_INTERFACE,
                    useValue: taskRepository
                }
            ],
        }).compile();

        createTaskUseCase = module.get<ICreateTasksUseCase>(CreateTaskUseCase);
    })

    it('should be defined', () => {
        expect(createTaskUseCase).toBeDefined();
    })

    it('should create a task', async () => {
        const task = {
            id: 'e1d71121-2ff8-4f58-98a7-4cc8afd5b193',
            title: 'Test',
            description: 'Test',
            status: TaskStatusEnum.COMPLETED
        }

        taskRepository.create.mockResolvedValue(task);

        const result = await createTaskUseCase.execute(task.title, task.description, task.status);

        expect(taskRepository.create).toHaveBeenCalledWith(task);
        expect(taskRepository.create).toHaveBeenCalledTimes(1);
        expect(result).toEqual(task);
    })

    it('should throw an error when repository fails', async () => {
        const task = {
             id: 'e1d71121-2ff8-4f58-98a7-4cc8afd5b193',
            title: 'Test Failure',
            description: 'This test should fail',
            status: TaskStatusEnum.IN_PROGRESS
        };

        taskRepository.create.mockRejectedValue(new Error("Database error"));

        await expect(createTaskUseCase.execute(task.title, task.description, task.status))
            .rejects.toThrow("Database error");

        expect(taskRepository.create).toHaveBeenCalledTimes(1);
    });
})