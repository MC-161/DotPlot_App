// src/types.ts
export interface Patient {
  _id: number;
  name: string;
  age: number;
  height: number;
  weight: number;
  history: string;
  scans: number[];
}

export interface Scan {
  _id: number;
  coordinates: string;
  date: string; // ISO date string
  diagnosis: string;
  imagePath: string;
}