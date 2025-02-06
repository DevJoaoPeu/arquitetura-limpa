import { TaskEntity } from "../../domain/entities/task.entity";

export interface IFindOneTaskUseCase {
    execute(id: string): Promise<TaskEntity>
}

export const  FIND_ONE_TASK_USECASE_INTERFACE = Symbol('IFindOneTaskUseCase');