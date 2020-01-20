import React from 'react';
import { connect } from 'react-redux';
import InterviewSelector from '../components/InterviewSelector';
import InterviewConfirm from '../components/InterviewConfirm';
import InterviewPage from '../components/InterviewPage';
import { SessionSummary } from '../helpers/types';
import { eventLogger } from '../helpers/eventlogger';
import InterviewFinished from '../components/InterviewFinished';
import { InterviewSessionData, MintReduxComponent, MintState, Step } from '../redux/types';
import { clearState, setSessionState, setTrackerState } from '../redux/actions';

class WelcomePage extends React.Component<MintReduxComponent> {
  constructor(props: MintReduxComponent) {
    super(props);
  }

  get sessionState() {
    return this.props.state.session;
  }

  render() {
    const state = this.sessionState;

    return (
      <>
        {state.currentStep === Step.SELECT_INTERVIEW && (
          <InterviewSelector onProceed={(i) => this.onInterviewSelectorProceed(i)} />
        )}

        {state.currentStep === Step.CONFIRMATION && !!state.interviewSessionData && (
          <InterviewConfirm
            onBack={() => this.goBack()}
            onProceed={() => this.goNext()}
            interviewSessionData={state.interviewSessionData}
          />
        )}

        {state.currentStep === Step.INTERVIEW && !!state.interviewSessionData && (
          <InterviewPage
            onReset={() => this.resetSession()}
            onFinish={(s) => this.finishSession(s)}
            interviewSessionData={state.interviewSessionData}
          />
        )}

        {state.currentStep === Step.FINISHED && !!state.interviewSessionData && !!state.sessionSummary && (
          <InterviewFinished
            onReset={() => this.resetSession()}
            interviewSessionData={state.interviewSessionData}
            sessionSummary={state.sessionSummary}
          />
        )}
      </>
    );
  }

  setReduxSessionState(state: {}) {
    this.props.dispatch(setSessionState(state));
  }

  goBack() {
    switch (this.sessionState.currentStep) {
      case Step.CONFIRMATION:
        this.setReduxSessionState({ currentStep: Step.SELECT_INTERVIEW });
        break;
      case Step.INTERVIEW:
        this.setReduxSessionState({ currentStep: Step.CONFIRMATION });
        break;
    }
  }

  goNext() {
    switch (this.sessionState.currentStep) {
      case Step.SELECT_INTERVIEW:
        this.setReduxSessionState({ currentStep: Step.CONFIRMATION });
        break;
      case Step.CONFIRMATION:
        this.setReduxSessionState({ currentStep: Step.INTERVIEW });
        break;
      case Step.INTERVIEW:
        this.setReduxSessionState({ currentStep: Step.FINISHED });
        break;
    }
  }

  resetSession() {
    this.props.dispatch(clearState());
  }

  finishSession(sessionSummary: SessionSummary) {
    const { sessionId } = this.sessionState;

    if (sessionId) {
      eventLogger.endSession(sessionId, sessionSummary).catch((e) => {
        console.error('Cannot end session', e);
      });
    }

    this.setReduxSessionState({
      sessionSummary
    });

    this.goNext();
  }

  onInterviewSelectorProceed(interviewSessionData: InterviewSessionData) {
    this.setReduxSessionState({
      interviewSessionData,
      currentStep: Step.CONFIRMATION
    });

    const currentUserAgentId = this.props.state.tracker.userAgentId;

    eventLogger.initSession(interviewSessionData, currentUserAgentId).then((res) => {
      const { sessionId, userAgentId } = res;
      this.setReduxSessionState({ sessionId });
      this.props.dispatch(setTrackerState({ userAgentId }));
    });
  }
}

export default connect((state: MintState) => ({ state }))(WelcomePage);
