import { SessionState } from "./reducers";
import {Action} from "../helpers/types";
import {AnyAction} from "redux";

export function setState(sessionState: SessionState): AnyAction {
    return {
        type: Action.SET_STATE,
        state: sessionState
    }
}
