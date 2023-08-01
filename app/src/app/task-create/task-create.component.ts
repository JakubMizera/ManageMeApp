import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Priority, Status, Task } from '../types';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {
  taskForm!: FormGroup;
  projectId!: number;
  functionalityId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));

    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      priority: [Priority.MEDIUM, Validators.required],
      status: [Status.TODO, Validators.required],
      addedDate: [new Date(), Validators.required],
    });
  };

  onSubmit(): void {
    if (this.taskForm.valid) {
      const newTask: Task = this.taskForm.value;
      const taskId = this.taskService.addTask(this.projectId, this.functionalityId, newTask);
      this.taskForm.reset();
      this.router.navigate(['/project', this.projectId, 'functionality', this.functionalityId, 'task', taskId]);
    };
  };

};
