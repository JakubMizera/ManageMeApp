import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project } from '../types';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  projects!: Project[];

  constructor(private projectService: ProjectService, private router: Router) { }

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
  };

  navigateToHomepage(): void {
    this.projects.forEach(p => p.selected = false);
    this.router.navigate(['']);
  };

  navigateToProject(projectId: number): void {
    this.projects.forEach(p => p.selected = false);
    this.projects = this.projects.map(p => ({ ...p, selected: p.id === projectId }));
    this.router.navigate(['/project', projectId]);
  };

}
