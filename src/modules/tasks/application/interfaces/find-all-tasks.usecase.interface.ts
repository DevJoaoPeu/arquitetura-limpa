import { TaskStatusEnum } from "src/shared/enums/task-status.enum";
import { TaskEntity } from "../../domain/entities/task.entity";

export interface IFindAllTasksUseCase {
    execute(): Promise<TaskEntity[]>
}

export const FIND_ALL_TASKS_USECASE_INTERFACE = Symbol('IFindAllTasksUseCase');