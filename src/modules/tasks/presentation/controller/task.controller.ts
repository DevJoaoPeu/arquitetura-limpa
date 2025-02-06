import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "../../application/usecases/create-task.usecase";
import { CreateTaskDto } from "../dto/create-task.dto";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../../application/interfaces/create-tasks.usecases.interface";
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from "../../application/interfaces/find-all-tasks.usecase.interface";
import { FIND_ONE_TASK_USECASE_INTERFACE, IFindOneTaskUseCase } from "../../application/interfaces/find-one-task.usecase.interface";
import { FindOneTaskDto } from "../dto/find-one-task.dto";

@Controller('tasks')
export class TaskController {
    constructor(
        @Inject(CREATE_TASKS_USECASE_INTERFACE)
        private readonly createTaskUseCase: ICreateTasksUseCase,

        @Inject(FIND_ALL_TASKS_USECASE_INTERFACE)
        private readonly findAllTasksUseCase: IFindAllTasksUseCase,

        @Inject(FIND_ONE_TASK_USECASE_INTERFACE)
        private readonly findOneTaskUseCase: IFindOneTaskUseCase
    ) {}

    @Post('/create')
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const { title, description, status } = createTaskDto
        const task = await this.createTaskUseCase.execute(title, description, status);

        return task
    }

    @Get('/find-all')
    async findAll() {
        return await this.findAllTasksUseCase.execute();
    }

    @Get('/find-one/:taskId')
    async findOne(@Param() { taskId }: FindOneTaskDto) {
        return await this.findOneTaskUseCase.execute(taskId);
    }
}