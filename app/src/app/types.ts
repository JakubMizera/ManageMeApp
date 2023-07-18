export interface Task {
  id: number,
  name: string,
  description: string,
  priority: Priority,
  status: Status,
  dueDate: Date,
  addedDate: Date,
  startDate?: Date,
  finishedDate?: Date,
};

export interface Functionality {
  id: number,
  name: string,
  description: string,
  priority: Priority,
  status: Status,
  tasks: Task[],
};

export interface Project {
  id: number,
  name: string,
  description: string,
  functionalities: Functionality[],
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
