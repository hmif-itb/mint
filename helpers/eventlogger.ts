import uuidv4 from 'uuid/v4';
import {InterviewSessionData, SessionSummary} from "./types";

let sessionId: string;
let sequenceNumber = 0;
let logEvents: LogEntry[] = [];

export interface LogEntry {
    timestamp: number;
    timeElapsed: number;
    eventType: string;
    eventData: string;
}

export function initSession(interviewSessionData: InterviewSessionData) {
    sessionId = uuidv4();
    emitEvent(0, "init", JSON.stringify(interviewSessionData));
}

export function emitEvent(timeElapsed: number, eventType: string, eventData: string) {
    const entry: LogEntry = {
        timestamp: Math.round(Date.now() / 1000),
        timeElapsed,
        eventType,
        eventData
    };

    logEvents.push(entry);
    sequenceNumber++;
}

export function endSession(sessionSummary: SessionSummary) {
    emitEvent(sessionSummary.timeElapsed, "end", JSON.stringify(sessionSummary));
    // TODO call server
}
