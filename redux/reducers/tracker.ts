import { defaultTrackerState, StateAction, TrackerState } from '../types';
import { AnyAction } from 'redux';

export default function trackerReducer(state: TrackerState = defaultTrackerState, action: AnyAction): TrackerState {
  switch (action.type) {
    case StateAction.SET_TRACKER_STATE:
      return { ...state, ...action.state } as TrackerState;
    default:
      return state;
  }
}
