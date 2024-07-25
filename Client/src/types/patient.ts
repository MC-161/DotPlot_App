// types/patient.ts
export interface Patient {
  _id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  history: string;
  scans: []; // Array of scan IDs
}

export interface RecentPatient {
  _id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  history: string;
}