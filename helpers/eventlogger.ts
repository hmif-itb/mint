import axios from 'axios';
import { SessionSummary } from './types';
import { InterviewSessionData } from '../redux/types';

const usageLoggingBaseUrl = process.env.usageLoggingBaseUrl || '';

export async function initSession(interviewSessionData: InterviewSessionData) {
  const { interviewerNim, interviewerName, intervieweeNim, intervieweeName, interview } = interviewSessionData;
  const { id, title } = interview;

  const requestData = {
    interviewerNim,
    interviewerName,
    intervieweeNim,
    intervieweeName,
    interviewId: id,
    interviewName: title
  };

  const response = await axios.post(`${usageLoggingBaseUrl}/v1/init`, requestData);
  const { sessionId, userAgentId } = response.data;
  return { sessionId };
}

export function endSession(sessionId: string, sessionSummary: SessionSummary) {
  // emitEvent(sessionSummary.timeElapsed, 'end', JSON.stringify(sessionSummary));
  // TODO call server
}
