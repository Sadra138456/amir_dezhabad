export type Language = 'fa' | 'en';

export interface PersonalInfo {
  name: string;
  group: string;
  field: string;
  rank: string;
  email: string;
  academicEmail: string;
  profileImage: string;
}

export interface Education {
  id: number;
  degree: string;
  field: string;
  university: string;
  year: string;
}

export interface TeachingCourse {
  id: number;
  title: string;
}

export interface Article {
  id: number;
  title: string;
  authors: string;
  journal: string;
  year: string;
  volume?: string;
  page?: string;
  type: 'journal' | 'conference';
}

export interface Thesis {
  id: number;
  title: string;
  role: string;
  student: string;
  university: string;
  year: string;
  level: string;
}

export enum TabView {
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  EDUCATION = 'education',
  PUBLICATIONS = 'publications',
  TEACHING = 'teaching',
  THESIS = 'thesis'
}