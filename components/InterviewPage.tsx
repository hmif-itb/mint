import React from 'react';
import Container from "@material-ui/core/Container/Container";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import ArrowForward from "@material-ui/icons/ArrowForward";
import InterviewStepper from "../components/InterviewStepper";
import {InterviewSessionData, SessionSummary} from "../helpers/types";
import StopIcon from "@material-ui/icons/StopRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";

interface MyState {
    timeElapsed: number;
    timerEnabled: boolean;
    stopDialogOpen: boolean;
}

interface MyProps {
    interviewSessionData: InterviewSessionData;
    onReset: () => void;
    onFinish: (sessionSummary: SessionSummary) => void;
}

export default class InterviewPage extends React.Component<MyProps, MyState> {
    state: MyState = {
        timeElapsed: 0,
        timerEnabled: true,
        stopDialogOpen: false
    };

    attemptStop() {
        this.setState({ stopDialogOpen: true, timerEnabled: false });
    }

    confirmStop() {
        this.props.onReset();
    }

    cancelStop() {
        this.setState({ stopDialogOpen: false, timerEnabled: true })
    }

    handleFinish() {
        const sessionSummary: SessionSummary = {
            interviewer: this.props.interviewSessionData.interviewerNim,
            interviewee: this.props.interviewSessionData.interviewerNim,
            timeElapsed: this.state.timeElapsed,
            interviewId: this.props.interviewSessionData.interview.id,
            interviewTitle: this.props.interviewSessionData.interview.title,
            sectionTuples: []   // TODO populate
        };

        this.props.onFinish(sessionSummary);
    }

    render() {
        const interviewSessionData = this.props.interviewSessionData;
        const interview = interviewSessionData.interview;
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
                            onClick={() => this.attemptStop()}
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
                                        { interviewSessionData.interviewerName || interviewSessionData.interviewerNim }
                                    </Typography>
                                    &nbsp;
                                    <ArrowForward fontSize="inherit" />
                                    &nbsp;
                                    <Typography variant="subtitle1" component="span" style={{fontWeight: 900}}>
                                        { interviewSessionData.intervieweeName || interviewSessionData.intervieweeNim }
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box mt={3} mb={4}>
                        <InterviewStepper
                            onFinish={() => this.handleFinish()}
                            interviewSessionData={this.props.interviewSessionData}
                            interviewPaused={!this.state.timerEnabled} />
                    </Box>
                </Container>
                <Dialog
                    open={this.state.stopDialogOpen}
                    onClose={() => this.cancelStop()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Sudahi sesi mock interview?</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Kamu akan kembali ke layar utama, dan progressmu akan terhapus.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{fontWeight: 'bold', textTransform: 'none'}} onClick={() => this.cancelStop()} color="default">
                            Tidak
                        </Button>
                        <Button style={{fontWeight: 'bold', textTransform: 'none'}} onClick={() => this.confirmStop()} color="default" autoFocus>
                            Ya
                        </Button>
                    </DialogActions>
                </Dialog>
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
