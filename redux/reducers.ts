import { InterviewSessionData, SessionSummary, Action as StateAction } from "../helpers/types";
import {Action, AnyAction} from "redux";

export interface SessionState {
    interviewSessionData?: InterviewSessionData;
    currentSection?: number;
    sessionSummary?: SessionSummary;
    interviewersNote?: string;
}

export default function(state: SessionState = {}, action: AnyAction): SessionState {
    switch (action.type) {
        case StateAction.SET_STATE:
            return Object.assign({}, state, {
                ...action.state
            });
        default:
            return state
    }
}
