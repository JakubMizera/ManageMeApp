export interface User {
  id: number,
  firstName: string,
  lastName: string,
  role: Role,
  login: string,
  password: string,
  securityQuestion?: string,
  assignedTasks: Task[],
  completedTasks: Task[],
};

export interface Task {
  id: number,
  name: string,
  description: string,
  priority: Priority,
  status: Status,
  addedDate: Date,
  startDate?: Date,
  finishedDate?: Date,
  hoursWorked: number,
  assignedTo: User,
};

export interface Functionality {
  id: number,
  name: string,
  description: string,
  priority: Priority,
  status: Status,
  addedDate: Date,
  startDate?: Date,
  involvedUsers: User[],
  hoursWorked: number,
  tasks: Task[],
};

export interface Project {
  id: number,
  name: string,
  description: string,
  startDate: Date,
  duration: number,
  expectedDuration: number,
  hoursWorked: number,
  functionalities: Functionality[],
  involvedUsers: User[],
  selected?: boolean,
};

export enum Status {
  TODO = "To do",
  DOING = 'Doing',
  DONE = 'Done',
};

export enum Priority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
};

export enum Role {
  ADMIN = 'Admin',
  DEVOPS = 'Devops',
  DEVELOPER = 'Developer',
};
