import { defaultSessionState, SessionState, StateAction } from '../types';
import { AnyAction } from 'redux';

export default function sessionReducer(state: SessionState = defaultSessionState, action: AnyAction): SessionState {
  switch (action.type) {
    case StateAction.SET_SESSION_STATE:
      return { ...state, ...action.state } as SessionState;
    case StateAction.CLEAR_STATE:
      return { ...defaultSessionState };
    default:
      return state;
  }
}
