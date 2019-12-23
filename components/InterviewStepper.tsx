import React from 'react';

import Stepper from "@material-ui/core/Stepper/Stepper";
import StepLabel from "@material-ui/core/StepLabel/StepLabel";
import Step from "@material-ui/core/Step/Step";
import StepContent from "@material-ui/core/StepContent/StepContent";
import Button from "@material-ui/core/Button/Button";
import Box from "@material-ui/core/Box/Box";
import { makeStyles, createStyles, Theme, WithStyles } from "@material-ui/core";
import { withStyles } from '@material-ui/styles';
import ReactMarkdown from "react-markdown";

interface Step {
    title: string;
    content: string;
}

type MyState = {
    activeStep: number;
    steps: Step[];
}

interface MyProps extends WithStyles<typeof styles> {

}

const styles = (theme: Theme) =>
        createStyles({
            button: {
                fontWeight: 'bold',
                textTransform: 'none'
            }
        });

class InterviewStepper extends React.Component<MyProps, MyState> {
    state = {
        activeStep: 0,
        steps: [
            {
                title: "Introduction",
                content: "Perkenalkan diri kamu sebagai *interviewer*, serta beri tahu pekerjaan apa yang dilamar oleh *interviewee*. Coba katakan sesuatu seperti:\n"
                + "\n"
                + "> Halo, terima kasih sudah menyempatkan diri untuk diwawancara. Kenalin aku Iwang dari divisi Fraud Analytics di Midtrans mau mewawancarai kamu untuk *role* Software Engineer Intern di Midtrans.\n"
                + "\n"
                + "Lanjutkan dengan sedikit basa-basi, kemudian lanjut ke bagian selanjutnya."
            },
            {
                title: "Motivasi",
                content: "Hello world2!"
            },
            {
                title: "Review Resume/CV",
                content: "Hello world3!"
            },
            {
                title: "Coding Test",
                content: "Hello world4!"
            },
            {
                title: "Tanya Jawab",
                content: "Hello world5!"
            }
        ]
    };

    buttonStyle = {
        fontWeight: 600,
        textTransform: 'none'
    };

    render() {
        const { classes } = this.props;

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
                <Stepper activeStep={this.state.activeStep} orientation="vertical" style={{padding: 0}}>
                    {this.state.steps.map((step, i) => (
                        <Step key={i}>
                            <StepLabel><b>{step.title}</b></StepLabel>
                            <StepContent style={{fontSize: '12pt'}}>
                                <Box>
                                    <ReactMarkdown source={step.content} />
                                </Box>
                                <Box mt={3}>
                                    <div>
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            disabled={this.state.activeStep === 0}
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
                                            onClick={this.handleNext}
                                        >
                                            {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </div>
                                </Box>
                            </StepContent>
                        </Step>
                    ))}
                </Stepper>
            </div>
        );
    }

    handleNext = () => {
        this.setState({ activeStep: this.state.activeStep + 1 });
    };

    handleBack = () => {
        this.setState({ activeStep: this.state.activeStep - 1 });
    };
}

export default withStyles(styles)(InterviewStepper);
