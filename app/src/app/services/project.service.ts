import { Injectable } from '@angular/core';
import { Project } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Project[] = [];

  constructor() { }

  getAllProjects(): Project[] {
    return this.projects
  };

  getProjectById(id: number): Project {
    const projects = this.getAllProjects();
    const project = projects.find(project => project.id === id);
    if (!project) {
      throw new Error(`Cannot find project with id ${id}`);
    }
    return project;
  };

  addProject(project: Project): void {
    const projects = this.getAllProjects();
    // const lastId = projects.reduce((last, current)=> current.id > last ? current.id : last, 0);
    // const newId = lastId + 1;
    projects.push(project);
  };

  editProject(id: number, projectToEdit: Project): void {
    const projects = this.getAllProjects();
    const index = projects.findIndex((project: Project) => project.id === id);
    if (index === -1) {
      throw new Error(`Cannot find project with id ${id}`);
    };
    projectToEdit.id = id;
    projects[index] = projectToEdit;
  };

  deleteProject(id: number): void {
    const projects = this.getAllProjects();
    const index = projects.findIndex((project: Project) => project.id === id);
    if (index === -1) {
      throw new Error(`Cannot find project with id ${id}`);
    };
    projects.splice(index, 1);
  };

}
