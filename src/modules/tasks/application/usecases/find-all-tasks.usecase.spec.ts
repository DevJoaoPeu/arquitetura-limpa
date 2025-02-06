import { Test, TestingModule } from "@nestjs/testing";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../interfaces/create-tasks.usecases.interface"
import { CreateTaskUseCase } from "./create-task.usecase";
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from "../interfaces/find-all-tasks.usecase.interface";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../../domain/repositories/task.repository.interface";
import { TaskStatusEnum } from "../../../../shared/enums/task-status.enum";
import { FindAllTasksUseCase } from "./find-all-tasks.usecase";

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'e1d71121-2ff8-4f58-98a7-4cc8afd5b193'),
}));

describe('FindAllTasksUseCase', () => {
    let findAllTasksUseCase: IFindAllTasksUseCase;
    let createTaskUseCase: jest.Mocked<ICreateTasksUseCase>;
    let taskRepository: jest.Mocked<ITaskRepository>;

    beforeEach(async () => {
        taskRepository = {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn()
        } as jest.Mocked<ITaskRepository>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                FindAllTasksUseCase,
                {
                    provide: CREATE_TASKS_USECASE_INTERFACE,
                    useValue: createTaskUseCase
                },
                {
                    provide: TASK_REPOSITORY_INTERFACE,
                    useValue: taskRepository
                }
            ],
        }).compile();

        findAllTasksUseCase = module.get<IFindAllTasksUseCase>(FindAllTasksUseCase);
    })

    it('should be defined', () => {
        expect(findAllTasksUseCase).toBeDefined();
    })

    it('should list all tasks', async () => {
        const task = {
            id: 'e1d71121-2ff8-4f58-98a7-4cc8afd5b193',
            title: 'Test',
            description: 'Test',
            status: TaskStatusEnum.COMPLETED
        }

        taskRepository.findAll.mockResolvedValue([task]);

        const result = await findAllTasksUseCase.execute();

        expect(taskRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([task]);
    })

    it('should return an empty array', async () => {
        taskRepository.findAll.mockResolvedValue([]);

        const result = await findAllTasksUseCase.execute();

        expect(taskRepository.findAll).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
    })
})