import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../services/task.service';
import { Task } from '../types';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {
  projectId!: number;
  functionalityId!: number;
  taskId!: number;
  taskForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
  ) { }


  ngOnInit(): void {
    this.projectId = this.getIdByName('id');
    this.functionalityId = this.getIdByName('functionalityId');
    this.taskId = this.getIdByName('taskId');

    const task = this.taskService.getTaskById(this.projectId, this.functionalityId, this.taskId);

    if (task) {
      this.taskForm = this.formBuilder.group({
        name: new FormControl(task.name, Validators.required),
        description: new FormControl(task.description, Validators.required),
        priority: new FormControl(task.priority, Validators.required),
        status: new FormControl(task.status, Validators.required),
        addedDate: new FormControl(task.addedDate),
      });
    } else {
      throw new Error(`Cannot find task with id ${this.taskId}`);
    };

  };

  onSubmit(): void {
    if (this.taskForm.valid) {
      const updatedTask = { ...this.taskForm.value, id: this.taskId };
      this.taskService.editTask(this.projectId, this.functionalityId, this.taskId, updatedTask);
      this.router.navigate(['/project', this.projectId, 'functionality', this.functionalityId, 'task', 'list']);
    };
  }

  getIdByName(name: string): number {
    return Number(this.route.snapshot.paramMap.get(name));
  };

}
