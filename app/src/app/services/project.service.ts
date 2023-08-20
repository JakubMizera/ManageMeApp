import { Injectable } from '@angular/core';
import { Project } from '../types';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects!: Project[];

  constructor(private authService: AuthService) {
    this.loadProjectsFromLocalStorage();
  };

  private loadProjectsFromLocalStorage(): void {
    const storedProjects = localStorage.getItem('projects');
    this.projects = storedProjects ? JSON.parse(storedProjects) : [];
  };

  private saveProjectsToLocalStorage(): void {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  };

  getAllProjects(): Project[] {
    return this.projects;
  };

  getProjectById(id: number): Project {
    const project = this.projects.find(project => project.id === id);
    if (!project) {
      throw new Error(`Cannot find project with id ${id}`);
    }
    return project;
  };

  addProject(project: Project): number {
    const id = this.projects.reduce((prev, curr) => curr.id > prev ? curr.id : prev, 0) + 1;
    project.id = id;

    const loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser) {
      project.involvedUsers.push(loggedInUser);
    };

    this.projects.push(project);
    this.saveProjectsToLocalStorage();
    return id;
  };

  editProject(id: number, projectToEdit: Project): void {
    const index = this.projects.findIndex(project => project.id === id);
    if (index === -1) {
      throw new Error(`Cannot find project with id ${id}`);
    }
    projectToEdit.id = id;
    this.projects[index] = projectToEdit;
    projectToEdit.hoursWorked = this.calculateHoursWorked(id);
    this.saveProjectsToLocalStorage();
  };

  deleteProject(id: number): void {
    const index = this.projects.findIndex((project: Project) => project.id === id);
    if (index === -1) {
      throw new Error(`Cannot find project with id ${id}`);
    }
    this.projects.splice(index, 1);
    this.saveProjectsToLocalStorage();
  };

  validateDuration(formGroup: FormGroup) {
    const durationControl = formGroup.get('duration');
    const expectedDurationControl = formGroup.get('expectedDuration');

    if (durationControl && expectedDurationControl) {
      const duration = durationControl.value;
      const expectedDuration = expectedDurationControl.value;
      return duration < expectedDuration ? null : { durationError: true };
    }
    return null;
  };

  calculateHoursWorked(projectId: number): number {
    const project = this.getProjectById(projectId);
    let totalHours = 0;
    if (project) {
      project.functionalities.forEach((functionality) => {
        totalHours += functionality.hoursWorked;
      });
    };
    return totalHours;
  };
}
