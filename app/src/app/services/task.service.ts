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

  addTask(projectId: number, functionalityId: number, task: Task): number | null {
    const functionality = this.getFunctionalityById(projectId, functionalityId);
    if (functionality !== null) {
      const taskId = functionality.tasks.reduce((prev, curr) => curr.id > prev ? curr.id : prev, 0) + 1;
      if (functionality && !functionality.tasks.includes(task)) {
        task.id = taskId;
        functionality.tasks.push(task);
        this.functionalityService.editFunctionality(projectId, functionalityId, functionality);
        return taskId;
      };
    };
    return null;
  };

  editTask(projectId: number, functionalityId: number, taskId: number, updatedTask: Task): void {
    const functionality = this.getFunctionalityById(projectId, functionalityId);
    const task = this.getTaskById(projectId, functionalityId, taskId);

    if (functionality) {
      const index = functionality.tasks.findIndex(t => t.id === taskId);

      if (index !== -1) {
        updatedTask.id = taskId;
        functionality.tasks[index] = updatedTask;
        // Set startDate if to functionality if any task status is set to DOING
        if (updatedTask.status === Status.DOING && !functionality.startDate) {
          functionality.startDate = new Date();
        };

        // Set startDate to task if task status is set to DOING
        if (task && updatedTask.status === Status.DOING && !updatedTask.startDate) {
          task.startDate = new Date();
        };

        // Set finishedDate to task if task status is set to DONE
        if (task && updatedTask.status === Status.DONE && !updatedTask.finishedDate) {
          task.finishedDate = new Date();
        };

        // Change functionality status from TODO to DOING if any task is set to DOING
        if (functionality.tasks.some(task => task.status === Status.DOING) && functionality.status === Status.TODO) {
          functionality.status = Status.DOING;
        };
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
