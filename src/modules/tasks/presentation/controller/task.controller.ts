import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "../../application/usecases/create-task.usecase";
import { CreateTaskDto } from "../dto/create-task.dto";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../../application/interfaces/create-tasks.usecases.interface";
import { FIND_ALL_TASKS_USECASE_INTERFACE, IFindAllTasksUseCase } from "../../application/interfaces/find-all-tasks.usecase.interface";

@Controller('tasks')
export class TaskController {
    constructor(
        @Inject(CREATE_TASKS_USECASE_INTERFACE)
        private readonly createTaskUseCase: ICreateTasksUseCase,

        @Inject(FIND_ALL_TASKS_USECASE_INTERFACE)
        private readonly findAllTasksUseCase: IFindAllTasksUseCase
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
}