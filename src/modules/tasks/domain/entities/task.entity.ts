import { TaskStatusEnum } from "src/shared/enums/task-status.enum";


export class TaskEntity {
    constructor(
      public readonly id: string,
      public title: string,
      public description: string,
      public status: TaskStatusEnum
    ) {}
}
  