export interface Standpoint {
  id: string;
  title: string;
  content: Array<string>;
  date: string;
  link: string;
  party: string;
  subject: number;
}

export interface SubjectListEntry {
  id: number;
  name: string;
  related_subjects: Array<number>;
}

export interface Subject {
  name: string;
  id: number;
  related_subjects: Array<SubjectListEntry>;
  standpoints: Array<Standpoint>;
}
