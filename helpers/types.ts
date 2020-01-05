// import { Interview } from "./contentloader";

export enum Step {
  SELECT_INTERVIEW = 0,
  CONFIRMATION = 1,
  INTERVIEW = 2,
  FINISHED = 3
}

export interface InterviewSessionData {
  interviewerNim: string;
  intervieweeNim: string;
  interviewerName?: string;
  intervieweeName?: string;
  interview: Interview;
}

export interface SectionTuple {
  sectionTitle: string;
  sectionOrder: number;
  duration: number;
}

export interface SessionSummary {
  interviewer: string;
  interviewee: string;
  timeElapsed: number;
  interviewId: string;
  interviewTitle: string;
  sectionTuples: SectionTuple[];
}

export interface Interview {
  id: string;
  title: string;
  sections: Section[];
}

export interface Section {
  title: string;
  order: number;
  contents: string[];
}
