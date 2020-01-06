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
