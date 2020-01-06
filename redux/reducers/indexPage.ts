import { defaultIndexPageState, IndexPageState, StateAction } from '../types';
import { AnyAction } from 'redux';

export default function indexPageReducer(state: IndexPageState = defaultIndexPageState, action: AnyAction): IndexPageState {
  switch (action.type) {
    case StateAction.SET_INDEX_PAGE_STATE:
      return { ...state, ...action.state } as IndexPageState;
    case StateAction.CLEAR_STATE:
      return { ...defaultIndexPageState };
    default:
      return state;
  }
}
