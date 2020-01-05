import React from 'react';

import Stepper from '@material-ui/core/Stepper/Stepper';
import StepLabel from '@material-ui/core/StepLabel/StepLabel';
import Step from '@material-ui/core/Step/Step';
import StepContent from '@material-ui/core/StepContent/StepContent';
import Button from '@material-ui/core/Button/Button';
import Box from '@material-ui/core/Box/Box';
import { createStyles, Theme, WithStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import ReactMarkdown from 'react-markdown';
import Typography from '@material-ui/core/Typography/Typography';
import { connect } from 'react-redux';
import { InterviewSessionData } from '../helpers/types';
import { InterviewStepperState, MintReduxComponent } from '../redux/types';
import { setInterviewStepperState } from '../redux/actions';

interface OwnProps extends WithStyles<typeof styles> {
  interviewSessionData: InterviewSessionData;
  interviewPaused: boolean;
  onFinish: () => void;
}

type MyProps = OwnProps & MintReduxComponent<InterviewStepperState>;

const styles = (theme: Theme) =>
  createStyles({
    button: {
      fontWeight: 'bold',
      textTransform: 'none'
    }
  });

class InterviewStepper extends React.Component<MyProps> {
  render() {
    const { classes, state } = this.props;
    const { sections } = this.props.interviewSessionData.interview;

    return (
      <div>
        <style>
          {`
                      blockquote {
                        margin-left: 0;
                        margin-top: -38px;
                        padding-left: 40px;
                        color: #6d6d6d;
                        font-size: 15pt;
                      }
                      blockquote:before {
                          color: #6d6d6d;
                          content: open-quote;
                          font-size: 2.3em;
                          line-height: 0.1em;
                          vertical-align: -0.4em;
                          position: relative;
                          top: 47px;
                          left: -40px;
                          font-weight: 900;
                        }
                    `}
        </style>
        {this.props.interviewPaused && (
          <Box>
            <Typography component="h5">Interview paused.</Typography>
          </Box>
        )}

        {!this.props.interviewPaused && (
          <Stepper activeStep={state.activeStep} orientation="vertical" style={{ padding: 0 }}>
            {sections.map((step, i) => (
              <Step key={i}>
                <StepLabel>
                  <b>{step.title}</b>
                </StepLabel>
                <StepContent style={{ fontSize: '12pt' }}>
                  <Box>
                    <ReactMarkdown source={step.contents[0]} />
                  </Box>
                  <Box mt={3}>
                    <div>
                      <Button
                        className={classes.button}
                        variant="outlined"
                        disabled={state.activeStep === 0}
                        onClick={this.handleBack}
                      >
                        Back
                      </Button>
                      &nbsp; &nbsp;
                      <Button
                        className={classes.button}
                        variant="contained"
                        disableElevation
                        color="primary"
                        onClick={state.activeStep !== sections.length - 1 ? this.handleNext : this.handleFinish}
                      >
                        {state.activeStep !== sections.length - 1 ? 'Next' : 'Finish'}
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        )}
      </div>
    );
  }

  handleNext = () => {
    const nextStep = this.props.state.activeStep + 1;
    this.setReduxState({ activeStep: nextStep });
  };

  handleBack = () => {
    const prevStep = this.props.state.activeStep - 1;
    this.setReduxState({ activeStep: prevStep });
  };

  handleFinish = () => {
    this.props.onFinish();
  };

  setReduxState(state: {}) {
    this.props.dispatch(setInterviewStepperState({ ...this.props.state, ...state }));
  }
}

export default connect((state: InterviewStepperState) => ({ state }))(withStyles(styles)(InterviewStepper));
