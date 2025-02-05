import { Module } from "@nestjs/common";
import { TaskController } from "./presentation/controller/task.controller";
import { CreateTaskUseCase } from "./application/usecases/create-task.usecase";
import { TaskRepository } from "./infra/repositories/task.repository";
import { TASK_REPOSITORY_INTERFACE } from "./domain/repositories/task.repository.interface";
import { CREATE_TASKS_USECASE_INTERFACE } from "./application/interfaces/create-tasks.usecases.interface";

@Module({
    controllers: [TaskController],
    providers: [
        {
            provide: CREATE_TASKS_USECASE_INTERFACE,
            useClass: CreateTaskUseCase
        },
        {
            provide: TASK_REPOSITORY_INTERFACE,
            useClass: TaskRepository
        }
     ],
    exports: []
})
export class TaskModule {}