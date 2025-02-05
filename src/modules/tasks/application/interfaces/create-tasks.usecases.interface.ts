import { TaskStatusEnum } from "src/shared/enums/task-status.enum";
import { TaskEntity } from "../../domain/entities/task.entity";

export interface ICreateTasksUseCase {
    execute(id: string, title: string, description: string, status: TaskStatusEnum): Promise<TaskEntity>
}

export const CREATE_TASKS_USECASE_INTERFACE = Symbol('ICreateTasksUseCase');