import { Body, Controller, Post } from "@nestjs/common";
import { CreateTaskUseCase } from "../../application/usecases/create-task.usecase";
import { CreateTaskDto } from "../dto/create-task.dto";

@Controller('tasks')
export class TaskController {
    constructor(
        private readonly createTaskUseCase: CreateTaskUseCase
    ) {}

    @Post('/create')
    async createTask(@Body() createTaskDto: CreateTaskDto) {
        const { id, title, description, status } = createTaskDto
        const task = await this.createTaskUseCase.execute(id, title, description, status);

        return task
    }
}