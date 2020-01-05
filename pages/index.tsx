import React from 'react';
import { connect } from 'react-redux';
import InterviewSelector from '../components/InterviewSelector';
import InterviewConfirm from '../components/InterviewConfirm';
import InterviewPage from '../components/InterviewPage';
import { InterviewSessionData, SessionSummary, Step } from '../helpers/types';
import * as eventLogger from '../helpers/eventlogger';
import InterviewFinished from '../components/InterviewFinished';
import { IndexPageState, MintReduxComponent } from '../redux/types';
import { clearState, setIndexPageState } from '../redux/actions';

class WelcomePage extends React.Component<MintReduxComponent<IndexPageState>> {
  render() {
    const { state } = this.props;

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

  setReduxState(state: {}) {
    this.props.dispatch(setIndexPageState({ ...this.props.state, ...state }));
  }

  goBack() {
    switch (this.props.state.currentStep) {
      case Step.CONFIRMATION:
        this.setReduxState({ currentStep: Step.SELECT_INTERVIEW });
        break;
      case Step.INTERVIEW:
        this.setReduxState({ currentStep: Step.CONFIRMATION });
        break;
    }
  }

  goNext() {
    switch (this.props.state.currentStep) {
      case Step.SELECT_INTERVIEW:
        this.setReduxState({ currentStep: Step.CONFIRMATION });
        break;
      case Step.CONFIRMATION:
        this.setReduxState({ currentStep: Step.INTERVIEW });
        break;
      case Step.INTERVIEW:
        this.setReduxState({ currentStep: Step.FINISHED });
        break;
    }
  }

  resetSession() {
    this.props.dispatch(clearState());
  }

  finishSession(sessionSummary: SessionSummary) {
    this.setReduxState({
      sessionSummary
    });
    this.goNext();
  }

  // TODO create endSession

  onInterviewSelectorProceed(interviewSessionData: InterviewSessionData) {
    this.setReduxState({
      interviewSessionData,
      currentStep: Step.CONFIRMATION
    });

    eventLogger.initSession(interviewSessionData);
  }
}

export default connect((state: IndexPageState) => ({ state }))(WelcomePage);
