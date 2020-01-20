import axios from 'axios';
import { SessionSummary } from './types';
import { InterviewSessionData } from '../redux/types';

export class EventLogger {
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async initSession(interviewSessionData: InterviewSessionData, currentUserAgentId?: string) {
    const { interviewerNim, interviewerName, intervieweeNim, intervieweeName, interview } = interviewSessionData;
    const { id, title } = interview;

    const requestData = {
      interviewerNim,
      interviewerName,
      intervieweeNim,
      intervieweeName,
      interviewId: id,
      interviewName: title,
      userAgentId: currentUserAgentId
    };

    const response = await axios.post(`${this.baseUrl}/v1/init`, requestData);
    const { sessionId, userAgentId } = response.data;
    return { sessionId, userAgentId };
  }

  async endSession(sessionId: string, sessionSummary: SessionSummary) {
    const sections = sessionSummary.sectionTuples.map((sectionTuple) => ({
      title: sectionTuple.sectionTitle,
      order: sectionTuple.sectionOrder,
      timeElapsed: sectionTuple.timeElapsed
    }));

    const requestData = {
      id: sessionId,
      timeElapsed: sessionSummary.timeElapsed,
      sections
    };

    await axios.post(`${this.baseUrl}/v1/finish`, requestData);
  }

  async sendMail(sessionId: string, email: string, interviewerNotes: string, recaptcha: string) {
    const requestData = { sessionId, email, interviewerNotes, recaptcha };
    await axios.post(`${this.baseUrl}/v1/mail`, requestData);
  }
}

export const eventLogger = new EventLogger(process.env.usageLoggingBaseUrl || '');
