import React from 'react';
import Container from "@material-ui/core/Container/Container";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import ArrowForward from "@material-ui/icons/ArrowForward";
import InterviewStepper from "../components/InterviewStepper";
import { InterviewSessionData } from "../src/types";
import StopIcon from "@material-ui/icons/StopRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import Button from "@material-ui/core/Button/Button";

interface MyState {
    timeElapsed: number;
    timerEnabled: boolean;
}

interface MyProps {
    interviewSessionData: InterviewSessionData;
}

export default class InterviewPage extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        timeElapsed: 0,
        timerEnabled: true
    };

    render() {
        const interview = this.props.interviewSessionData.interview;
        return (
            <div>
                <Container maxWidth="md">
                    <Box mt={3}>
                        <Typography variant="h3" component="span" color="primary" style={{fontWeight: 900}}>
                            Mint
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography variant="h5" component="span" color="primary">
                            by HMIF Tech
                        </Typography>
                    </Box>
                    <Box mt={3}>
                        <Button
                            disableElevation
                            variant="contained"
                            startIcon={<StopIcon />}
                            style={{backgroundColor: '#ef5350', color: 'white', textTransform: 'none', fontWeight: 'bold'}}
                        >
                            Stop
                        </Button>
                        { this.state.timerEnabled && (
                            <Button
                                disableElevation
                                variant="contained"
                                startIcon={<PauseIcon />}
                                style={{backgroundColor: '#ff7043', color: 'white', textTransform: 'none', fontWeight: 'bold', marginLeft: '8px'}}
                                onClick={() => this.setState({ timerEnabled: false })}
                            >
                                Pause
                            </Button>
                        )}
                        { !this.state.timerEnabled && (
                            <Button
                                disableElevation
                                variant="contained"
                                startIcon={<PlayIcon />}
                                style={{backgroundColor: '#1e88e5', color: 'white', textTransform: 'none', fontWeight: 'bold', marginLeft: '8px'}}
                                onClick={() => this.setState({ timerEnabled: true })}
                            >
                                Play
                            </Button>
                        )}
                    </Box>
                    <Box mt={4}>
                        <Grid container spacing={3}>
                            <Grid item>
                                <div style={{color: "#545454"}}>Waktu</div>
                                <Box mt={0}>
                                    <Typography variant="subtitle1" style={{fontWeight: 900}}>
                                        { this.secondsToHms(this.state.timeElapsed) }
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <div style={{color: "#545454"}}>Interview</div>
                                <Box mt={0}>
                                    <Typography variant="subtitle1" style={{fontWeight: 900}}>
                                        { this.props.interviewSessionData.interview.title }
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item>
                                <div style={{color: "#545454"}}>Partisipan</div>
                                <Box mt={0}>
                                    <Typography variant="subtitle1" component="span" style={{fontWeight: 900}}>
                                        Muhammad Aditya Hilmy
                                    </Typography>
                                    &nbsp;
                                    <ArrowForward fontSize="inherit" />
                                    &nbsp;
                                    <Typography variant="subtitle1" component="span" style={{fontWeight: 900}}>
                                        Jofiandy Leonata Pratama
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={3} mb={4}>
                        <InterviewStepper interviewSessionData={this.props.interviewSessionData} interviewPaused={!this.state.timerEnabled} />
                    </Box>
                </Container>
            </div>
        );
    }

    componentDidMount() {
        window.setInterval(() => {
            if (this.state.timerEnabled) {
                this.setState({
                    timeElapsed: this.state.timeElapsed + 1
                });
            }
        }, 1000);
    }

    secondsToHms(d: number): string {
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        return h > 0 ? `${('00'+h).slice(-2)}:${('00'+m).slice(-2)}:${('00'+s).slice(-2)}` : `${('00'+m).slice(-2)}:${('00'+s).slice(-2)}`
    }
}
