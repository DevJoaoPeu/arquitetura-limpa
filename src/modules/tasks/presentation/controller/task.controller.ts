import { Body, Controller, Inject, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "../../application/usecases/create-task.usecase";
import { CreateTaskDto } from "../dto/create-task.dto";
import { CREATE_TASKS_USECASE_INTERFACE, ICreateTasksUseCase } from "../../application/interfaces/create-tasks.usecases.interface";

@Controller('tasks')
export class TaskController {
    constructor(
        @Inject(CREATE_TASKS_USECASE_INTERFACE)
        private readonly createTaskUseCase: ICreateTasksUseCase
    ) {}

    @Post('/create')
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const { id, title, description, status } = createTaskDto
        const task = await this.createTaskUseCase.execute(id, title, description, status);

        return task
    }
}