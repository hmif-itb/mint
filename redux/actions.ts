import { AnyAction } from 'redux';
import { IndexPageState, InterviewPageState, InterviewStepperState, StateAction } from './types';

export function setIndexPageState(state: IndexPageState): AnyAction {
  return {
    type: StateAction.SET_INDEX_PAGE_STATE,
    state
  };
}

export function setInterviewPageState(state: InterviewPageState): AnyAction {
  return {
    type: StateAction.SET_INTERVIEW_PAGE_STATE,
    state
  };
}

export function setInterviewStepperState(state: InterviewStepperState): AnyAction {
  return {
    type: StateAction.SET_INTERVIEW_STEPPER_STATE,
    state
  };
}

export function clearState(): AnyAction {
  return {
    type: StateAction.CLEAR_STATE
  };
}
