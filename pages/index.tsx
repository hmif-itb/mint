import React from 'react';
import InterviewSelector from "../components/InterviewSelector";
import InterviewConfirm from "../components/InterviewConfirm";
import InterviewPage from "../components/InterviewPage";
import {Interview, InterviewSessionData, SessionSummary, Step} from "../helpers/types";
import * as eventLogger from "../helpers/eventlogger";
import InterviewFinished from "../components/InterviewFinished";

interface MyState {
    interviews: Interview[];
    currentStep: Step;
    interviewSessionData?: InterviewSessionData;
    sessionSummary?: SessionSummary;
}

export default class WelcomePage extends React.Component<MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        interviews: [],
        currentStep: Step.SELECT_INTERVIEW
    };

    componentDidMount() {

    }

    goBack() {
        switch (this.state.currentStep) {
            case Step.CONFIRMATION:
                this.setState({ currentStep: Step.SELECT_INTERVIEW });
                break;
            case Step.INTERVIEW:
                this.setState({ currentStep: Step.CONFIRMATION });
                break;
        }
    }

    goNext() {
        switch (this.state.currentStep) {
            case Step.SELECT_INTERVIEW:
                this.setState({ currentStep: Step.CONFIRMATION });
                break;
            case Step.CONFIRMATION:
                this.setState({ currentStep: Step.INTERVIEW });
                break;
            case Step.INTERVIEW:
                this.setState({ currentStep: Step.FINISHED });
                break;
        }
    }

    resetSession() {
        this.setState({
            currentStep: Step.SELECT_INTERVIEW ,
            interviewSessionData: undefined
        });
    }

    finishSession(sessionSummary: SessionSummary) {
        this.setState({
            sessionSummary
        });
        this.goNext();
    }

    // TODO create endSession

    onInterviewSelectorProceed(interviewSessionData: InterviewSessionData) {
        this.setState({
            interviewSessionData,
            currentStep: Step.CONFIRMATION
        });

        eventLogger.initSession(interviewSessionData);
    }

    render() {
        return (
            <>
                { this.state.currentStep === Step.SELECT_INTERVIEW &&
                    (<InterviewSelector onProceed={(i) => this.onInterviewSelectorProceed(i)} />) }

                { this.state.currentStep === Step.CONFIRMATION && !!this.state.interviewSessionData &&
                    (<InterviewConfirm onBack={() => this.goBack()} onProceed={() => this.goNext()} interviewSessionData={this.state.interviewSessionData} />) }

                { this.state.currentStep === Step.INTERVIEW && !!this.state.interviewSessionData &&
                    (<InterviewPage
                        onReset={() => this.resetSession()}
                        onFinish={(s) => this.finishSession(s)}
                        interviewSessionData={this.state.interviewSessionData}
                    />) }

                { this.state.currentStep === Step.FINISHED && !!this.state.interviewSessionData && !!this.state.sessionSummary &&
                    (<InterviewFinished
                        onReset={() => this.resetSession()}
                        interviewSessionData={this.state.interviewSessionData}
                        sessionSummary={this.state.sessionSummary}
                    />) }
            </>
        );
    }
}
