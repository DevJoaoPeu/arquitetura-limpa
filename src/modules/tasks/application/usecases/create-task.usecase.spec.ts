import { Test, TestingModule } from "@nestjs/testing";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../interfaces/create-tasks.usecases.interface"
import { CreateTaskUseCase } from "./create-task.usecase";
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from "../interfaces/find-all-tasks.usecase.interface";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../../domain/repositories/task.repository.interface";

describe('CreateTaskUseCase', () => {
    let createTaskUseCase: ICreateTasksUseCase;
    let findAllTasksUseCase: jest.Mocked<IFindAllTasksUseCase>;
    let taskRepository: jest.Mocked<ITaskRepository>;

    beforeEach(async () => {
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
})