import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from '../types';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit {
  project!: Project;

  constructor(private projectService: ProjectService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const projectId = Number(this.route.snapshot.paramMap.get('id'));
    if (projectId === null) {
      throw new Error(`Cannot find project with id ${projectId}`);
    };
    this.project = this.projectService.getProjectById(projectId);
  };

  navigateToProjectEdit(id: number): void {
    this.router.navigate(['/project/edit', id]);
  };

  deleteProject(id: number): void {
    this.projectService.deleteProject(id);
    this.router.navigate(['/']);
  };

};
