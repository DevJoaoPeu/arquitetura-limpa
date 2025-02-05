import { Inject, Injectable } from "@nestjs/common";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../../domain/repositories/task.repository.interface";
import { TaskStatusEnum } from "src/shared/enums/task-status.enum";
import { TaskEntity } from "../../domain/entities/task.entity";
import { ICreateTasksUseCase } from "../interfaces/create-tasks.usecases.interface";

@Injectable()
export class CreateTaskUseCase implements ICreateTasksUseCase {
    constructor (
        @Inject(TASK_REPOSITORY_INTERFACE)
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(id: string, title: string, description: string, status: TaskStatusEnum): Promise<TaskEntity> {
        const task = new TaskEntity(id, title, description, status);
        return await this.taskRepository.create(task);
    }
}