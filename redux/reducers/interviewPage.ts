import { defaultInterviewPageState, InterviewPageState, StateAction } from '../types';
import { AnyAction } from 'redux';

export default function interviewPageReducer(
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
