import { Inject, Injectable } from "@nestjs/common";
import { IFindAllTasksUseCase } from "../interfaces/find-all-tasks.usecase.interface";
import { TaskEntity } from "../../domain/entities/task.entity";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../../domain/repositories/task.repository.interface";

@Injectable()
export class FindAllTasksUseCase implements IFindAllTasksUseCase {
    constructor(
        @Inject(TASK_REPOSITORY_INTERFACE)
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(): Promise<TaskEntity[]> {
        return await this.taskRepository.findAll();
    }
}
    