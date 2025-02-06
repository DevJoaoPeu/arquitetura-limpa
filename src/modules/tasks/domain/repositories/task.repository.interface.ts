import { TaskEntity } from "../entities/task.entity";

export interface ITaskRepository {
    create(task: TaskEntity): Promise<TaskEntity>;
    findAll(): Promise<TaskEntity[]>;
    findOne(id: string): Promise<TaskEntity>;
}

export const TASK_REPOSITORY_INTERFACE = Symbol('ITaskRepository');