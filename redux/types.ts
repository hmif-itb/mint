import { Dispatch } from 'redux';
import { SessionSummary } from '../helpers/types';

export enum Step {
  SELECT_INTERVIEW = 0,
  CONFIRMATION = 1,
  INTERVIEW = 2,
  FINISHED = 3
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

export interface InterviewSessionData {
  interviewerNim: string;
  intervieweeNim: string;
  interviewerName?: string;
  intervieweeName?: string;
  interview: Interview;
}

export enum StateAction {
  SET_SESSION_STATE = 'setSessionState',
  SET_INTERVIEW_PAGE_STATE = 'setInterviewPageState',
  SET_USAGE_LOGGING_STATE = 'setUsageLoggingState',
  SET_TRACKER_STATE = 'setTrackerState',
  USAGE_LOGGING_SET_TIME_ELAPSED = 'usageLoggingSetTimeElapsed',
  CLEAR_STATE = 'clearState'
}

export interface SessionState {
  interviews: Interview[];
  currentStep: Step;
  sessionId?: string;
  interviewSessionData?: InterviewSessionData;
  sessionSummary?: SessionSummary;
}

export interface InterviewPageState {
  timeElapsed: number;
  notesOpen: boolean;
  notesContent: string;
  timerEnabled: boolean;
  stopDialogOpen: boolean;
  activeStep: number;
  lastStepChangeTimestamp: number;
}

export interface UsageLoggingState {
  beginTime?: number;
  endTime?: number;
  logs: LogEntry[];
  sectionCumulativeTime: { [order: number]: number };
}

export interface TrackerState {
  userAgentId?: string;
}

export interface MintState {
  session: SessionState;
  interviewPage: InterviewPageState;
  usageLogging: UsageLoggingState;
  tracker: TrackerState;
}

export interface LogEntry {
  timestamp: number;
  timeElapsed: number;
  eventType: string;
  eventData: string;
}

export const defaultSessionState: SessionState = {
  interviews: [],
  currentStep: Step.SELECT_INTERVIEW
};

export const defaultInterviewPageState: InterviewPageState = {
  timeElapsed: 0,
  notesOpen: true,
  notesContent: '',
  timerEnabled: true,
  stopDialogOpen: false,
  activeStep: 0,
  lastStepChangeTimestamp: 0
};

export const defaultUsageLoggingState: UsageLoggingState = {
  logs: [],
  sectionCumulativeTime: {}
};

export const defaultTrackerState: TrackerState = {
  userAgentId: undefined
};

export const defaultState: MintState = {
  session: defaultSessionState,
  interviewPage: defaultInterviewPageState,
  usageLogging: defaultUsageLoggingState,
  tracker: defaultTrackerState
};

export interface MintReduxComponent {
  state: MintState;
  dispatch: Dispatch;
}
