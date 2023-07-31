import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from '../types';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {
  projectId!: number;
  functionalityId!: number;
  taksId!: number
  task!: Task | null;

  constructor(private route: ActivatedRoute, private taksService: TaskService) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.functionalityId = Number(this.route.snapshot.paramMap.get('functionalityId'));
    this.taksId = Number(this.route.snapshot.paramMap.get('taskId'));

    if ((this.projectId || this.functionalityId || this.taksId) !== null) {
      this.task = this.taksService.getTaskById(this.projectId, this.functionalityId, this.taksId);
    } else {
      throw new Error('Cannot find projectId, functionalityId or taskId');
    };
  };

}
