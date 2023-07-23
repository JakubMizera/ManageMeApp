import { Injectable } from '@angular/core';
import { Project } from '../types';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  projects!: Project[];
  private defaultProjects: Project[] = [
    {
      id: 1,
      name: 'Project Management Tool',
      description: 'A web application for managing projects, tasks, and teams.',
      startDate: new Date('2023-07-02T10:00:00'),
      duration: 1,
      expectedDuration: 15,
      hoursWorked: 1,
      functionalities: [],
      involvedUsers: []
    },
    {
      id: 2,
      name: 'E-Commerce Platform',
      description: 'An online marketplace for buying and selling goods.',
      startDate: new Date('2023-07-02T10:00:00'),
      duration: 4,
      expectedDuration: 30,
      hoursWorked: 0,
      functionalities: [],
      involvedUsers: []
    },
    {
      id: 3,
      name: 'Weather Forecasting App',
      description: 'A mobile application that provides real-time weather updates and forecasts.',
      startDate: new Date('2023-07-03T11:00:00'),
      duration: 0,
      expectedDuration: 16,
      hoursWorked: 14,
      functionalities: [],
      involvedUsers: []
    }
  ];

  constructor() {
    this.loadProjectsFromLocalStorage();
    if (this.projects.length === 0) {
      this.projects = this.defaultProjects;
      this.saveProjectsToLocalStorage();
    };
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
}
