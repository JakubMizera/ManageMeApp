import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project!: Project;
  projectId!: number;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.project = this.projectService.getProjectById(this.projectId);
  };

}
