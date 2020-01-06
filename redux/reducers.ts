import { AnyAction, combineReducers } from 'redux';
import {
  InterviewStepperState,
  StateAction,
  IndexPageState,
  InterviewPageState,
  UsageLoggingState,
  defaultIndexPageState,
  defaultInterviewPageState,
  defaultInterviewStepperState,
  defaultUsageLoggingState
} from './types';

export function indexPageReducer(state: IndexPageState = defaultIndexPageState, action: AnyAction): IndexPageState {
  switch (action.type) {
    case StateAction.SET_INDEX_PAGE_STATE:
      return { ...state, ...action.state } as IndexPageState;
    case StateAction.CLEAR_STATE:
      return { ...defaultIndexPageState };
    default:
      return state;
  }
}

export function interviewPageReducer(
  state: InterviewPageState = defaultInterviewPageState,
  action: AnyAction
): InterviewPageState {
  switch (action.type) {
    case StateAction.SET_INTERVIEW_PAGE_STATE:
      return { ...state, ...action.state } as InterviewPageState;
    case StateAction.CLEAR_STATE:
      return { ...defaultInterviewPageState };
    default:
      return state;
  }
}

export function interviewStepperReducer(
  state: InterviewStepperState = defaultInterviewStepperState,
  action: AnyAction
): InterviewStepperState {
  switch (action.type) {
    case StateAction.SET_INTERVIEW_STEPPER_STATE:
      return { ...state, ...action.state } as InterviewStepperState;
    case StateAction.CLEAR_STATE:
      return { ...defaultInterviewStepperState };
    default:
      return state;
  }
}

export function usageLoggingReducer(
  state: UsageLoggingState = defaultUsageLoggingState,
  action: AnyAction
): UsageLoggingState {
  switch (action.type) {
    case StateAction.SET_USAGE_LOGGING_STATE:
      return { ...state, ...action.state } as UsageLoggingState;
    case StateAction.CLEAR_STATE:
      return { ...defaultUsageLoggingState };
    default:
      return state;
  }
}

export default combineReducers({
  indexPage: indexPageReducer,
  interviewPage: interviewPageReducer,
  interviewStepper: interviewStepperReducer,
  usageLogging: usageLoggingReducer
});
