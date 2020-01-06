import { AnyAction } from 'redux';
import { IndexPageState, InterviewPageState, StateAction, UsageLoggingState } from './types';

export function setIndexPageState(state: Partial<IndexPageState>): AnyAction {
  return {
    type: StateAction.SET_INDEX_PAGE_STATE,
    state
  };
}

export function setInterviewPageState(state: Partial<InterviewPageState>): AnyAction {
  return {
    type: StateAction.SET_INTERVIEW_PAGE_STATE,
    state
  };
}

export function setUsageLoggingState(state: Partial<UsageLoggingState>): AnyAction {
  return {
    type: StateAction.SET_USAGE_LOGGING_STATE,
    state
  };
}

export function usageLoggingSetTimeElapsed(order: number, timeElapsed: number): AnyAction {
  return {
    type: StateAction.USAGE_LOGGING_SET_TIME_ELAPSED,
    order,
    timeElapsed
  };
}

export function clearState(): AnyAction {
  return {
    type: StateAction.CLEAR_STATE
  };
}
