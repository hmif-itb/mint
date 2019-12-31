import { Interview } from "./contentloader";

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
