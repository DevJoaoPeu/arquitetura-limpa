import { Module } from "@nestjs/common";
import { TaskController } from "./presentation/controller/task.controller";
import { CreateTaskUseCase } from "./application/usecases/create-task.usecase";
import { TaskRepository } from "./infra/repositories/task.repository";
import { TASK_REPOSITORY_INTERFACE } from "./domain/repositories/task.repository.interface";
import { CREATE_TASKS_USECASE_INTERFACE } from "./application/interfaces/create-tasks.usecases.interface";
import { FIND_ALL_TASKS_USECASE_INTERFACE } from "./application/interfaces/find-all-tasks.usecase.interface";
import { FindAllTasksUseCase } from "./application/usecases/find-all-tasks.usecase";

@Module({
    controllers: [TaskController],
    providers: [
        {
            provide: CREATE_TASKS_USECASE_INTERFACE,
            useClass: CreateTaskUseCase
        },
        {
            provide: FIND_ALL_TASKS_USECASE_INTERFACE,
            useClass: FindAllTasksUseCase
        },
        {
            provide: TASK_REPOSITORY_INTERFACE,
            useClass: TaskRepository
        }
     ],
    exports: []
})
export class TaskModule {}