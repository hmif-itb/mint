import { AnyAction } from 'redux';
import {
  InterviewStepperState,
  StateAction,
  defaultState,
  IndexPageState,
  InterviewPageState,
  MintState
} from './types';

export default function(state: MintState = defaultState, action: AnyAction): MintState {
  switch (action.type) {
    case StateAction.SET_INDEX_PAGE_STATE:
      return { ...state, ...(action.state as IndexPageState) };
    case StateAction.SET_INTERVIEW_PAGE_STATE:
      return { ...state, ...(action.state as InterviewPageState) };
    case StateAction.SET_INTERVIEW_STEPPER_STATE:
      return { ...state, ...(action.state as InterviewStepperState) };
    case StateAction.CLEAR_STATE:
      return { ...state, ...defaultState };
    default:
      return state;
  }
}
