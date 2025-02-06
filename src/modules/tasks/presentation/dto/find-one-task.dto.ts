import { IsNotEmpty, IsUUID } from "class-validator";

export class FindOneTaskDto {
    @IsUUID()
    @IsNotEmpty({ message: "Task id is required" })
    taskId: string
}