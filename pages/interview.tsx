import React from 'react';
import Container from "@material-ui/core/Container/Container";
import Typography from "@material-ui/core/Typography/Typography";
import Box from "@material-ui/core/Box/Box";
import Grid from "@material-ui/core/Grid/Grid";
import ArrowForward from "@material-ui/icons/ArrowForward";
import InterviewStepper from "../components/InterviewStepper";

interface MyState {
    timeElapsed: number; // like this
}

interface MyProps {

}

export default class WelcomePage extends React.Component<MyProps, MyState> {
    state: MyState = {
        // optional second annotation for better type inference
        timeElapsed: 0
    };

    render() {
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
                                        Software Engineering/Technical
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
                    <Box mt={3}>
                        <InterviewStepper/>
                    </Box>
                </Container>
            </div>
        );
    }

    componentDidMount() {
        window.setInterval(() => {
            this.setState({
                timeElapsed: this.state.timeElapsed + 1
            });
        }, 1000);
    }

    secondsToHms(d: number): string {
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);

        return h > 0 ? `${('00'+h).slice(-2)}:${('00'+m).slice(-2)}:${('00'+s).slice(-2)}` : `${('00'+m).slice(-2)}:${('00'+s).slice(-2)}`
    }
}
