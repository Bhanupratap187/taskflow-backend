import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { TaskStatus, TaskPriority } from '../entities/task.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(TaskStatus, {
    message: `Status must be one of the following values: ${Object.values(
      TaskStatus,
    ).join(', ')}`,
  })
  @IsOptional()
  status?: TaskStatus;

  @IsEnum(TaskPriority, {
    message: `Priority must be one of the following values: ${Object.values(
      TaskPriority,
    ).join(', ')}`,
  })
  @IsOptional()
  priority?: TaskPriority;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
