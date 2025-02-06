import { Inject, Injectable } from "@nestjs/common";
import { ITaskRepository, TASK_REPOSITORY_INTERFACE } from "../../domain/repositories/task.repository.interface";

@Injectable()
export class FindOndTaskUseCase {
    constructor(
        @Inject(TASK_REPOSITORY_INTERFACE)
        private readonly taskRepository: ITaskRepository
    ) {}

    execute(id: string) {
        return this.taskRepository.findOne(id);
    }
}