import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { Project, User } from '../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  projects!: Project[];
  loggedInUser: User | null = null;

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.projects = this.projectService.getAllProjects();
    this.authService.currentUser.subscribe(user => this.loggedInUser = user);
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

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  };

}
