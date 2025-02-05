import { Injectable } from "@nestjs/common";
import { ITaskRepository } from "../../domain/repositories/task.repository.interface";
import { TaskEntity } from "../../domain/entities/task.entity";

@Injectable()
export class TaskRepository implements ITaskRepository {
    private readonly tasks: TaskEntity[] = [];

    async create(task: TaskEntity): Promise<TaskEntity> {
        await this.tasks.push(task);
        return task
    }

    async findAll(): Promise<TaskEntity[]> {
        return this.tasks;
    }
}