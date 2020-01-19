export interface SectionTuple {
  sectionTitle: string;
  sectionOrder: number;
  timeElapsed: number;
}

export interface SessionSummary {
  timeElapsed: number;
  sectionTuples: SectionTuple[];
}
