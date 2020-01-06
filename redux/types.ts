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
  SET_INDEX_PAGE_STATE = 'setIndexPageState',
  SET_INTERVIEW_PAGE_STATE = 'setInterviewPageState',
  SET_INTERVIEW_STEPPER_STATE = 'setInterviewStepperState',
  SET_USAGE_LOGGING_STATE = 'setUsageLoggingState',
  CLEAR_STATE = 'clearState'
}

export interface IndexPageState {
  interviews: Interview[];
  currentStep: Step;
  interviewSessionData?: InterviewSessionData;
  sessionSummary?: SessionSummary;
}

export interface InterviewPageState {
  timeElapsed: number;
  notesOpen: boolean;
  notesContent: string;
  timerEnabled: boolean;
  stopDialogOpen: boolean;
}

export interface InterviewStepperState {
  activeStep: number;
}

export interface LogEntry {
  timestamp: number;
  timeElapsed: number;
  eventType: string;
  eventData: string;
}

export interface UsageLoggingState {
  beginTime?: number;
  endTime?: number;
  logs: LogEntry[];
  sectionCumulativeTime: { [order: number]: { duration: number } };
}

export const defaultIndexPageState: IndexPageState = {
  interviews: [],
  currentStep: Step.SELECT_INTERVIEW
};

export const defaultInterviewPageState: InterviewPageState = {
  timeElapsed: 0,
  notesOpen: true,
  notesContent: '',
  timerEnabled: true,
  stopDialogOpen: false
};

export const defaultInterviewStepperState: InterviewStepperState = {
  activeStep: 0
};

export const defaultUsageLoggingState: UsageLoggingState = {
  logs: [],
  sectionCumulativeTime: {}
};

export const defaultState: MintState = {
  indexPage: defaultIndexPageState,
  interviewPage: defaultInterviewPageState,
  interviewStepper: defaultInterviewStepperState,
  usageLogging: defaultUsageLoggingState
};

export interface MintState {
  indexPage: IndexPageState;
  interviewPage: InterviewPageState;
  interviewStepper: InterviewStepperState;
  usageLogging: UsageLoggingState;
}

export interface MintReduxComponent {
  state: MintState;
  dispatch: Dispatch;
}
