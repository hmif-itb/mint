import React from 'react';
import { Interview } from "../src/contentloader";
import InterviewSelector from "../components/InterviewSelector";
import InterviewConfirm from "../components/InterviewConfirm";
import InterviewPage from "../components/InterviewPage";
import { InterviewSessionData } from "../src/types";

interface MyState {
    interviews: Interview[];
    currentStep: Step;
    interviewSessionData?: InterviewSessionData;
}

enum Step {
    SELECT_INTERVIEW = 0,
    CONFIRMATION = 1,
    INTERVIEW = 2
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
        }
    }

    onInterviewSelectorProceed(interviewSessionData: InterviewSessionData) {
        this.setState({
            interviewSessionData,
            currentStep: Step.CONFIRMATION
        });
    }

    render() {
        return (
            <>
                { this.state.currentStep === Step.SELECT_INTERVIEW &&
                    (<InterviewSelector onProceed={(i) => this.onInterviewSelectorProceed(i)} />) }

                { this.state.currentStep === Step.CONFIRMATION && !!this.state.interviewSessionData &&
                    (<InterviewConfirm onBack={() => this.goBack()} onProceed={() => this.goNext()} interviewSessionData={this.state.interviewSessionData} />) }

                { this.state.currentStep === Step.INTERVIEW && !!this.state.interviewSessionData &&
                    (<InterviewPage interviewSessionData={this.state.interviewSessionData} />) }
            </>
        );
    }
}
