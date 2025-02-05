import { IsEnum, isNotEmpty, IsNotEmpty, IsString, isUUID, IsUUID } from "class-validator";
import { TaskStatusEnum } from "../../../../shared/enums/task-status.enum";


export class CreateTaskDto {
    @IsString()  
    @IsNotEmpty({ message: "Title is required" })  
    title: string;

    @IsString()
    @IsNotEmpty({ message: "Description is required" })
    description: string;

    @IsEnum(TaskStatusEnum, { message: "Invalid status value" })  
    status: TaskStatusEnum;
}
