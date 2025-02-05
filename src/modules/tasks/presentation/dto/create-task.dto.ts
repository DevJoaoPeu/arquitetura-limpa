import { TaskStatusEnum } from "src/shared/enums/task-status.enum";

export class CreateTaskDto {
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly status: TaskStatusEnum;
  }