import { Component, OnInit } from '@angular/core';
import { Project } from '../types';
import { ProjectService } from '../services/project.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
    console.log(this.projects);
  };

  navigateToProject(id: number): void {
    this.router.navigate(['/project', id]);
  };

};
