import React from 'react';
import Container from "@material-ui/core/Container/Container";
import Box from "@material-ui/core/Box/Box";
import ReplayIcon from "@material-ui/icons/Replay";
import Typography from "@material-ui/core/Typography/Typography";
import Button from "@material-ui/core/Button/Button";
import {InterviewSessionData, SessionSummary} from "../src/types";

interface MyProps {
    onReset: () => void;
    interviewSessionData: InterviewSessionData;
    sessionSummary: SessionSummary;
}

export default class InterviewFinished extends React.Component<MyProps> {
    secondsToHms(d: number): string {
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        return h > 0 ? `${('00'+h).slice(-2)}:${('00'+m).slice(-2)}:${('00'+s).slice(-2)}` : `${('00'+m).slice(-2)}:${('00'+s).slice(-2)}`
    }

    render() {
        const interviewSessionData = this.props.interviewSessionData;

        return (
            <div>
                <Container maxWidth="xs">
                    <Box display="flex" flexDirection="column" justifyContent="center" style={{minHeight: '100vh'}} pt={3} pb={3}>
                        <Box>
                            <Typography variant="h4" color="primary" style={{fontWeight: 900}}>
                                Kalian keren!
                            </Typography>
                            <p>
                                Kalian telah menyelesaikan <i>mock interview</i> kali ini!
                                Kami harap kamu dan teman kamu bisa mendapat hasil yang terbaik dalam pencarian tempat magang/kerja kalian.
                            </p>
                            <p>
                                Tetap semangat!
                            </p>
                            <Box mt={3}>
                                Waktu:
                                <Typography variant="h5" style={{fontWeight: 900}}>
                                    { this.secondsToHms(this.props.sessionSummary.timeElapsed) }
                                </Typography>
                            </Box>
                            <Box mt={3}>
                                <Button variant="contained" color="primary" style={{width: '100%', textTransform: 'none'}} disableElevation onClick={this.props.onReset}>
                                    Ulangi
                                    &nbsp;
                                    <ReplayIcon fontSize="inherit" />
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </div>
        );
    }
}
