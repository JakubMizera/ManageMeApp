import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
  };

  toggleDetails(project: Project): void {
    project.showDetails = !project.showDetails;
  }

}
