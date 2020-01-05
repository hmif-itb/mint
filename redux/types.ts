import { Dispatch } from 'redux';
import { Interview, InterviewSessionData, SessionSummary, Step } from '../helpers/types';

export enum StateAction {
  SET_INDEX_PAGE_STATE = 'setIndexPageState',
  SET_INTERVIEW_PAGE_STATE = 'setInterviewPageState',
  SET_INTERVIEW_STEPPER_STATE = 'setInterviewStepperState',
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

export const defaultState: MintState = {
  ...defaultIndexPageState,
  ...defaultInterviewPageState,
  ...defaultInterviewStepperState
};

export type MintState = IndexPageState & InterviewPageState & InterviewStepperState;

export interface MintReduxComponent<T = MintState> {
  state: T;
  dispatch: Dispatch;
}
