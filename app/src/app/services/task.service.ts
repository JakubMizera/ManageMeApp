import { Injectable } from '@angular/core';
import { FunctionalityService } from './functionality.service';
import { Task, Status } from '../types';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private functionalityService: FunctionalityService) { }

  private getFunctionalityById(projectId: number, functionalityId: number) {
    return this.functionalityService.getFunctionalityById(projectId, functionalityId);
  };

  getAllTasks(projectId: number, functionalityId: number): Task[] | null {
    const functionality = this.getFunctionalityById(projectId, functionalityId);

    if (functionality) {
      return functionality.tasks;
    } else {
      return null;
    };
  };

  getTaskById(projectId: number, functionalityId: number, taskId: number): Task | null {
    const tasks = this.getAllTasks(projectId, functionalityId);

    if (tasks) {
      return tasks.find(t => t.id === taskId) || null;
    } else {
      return null;
    };
  };

  addTask(projectId: number, functionalityId: number, task: Task): void {
    const functionality = this.getFunctionalityById(projectId, functionalityId);
    if (functionality !== null) {
      const taskId = functionality.tasks.reduce((prev, curr) => curr.id > prev ? curr.id : prev, 0) + 1;
      if (functionality && !functionality.tasks.includes(task)) {
        task.id = taskId;
        functionality.tasks.push(task);
        this.functionalityService.editFunctionality(projectId, functionalityId, functionality);
      };
    };
  };

  editTask(projectId: number, functionalityId: number, taskId: number, updatedTask: Task): void {
    const functionality = this.getFunctionalityById(projectId, functionalityId);

    if (functionality) {
      const index = functionality.tasks.findIndex(t => t.id === taskId);

      if (index !== -1) {
        updatedTask.id = taskId;
        functionality.tasks[index] = updatedTask;
        this.functionalityService.editFunctionality(projectId, functionalityId, functionality);
      };
    };
  };

  deleteTask(projectId: number, functionalityId: number, taskId: number): void {
    const functionality = this.getFunctionalityById(projectId, functionalityId);

    if (functionality) {
      const index = functionality.tasks.findIndex(t => t.id === taskId);

      if (index !== -1) {
        functionality.tasks.splice(index, 1);
        this.functionalityService.editFunctionality(projectId, functionalityId, functionality);
      };
    };
  };

  getTasksByStatus(projectId: number, functionalityId: number, status: Status): Task[] | null {
    const tasks = this.getAllTasks(projectId, functionalityId);
    if (tasks) {
      return tasks.filter(t => t.status === status);
    } else {
      return null;
    };
  };
};
