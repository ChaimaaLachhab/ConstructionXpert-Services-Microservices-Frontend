export enum Status {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id?: number;
  description: string;
  startDate: string;
  endDate: string;
  status: Status;
  projectId: number;
}
