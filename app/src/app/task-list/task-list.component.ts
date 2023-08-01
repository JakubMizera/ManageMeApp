import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Task, Status } from '../types';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];
  projectId: number;
  functionalityId: number;

  Status = Status;
  tasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));
  }

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.todoTasks = this.taskService.getTasksByStatus(this.projectId, this.functionalityId, Status.TODO) || [];
    this.doingTasks = this.taskService.getTasksByStatus(this.projectId, this.functionalityId, Status.DOING) || [];
    this.doneTasks = this.taskService.getTasksByStatus(this.projectId, this.functionalityId, Status.DONE) || [];
  }

  onStatusChange(task: Task, status: Status) {
    task.status = status;
    this.taskService.editTask(this.projectId, this.functionalityId, task.id, task);
    this.getTasks();
  }

  deleteTask(taskId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(this.projectId, this.functionalityId, taskId);
        this.getTasks();
      }
    });
  }

  navigateToCreateTask(functionalityId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', functionalityId, 'add']);
  };

  navigateToEditTask(taskId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', this.functionalityId, 'task', 'edit', taskId]);
  };

  navigateToTaskDetails(taskId: number): void {
    this.router.navigate(['project', this.projectId, 'functionality', this.functionalityId, 'task', taskId]);
  };
}
