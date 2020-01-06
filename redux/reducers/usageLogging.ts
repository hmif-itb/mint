import { defaultUsageLoggingState, StateAction, UsageLoggingState } from '../types';
import { AnyAction } from 'redux';

export default function usageLoggingReducer(
  state: UsageLoggingState = defaultUsageLoggingState,
  action: AnyAction
): UsageLoggingState {
  switch (action.type) {
    case StateAction.SET_USAGE_LOGGING_STATE:
      return { ...state, ...action.state } as UsageLoggingState;
    case StateAction.USAGE_LOGGING_SET_TIME_ELAPSED:
      let sectionCumulativeTime = { ...state.sectionCumulativeTime };
      sectionCumulativeTime[action.order] = action.timeElapsed;
      return { ...state, sectionCumulativeTime };
    case StateAction.CLEAR_STATE:
      return { ...defaultUsageLoggingState };
    default:
      return state;
  }
}
