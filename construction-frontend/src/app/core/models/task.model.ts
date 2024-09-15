import {Status} from "../enums/status";

export interface Task {
  id?: number;
  description: string;
  startDate: string;
  endDate: string;
  status: Status;
  projectId: number;
}
