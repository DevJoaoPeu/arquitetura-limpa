import { TaskEntity } from "./task.entity";
import { TaskStatusEnum } from "../../../../shared/enums/task-status.enum";

describe('TaskEntity', () => {
    it('should create a valid TaskEntity', () => {
        const task = new TaskEntity(
            '123e4567-e89b-12d3-a456-426614174000',
            'Test Task',
            'This is a test task',
            TaskStatusEnum.PENDING
        );

        expect(task).toBeDefined();
        expect(task.id).toBe('123e4567-e89b-12d3-a456-426614174000');
        expect(task.title).toBe('Test Task');
        expect(task.description).toBe('This is a test task');
        expect(task.status).toBe(TaskStatusEnum.PENDING);
    });

    it('should allow changing title and description', () => {
        const task = new TaskEntity(
            '123e4567-e89b-12d3-a456-426614174000',
            'Initial Task',
            'Initial description',
            TaskStatusEnum.IN_PROGRESS
        );

        task.title = 'Updated Task';
        task.description = 'Updated description';

        expect(task.title).toBe('Updated Task');
        expect(task.description).toBe('Updated description');
    });

    it('should correctly update status', () => {
        const task = new TaskEntity(
            '123e4567-e89b-12d3-a456-426614174000',
            'Test Task',
            'This is a test task',
            TaskStatusEnum.PENDING
        );

        task.status = TaskStatusEnum.COMPLETED;

        expect(task.status).toBe(TaskStatusEnum.COMPLETED);
    });
});
